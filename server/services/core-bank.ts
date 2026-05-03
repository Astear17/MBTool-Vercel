import { createHash } from "node:crypto";
import { Client } from "undici";
import { encrypt } from "./wasm-engine.js";
import { recognizeCaptcha } from "./captcha-ocr.js";
import type {
  CaptchaResponse,
  SessionState,
  BalanceSummary,
  AccountBalance,
  Transaction,
} from "../types/index.js";

const BASE_URL = "https://online.mbbank.com.vn";

const DEFAULT_HEADERS: Record<string, string> = {
  "Cache-Control": "max-age=0",
  Accept: "application/json, text/plain, *
  getSession(): SessionState | null {
    return this.session;
  }

  async getCaptcha(): Promise<{ imageBase64: string; deviceId: string }> {
    const deviceId = generateDeviceId();
    const refNo = timestamp();

    const res = await this.client.request({
      method: "POST",
      path: "/api/retail-internetbankingms/getCaptchaImage",
      headers: {
        ...DEFAULT_HEADERS,
        "X-Request-Id": refNo,
        Deviceid: deviceId,
        Refno: refNo,
      },
      body: JSON.stringify({
        sessionId: "",
        refNo,
        deviceIdCommon: deviceId,
      }),
    });

    const responseText = await res.body.text();
    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      throw new Error(`Failed to parse Core Bank response: ${responseText.slice(0, 100)}`);
    }

    this.session = {
      sessionId: "",
      deviceId,
      username: "",
      createdAt: Date.now(),
    };

    return {
      imageBase64: data.imageString,
      deviceId,
    };
  }

  async autoLogin(
    username: string,
    password: string,
    maxRetries = 5
  ): Promise<{ success: boolean; message: string; attempts: number; data?: unknown }> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`🔄 Login attempt ${attempt}/${maxRetries}...`);

      const { imageBase64 } = await this.getCaptcha();
      const imageBuffer = Buffer.from(imageBase64, "base64");

      const captchaText = await recognizeCaptcha(imageBuffer);
      if (!captchaText) {
        console.log(`   ❌ OCR failed to recognize captcha, retrying...`);
        continue;
      }
      console.log(`   🔍 OCR result: ${captchaText}`);

      const result = await this.login(username, password, captchaText);

      if (result.success) {
        console.log(`   ✅ Login successful on attempt ${attempt}`);
        return { ...result, attempts: attempt };
      }

      if (result.message.includes("Captcha") || result.message.includes("GW283")) {
        console.log(`   ❌ Captcha incorrect, retrying...`);
        continue;
      }

      return { ...result, attempts: attempt };
    }

    return {
      success: false,
      message: `Failed after ${maxRetries} attempts (captcha OCR could not solve)`,
      attempts: maxRetries,
    };
  }

  async login(
    username: string,
    password: string,
    captcha: string
  ): Promise<{ success: boolean; message: string; data?: unknown }> {
    const deviceId = this.session?.deviceId || generateDeviceId();
    const refNo = timestamp();

    const requestData = {
      userId: username,
      password: md5(password),
      captcha,
      ibAuthen2faString: FPR,
      sessionId: null,
      refNo,
      deviceIdCommon: deviceId,
    };

    const dataEnc = await encrypt(requestData, "0");

    const res = await this.client.request({
      method: "POST",
      path: "/api/retail_web/internetbanking/v2.0/doLogin",
      headers: {
        ...DEFAULT_HEADERS,
        "X-Request-Id": refNo,
        Deviceid: deviceId,
        Refno: refNo,
      },
      body: JSON.stringify({ dataEnc }),
    });

    const responseText = await res.body.text();
    let body: any;
    try {
      body = JSON.parse(responseText);
    } catch (e) {
      throw new Error(`Failed to parse login response: ${responseText.slice(0, 100)}`);
    }

    if (!body.result) {
      return { success: false, message: "Unknown error: no result in response" };
    }

    if (body.result.ok) {
      this.session = {
        sessionId: body.sessionId,
        deviceId,
        username,
        createdAt: Date.now(),
      };

      return {
        success: true,
        message: "Login successful",
        data: {
          sessionId: body.sessionId,
          customerName: body.cust?.nm,
          lastLogin: body.cust?.lastLogin,
        },
      };
    }

    if (body.result.responseCode === "GW283") {
      return { success: false, message: "Captcha incorrect, please try again" };
    }

    return {
      success: false,
      message: `(${body.result.responseCode}) ${body.result.message}`,
    };
  }

  async getBalance(): Promise<BalanceSummary | null> {
    const data = await this.authenticatedRequest(
      "/api/retail-accountms/accountms/getBalance"
    );

    if (!data) return null;

    const accounts: AccountBalance[] = [];

    for (const acct of data.acct_list || []) {
      accounts.push({
        number: acct.acctNo,
        name: acct.acctNm,
        currency: acct.ccyCd,
        balance: acct.currentBalance,
      });
    }

    for (const acct of data.internationalAcctList || []) {
      accounts.push({
        number: acct.acctNo,
        name: acct.acctNm,
        currency: acct.ccyCd,
        balance: acct.currentBalance,
      });
    }

    return {
      totalBalance: data.totalBalanceEquivalent,
      currencyEquivalent: data.currencyEquivalent,
      accounts,
    };
  }

  async getTransactions(
    accountNumber: string,
    fromDate: string, 
    toDate: string 
  ): Promise<Transaction[]> {
    const data = await this.authenticatedRequest(
      "/api/retail-transactionms/transactionms/get-account-transaction-history",
      { accountNo: accountNumber, fromDate, toDate }
    );

    if (!data?.transactionHistoryList) return [];

    return data.transactionHistoryList.map((tx: any): Transaction => ({
      postDate: tx.postingDate,
      transactionDate: tx.transactionDate,
      accountNumber: tx.accountNo,
      creditAmount: tx.creditAmount,
      debitAmount: tx.debitAmount,
      currency: tx.currency,
      description: tx.description,
      availableBalance: tx.availableBalance,
      refNo: tx.refNo,
      beneficiaryName: tx.benAccountName,
      beneficiaryBank: tx.bankName,
      beneficiaryAccount: tx.benAccountNo,
      type: tx.transactionType,
    }));
  }

  private async authenticatedRequest(
    path: string,
    extraBody: Record<string, unknown> = {},
    retryCount = 0
  ): Promise<any> {
    if (!this.session?.sessionId) {
      throw new Error("Not logged in");
    }

    const refNo = `${this.session.username}-${timestamp()}`;

    const body = {
      sessionId: this.session.sessionId,
      refNo,
      deviceIdCommon: this.session.deviceId,
      ...extraBody,
    };

    const res = await this.client.request({
      method: "POST",
      path,
      headers: {
        ...DEFAULT_HEADERS,
        "X-Request-Id": refNo,
        Deviceid: this.session.deviceId,
        Refno: refNo,
      },
      body: JSON.stringify(body),
    });

    const responseText = await res.body.text();
    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      
      if (retryCount < 1) {
        console.log(`⚠️ Empty response from bank on ${path}, retrying...`);
        await new Promise(r => setTimeout(r, 1000));
        return this.authenticatedRequest(path, extraBody, retryCount + 1);
      }
      throw new Error(`Failed to parse API response: ${responseText.slice(0, 100)}`);
    }

    if (!data?.result) return null;

    if (data.result.ok) return data;

    if (data.result.responseCode === "GW200") {
      
      this.session = null;
      throw new Error("Session expired, please login again");
    }

    throw new Error(
      `Request failed (${data.result.responseCode}): ${data.result.message}`
    );
  }
}
