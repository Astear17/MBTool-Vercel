<div align="center">
  <h1>🏦 CoreBank Panel PRO</h1>
  <p><strong>Hệ thống Tự động hoá & Giám sát Giao dịch Ngân hàng Toàn diện</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-20.x-green" alt="Node" />
    <img src="https://img.shields.io/badge/Vue.js-3.x-4fc08d" alt="Vue" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED" alt="Docker" />
  </p>
  <p>
    <!-- Render Button (Backend) -->
    <a href="https://render.com/deploy?repo=https://github.com/Astear17/MBTool-Vercel">
      <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy Backend to Render" />
    </a>
    <!-- Vercel Button (Frontend) -->
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAstear17%2FMBTool-Vercel&env=VITE_API_BASE_URL">
      <img src="https://vercel.com/button" alt="Deploy Frontend to Vercel" />
    </a>
  </p>
</div>

---

## 🌟 Tổng quan Dự án

**CoreBank Panel PRO** là một hệ thống giám sát và tự động hoá giao dịch mạnh mẽ cho ngân hàng Core Bank. Hệ thống được xây dựng hoàn toàn bằng TypeScript, kết nối trực tiếp vào API của ngân hàng thông qua cơ chế mã hoá **WebAssembly (WASM)** và mô hình **AI OCR (ONNX)** để giải mã captcha tự động — không cần sử dụng trình duyệt ẩn danh (Puppeteer) nặng nề.

> 🛠 **Phát triển bởi [Dang Quoc Huy](https://facebook.com/dangquochuy.dev) với ❤️**
>
> 🔀 **Rebuilt & Maintained bởi [Astear17](https://github.com/Astear17)** — *Đây là bản fork từ [danieldev23/corebank-panel](https://github.com/danieldev23/corebank-panel).*

---

## ⚡ Tính năng Nổi bật

| Tính năng | Mô tả |
|-----------|-------|
| 🔐 **Tự động Đăng nhập & Giải Captcha** | Sử dụng AI OCR (ONNX) để giải captcha tự động với tỷ lệ chính xác cao. Cơ chế tự động thử lại thông minh. |
| 📊 **Giám sát Giao dịch Thời gian thực** | Tự động kiểm tra số dư và biến động số dư ngầm liên tục. |
| 🔔 **Thông báo Đa kênh** | Gửi thông báo ngay lập tức qua **Telegram**, **Discord**, và **Custom Webhooks** khi phát hiện giao dịch mới. |
| 🛡️ **Mã hoá WASM Nguyên bản** | Sử dụng module WASM chính chủ từ Core Bank để mã hoá chữ ký dữ liệu (`dataEnc`). |
| 🎨 **Giao diện Quản trị Chuyên nghiệp** | Dashboard Vue 3 hiện đại, hỗ trợ Dark Mode, đa ngôn ngữ (Tiếng Việt & Tiếng Anh), tạo mã VietQR tự động. |

---

## 🚀 Hướng dẫn Triển khai (Hybrid Deployment)

Để đạt hiệu suất và độ ổn định cao nhất, chúng tôi khuyến khích mô hình **Hybrid**:
- **Backend chạy trên Render**: Đảm bảo duy trì Session, chạy các tác vụ nền (Monitor) và mã hoá WASM ổn định.
- **Frontend chạy trên Vercel**: Tốc độ tải trang cực nhanh nhờ mạng lưới Edge Network toàn cầu.

### Bước 1: Triển khai Backend (Render)

1. Nhấn nút **Deploy to Render** ở trên.
2. Render sẽ tự động cấu hình dựa trên file `render.yaml`.
3. Sau khi triển khai xong, hãy copy URL của service (ví dụ: `https://your-backend.onrender.com`).

### Bước 2: Triển khai Frontend (Vercel)

1. Nhấn nút **Deploy to Vercel** ở trên.
2. Vercel sẽ yêu cầu bạn nhập biến môi trường:
   - `VITE_API_BASE_URL`: Nhập URL backend Render của bạn kèm `/api` (ví dụ: `https://your-backend.onrender.com/api`).
3. Nhấn **Deploy** và chờ đợi trong giây lát.

---

## 🔧 Cấu trúc Thư mục

```text
corebank-panel-pro/
├── server/
│   ├── index.ts               # Entrypoint của Backend (Express)
│   ├── services/
│   │   ├── core-bank.ts       # Xử lý API Ngân hàng
│   │   ├── captcha-ocr.ts     # Giải captcha bằng AI OCR
│   │   ├── wasm-engine.ts     # Cầu nối mã hoá Go WASM
│   │   └── monitor.ts         # Theo dõi giao dịch ngầm
├── src/                       # Mã nguồn Frontend Vue.js
│   ├── views/                 # Các màn hình chức năng (Dashboard, Settings, ...)
│   └── locales/               # Cấu hình đa ngôn ngữ
├── render.yaml                # Cấu hình triển khai Render
└── vercel.json                # Cấu hình triển khai Vercel
```

---

## 📖 Hướng dẫn Sử dụng

### 1. Đăng nhập
- Nhập **Số điện thoại** và **Mật khẩu** tài khoản ngân hàng của bạn.
- Hệ thống sẽ tự động lấy captcha, giải mã bằng AI và thực hiện đăng nhập.
- Nếu giải captcha sai, hệ thống sẽ tự động thử lại tối đa 5 lần.

### 2. Cấu hình Thông báo
Vào phần **Cài đặt** (Settings) để bật thông báo:
- **Telegram**: Nhập Bot Token và Chat ID.
- **Discord**: Nhập Webhook URL.
- **Monitor**: Bật chế độ chạy ngầm và tùy chỉnh thời gian giãn cách (giây).

---

## ⚖️ Giấy phép & Miễn trừ Trách nhiệm

### Giấy phép
Dự án được phát hành dưới giấy phép **MIT License**. Bạn có quyền sử dụng, sao chép và sửa đổi mã nguồn.

### Miễn trừ Trách nhiệm
**CoreBank Panel PRO** được phát triển hoàn toàn vì **mục đích giáo dục, nghiên cứu thuật toán và học hỏi cá nhân**.
Tác giả (**Dang Quoc Huy**) và người duy trì (**Astear17**) **KHÔNG CHỊU BẤT KỲ TRÁCH NHIỆM PHÁP LÝ NÀO** đối với bất kỳ rủi ro hoặc hậu quả nào phát sinh từ việc sử dụng công cụ này vi phạm điều khoản dịch vụ của ngân hàng hoặc pháp luật hiện hành. Người dùng tự chịu trách nhiệm về hành vi của mình.

> 🌟 *Phát triển bởi Dang Quoc Huy — Rebuilt bởi Astear17 cho nền tảng đám mây.*
