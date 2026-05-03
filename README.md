<div align="center">
  <h1>🏦 CoreBank Panel PRO</h1>
  <p><strong>Comprehensive Automation & Transaction Monitoring for Core Bank</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-20.x-green" alt="Node" />
    <img src="https://img.shields.io/badge/Vue.js-3.x-4fc08d" alt="Vue" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED" alt="Docker" />
    <img src="https://img.shields.io/badge/Render-Deploy-46e3b7" alt="Render" />
  </p>
  <p>
    <a href="https://render.com/deploy?repo=https://github.com/Astear17/MBTool-Vercel">
      <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" />
    </a>
  </p>
</div>

---

## 🌟 Overview

**CoreBank Panel PRO** is a powerful automation and transaction monitoring system for Core Bank internet banking. Built entirely in TypeScript, it connects directly to the Core Bank API flow using **WebAssembly (WASM)** encryption and a local **ONNX AI model** for captcha solving — no browser automation (Puppeteer) needed.

> 🛠 **Originally developed by [Dang Quoc Huy](https://facebook.com/dangquochuy.dev) with ❤️**
>
> 🔀 **Rebuilt & maintained by [Astear17](https://github.com/Astear17)** — *This is a fork of [danieldev23/corebank-panel](https://github.com/danieldev23/corebank-panel).*

---

## ⚡ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Auto Login & Captcha Solving** | AI-powered OCR (ONNX model) solves captcha automatically. Smart retry mechanism. No third-party API needed. |
| 📊 **Real-time Transaction Monitor** | Background polling for balance changes and new transactions. |
| 🔔 **Multi-Channel Notifications** | Instant alerts via **Telegram**, **Discord**, and custom **Webhooks** when transactions are detected. |
| 🛡️ **Native WASM Encryption** | Uses Core Bank's own Go WASM binary for request encryption (`dataEnc`). |
| 🎨 **Professional Admin UI** | Vue 3 dashboard with charts, VietQR generation, dark/light mode, and bilingual support (🇻🇳 Vietnamese & 🇬🇧 English). |

---

## 🚀 Deployment Guide

This app requires a **persistent backend server** (Express + Node.js). Choose one of the deployment methods below.

### Option 1: Deploy to Render (Recommended for Cloud)

The fastest way to get started — no server setup required.

**Step 1:** Click the button below:

<p align="center">
  <a href="https://render.com/deploy?repo=https://github.com/Astear17/MBTool-Vercel">
    <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" />
  </a>
</p>

**Step 2:** Render will auto-detect the `render.yaml` blueprint and configure:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Environment:** Node.js with `PORT=10000`

**Step 3:** Wait for the build to complete (~2-3 minutes), then open your Render URL and log in.

> **💡 Tip:** Render's free tier may spin down after inactivity. The first request after idle will take ~30 seconds for a cold start.

---

### Option 2: Hybrid Deployment (Recommended)

Deploy the **Frontend to Vercel** (for speed) and the **Backend to Render** (for persistence).

#### 1. Backend (Render)
Click the **Deploy to Render** button above. Once deployed, copy your Render URL (e.g., `https://your-app.onrender.com`).

#### 2. Frontend (Vercel)
1. Fork this repo to your GitHub.
2. Go to [Vercel](https://vercel.com/new).
3. Import your fork.
4. In **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://your-app.onrender.com/api` (Replace with your actual Render URL).
5. Deploy.

---

### Option 3: Node.js (Local Development)

**Requirements:** Node.js ≥ 20

```bash
# 1. Install dependencies
npm install

# 2. Start both frontend & backend together
bash start.sh

# — OR start them separately: —

# Terminal 1: Frontend (Port 2000)
npm run dev

# Terminal 2: Backend (Port 2001)
npm run server
```

---

## 📖 Usage Guide

### 1. Login

1. Open the app URL in your browser.
2. Enter your Core Bank **phone number** and **password**.
3. Click **Login** — the system will:
   - Fetch a captcha image from Core Bank
   - Solve it automatically using the AI OCR model
   - Encrypt credentials using Core Bank's WASM engine
   - Authenticate and establish a session
4. On success, you'll be redirected to the **Dashboard**.

> 🔄 If captcha solving fails, the system retries automatically (up to 5 attempts).

### 2. Dashboard

- View **total balance** across all accounts.
- See individual account cards with masked account numbers.
- Click **View Transactions** on any account to jump to transaction history.

### 3. Transaction History

- Select an **account number** from the dropdown.
- Pick a **date range** (From / To).
- Click **Fetch** to retrieve transaction history.
- Transactions show: date, amount, type (credit/debit), description, and reference number.

### 4. Settings & Notifications

Configure real-time alerts for new transactions:

#### Telegram
1. Create a bot via [@BotFather](https://t.me/BotFather) and get the **Bot Token**.
2. Get your **Chat ID** (use [@userinfobot](https://t.me/userinfobot)).
3. Enter both in the Settings panel and toggle **Enabled**.

#### Discord
1. In your Discord server, go to **Server Settings → Integrations → Webhooks**.
2. Create a webhook and copy the **Webhook URL**.
3. Paste it in the Settings panel and toggle **Enabled**.

#### Custom Webhook
1. Enter your webhook **URL** and optional **Secret** (sent as `X-Webhook-Secret` header).
2. Transaction data is POSTed as JSON.

#### Transaction Monitor
- Set the **polling interval** (minimum 10 seconds).
- Toggle **Running** to start/stop background monitoring.
- Use **Test Notification** to verify your notification channels.

### 5. API Docs

The app includes built-in API documentation accessible from the sidebar. You can integrate with your own systems using the REST API. Code examples in Node.js, Python, and cURL are provided.

---

## 🔧 Project Structure

```text
corebank-panel-pro/
├── server/
│   ├── index.ts               # Express backend entrypoint
│   ├── routes/api.ts          # REST API routes
│   ├── services/
│   │   ├── core-bank.ts       # Core Bank API integration
│   │   ├── captcha-ocr.ts     # ONNX AI captcha recognition
│   │   ├── wasm-engine.ts     # Go WASM encryption bridge
│   │   ├── monitor.ts         # Background transaction polling
│   │   ├── notifier.ts        # Telegram/Discord/Webhook alerts
│   │   └── settings.ts        # Configuration persistence
│   ├── model.onnx             # AI captcha recognition model
│   └── data/                  # Persistent settings storage
├── src/                       # Vue.js 3 frontend
│   ├── App.vue                # Main layout with sidebar
│   ├── views/                 # Pages (Dashboard, Transactions, Settings, API Docs)
│   ├── locales/               # i18n translations (EN, VI)
│   └── api/                   # Axios API client
├── render.yaml                # Render deployment blueprint
├── Dockerfile                 # Docker multi-stage build
├── docker-compose.yml         # Docker Compose configuration
└── package.json
```

---

## ❓ FAQ

**Q: Why not deploy on Vercel?**
> This app needs a **persistent Node.js server** for session management, WASM execution, ONNX inference, and background transaction monitoring. Vercel's serverless functions are stateless and have a 250MB size limit that conflicts with the native ONNX runtime. Render, Railway, or a VPS with Docker are better fits.

**Q: The app asks me to re-login when I switch pages?**
> This happens when the backend server restarts (session is stored in memory). On a persistent server (Render/Docker), this should not happen during normal use. If it does, it means the server process restarted.

**Q: Can I use this with multiple accounts?**
> The current version supports one active session at a time. Log out and log in with different credentials to switch accounts.

**Q: Is this safe?**
> Your credentials are sent to your own backend server only — never to any third party. The WASM encryption uses Core Bank's official encryption module.

---

## ⚖️ License & Disclaimer

### License
This project is released under the **MIT License**. You are free to use, copy, and modify the source code. See [LICENSE](LICENSE) for details.

### Disclaimer
**CoreBank Panel PRO** is developed purely for **educational purposes, algorithm research, and personal learning**.
The project is provided "AS IS" without any warranty.
The original author (**Dang Quoc Huy**) and fork maintainer (**Astear17**) **accept absolutely no legal responsibility** for any risks, damages, or consequences caused by misuse of this tool in violation of Core Bank's Terms of Service or applicable laws. Users are solely responsible for their own actions.

> 🌟 *Originally created by Dang Quoc Huy — Rebuilt by Astear17 for cloud deployment.*
