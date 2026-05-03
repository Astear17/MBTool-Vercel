import { Router, type Request, type Response } from "express";
import { CoreBankService } from "../services/core-bank.js";
import { warmup } from "../services/wasm-engine.js";
import { getSettings, saveSettings } from "../services/settings.js";
import { triggerTestNotification } from "../services/notifier.js";
import { TransactionMonitor } from "../services/monitor.js";
import type { LoginRequest } from "../types/index.js";

const router = Router();
export const coreBankService = new CoreBankService();
const txMonitor = new TransactionMonitor(coreBankService);

router.get("/status", (_req: Request, res: Response) => {
  const session = coreBankService.getSession();
  res.json({
    status: "ok",
    loggedIn: !!session?.sessionId,
    username: session?.username || null,
    sessionAge: session
      ? Math.floor((Date.now() - session.createdAt) / 1000)
      : null,
  });
});

router.post("/warmup", async (_req: Request, res: Response) => {
  try {
    await warmup();
    res.json({ success: true, message: "WASM engine ready" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/captcha", async (_req: Request, res: Response) => {
  try {
    const captcha = await coreBankService.getCaptcha();
    res.json({ success: true, ...captcha });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Missing username or password",
      });
      return;
    }

    const result = await coreBankService.autoLogin(username, password);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/balance", async (_req: Request, res: Response) => {
  try {
    const balance = await coreBankService.getBalance();
    res.json({ success: true, data: balance });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/transactions", async (req: Request, res: Response) => {
  try {
    const { accountNumber, fromDate, toDate } = req.body;

    if (!accountNumber || !fromDate || !toDate) {
      res.status(400).json({
        success: false,
        message: "Missing accountNumber, fromDate, or toDate",
      });
      return;
    }

    const transactions = await coreBankService.getTransactions(
      accountNumber,
      fromDate,
      toDate
    );
    res.json({ success: true, data: transactions });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/settings", (_req: Request, res: Response) => {
  res.json({ success: true, data: getSettings() });
});

router.post("/settings", (req: Request, res: Response) => {
  try {
    saveSettings(req.body);
    const newSettings = getSettings();

    if (newSettings.monitor.running) {
      txMonitor.start();
    } else {
      txMonitor.stop();
    }
    
    res.json({ success: true, data: newSettings });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/monitor/test", async (_req: Request, res: Response) => {
  try {
    await triggerTestNotification();
    res.json({ success: true, message: "Test notification sent" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
