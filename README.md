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
    <a href="https://render.com/deploy?repo=https://github.com/Astear17/MBTool-Vercel">
      <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" />
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

## 🚀 Hướng dẫn Triển khai

### 1. Triển khai lên Render (Nhanh nhất)

1. Nhấn nút **Deploy to Render** ở trên.
2. Render sẽ tự động cấu hình dựa trên file `render.yaml`.
3. Sau khi trạng thái chuyển sang **Live**, bạn có thể truy cập web ngay lập tức.

> **💡 Lưu ý:** Render gói miễn phí sẽ tự tắt sau một thời gian không có người dùng. Lần truy cập đầu tiên sau khi server tắt sẽ mất khoảng 30-60 giây để khởi động lại.

### 2. Triển khai bằng Docker (Khuyên dùng cho VPS)

Dành cho các bạn muốn chạy 24/7 ổn định nhất:
```bash
git clone https://github.com/Astear17/MBTool-Vercel.git
cd MBTool-Vercel
docker-compose up -d --build
```

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
├── render.yaml                # Cấu hình triển khai Render
└── Dockerfile                 # Docker build
```

---

## 📖 Hướng dẫn Sử dụng

1. **Đăng nhập**: Nhập Số điện thoại và Mật khẩu ngân hàng. Hệ thống tự giải captcha và đăng nhập.
2. **Cấu hình Thông báo**: Vào phần Cài đặt để thiết lập Token Telegram hoặc Webhook Discord.
3. **Giám sát**: Bật chế độ Monitor để nhận thông báo biến động số dư tức thì.

---

## ⚖️ Giấy phép & Miễn trừ Trách nhiệm

### Giấy phép
Dự án được phát hành dưới giấy phép **MIT License**. Bạn có quyền sử dụng, sao chép và sửa đổi mã nguồn.

### Miễn trừ Trách nhiệm
Dự án được phát triển hoàn toàn vì **mục đích giáo dục và nghiên cứu**. Tác giả không chịu bất kỳ trách nhiệm nào đối với việc sử dụng công cụ này vi phạm điều khoản của ngân hàng hoặc pháp luật.

> 🌟 *Phát triển bởi Dang Quoc Huy — Rebuilt bởi Astear17.*
