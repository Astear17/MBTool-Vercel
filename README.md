<div align="center">
  <img src="https://img.icons8.com/fluency/144/bank.png" width="100" />
  <h1>🏦 CoreBank Panel PRO</h1>
  <p><strong>The Ultimate Transaction Monitoring & Banking Automation Suite</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Version-2.0.0--PRO-blue?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Powered_By-TypeScript-3178c6?style=for-the-badge&logo=typescript" />
    <img src="https://img.shields.io/badge/UI_UX-Premium-FFD700?style=for-the-badge" />
  </p>

  <p>
    <a href="https://render.com/deploy?repo=https://github.com/Astear17/MBTool-Vercel">
      <img src="https://render.com/images/deploy-to-render-button.svg" height="40" alt="Deploy to Render" />
    </a>
  </p>
</div>

---

## ✨ Hệ Thống Quản Trị Ngân Hàng Đẳng Cấp

**CoreBank Panel PRO** không chỉ là một công cụ giám sát, mà là một trải nghiệm quản trị ngân hàng hiện đại. Được thiết kế với triết lý **Rich Aesthetics**, ứng dụng mang đến giao diện **Glassmorphism** sang trọng, phông chữ **Inter** sắc nét và các hiệu ứng chuyển động mượt mà.

Dưới lớp vỏ hào nhoáng là một cỗ máy mạnh mẽ, sử dụng **AI OCR (ONNX)** để giải mã captcha và **WASM Engine** để mã hóa bảo mật, giúp bạn làm chủ mọi giao dịch mà không cần thông qua bất kỳ bên thứ ba nào.

---

## 💎 Tính Năng Thượng Lưu

| Tính năng | Chi tiết kỹ thuật |
|-----------|------------------|
| 🔐 **Smart Auth** | Tự động đăng nhập, tự động giải captcha bằng trí tuệ nhân tạo (ONNX model). Không cần can thiệp thủ công. |
| 📊 **Dynamic Dashboard** | Theo dõi số dư tổng và từng tài khoản với biểu đồ và số liệu trực quan, cập nhật thời gian thực. |
| 🔔 **Omni-Notifications** | Hệ thống đẩy thông báo tức thì qua **Telegram**, **Discord Webhook** và **Custom API Webhook**. |
| 🛡️ **Military Encryption** | Sử dụng chính module **WASM** của ngân hàng để thực hiện mã hóa chữ ký số, đảm bảo an toàn tuyệt đối. |
| 🎨 **Pro Aesthetics** | Giao diện hỗ trợ **Dark/Light Mode**, thiết kế theo phong cách kỉ nguyên mới với hiệu ứng kính mờ và gradient. |

---

## 🚀 Hướng Dẫn Triển Khai Siêu Tốc

### 1. Triển Khai Lên Render (Ưu tiên)
Đây là cách nhanh nhất để đưa hệ thống vào hoạt động:
1. Nhấn nút **Deploy to Render** ở phía trên.
2. Hệ thống sẽ tự động nhận diện file `render.yaml` và cài đặt toàn bộ môi trường.
3. Chờ trạng thái chuyển sang **Live** và tận hưởng kết quả.

> 💡 **Gợi ý**: Với gói Free của Render, server sẽ "ngủ" sau 15p không dùng. Hệ thống của chúng tôi đã tích hợp sẵn màn hình **Splash Screen** để chờ server khởi động lại tự động khi bạn truy cập.

### 2. Triển Khai Docker (Dành cho VPS)
Dành cho người dùng muốn sự ổn định tuyệt đối 24/7 trên máy chủ riêng:
```bash
git clone https://github.com/Astear17/MBTool-Vercel.git
cd MBTool-Vercel
docker-compose up -d --build
```

---

## 📖 Hướng Dẫn Sử Dụng Chuyên Nghiệp

### Đăng Nhập Hệ Thống
- Sử dụng số điện thoại và mật khẩu Internet Banking của bạn.
- Hệ thống sẽ tự động thực hiện các bước: *Lấy Captcha -> Giải mã AI -> Mã hóa WASM -> Đăng nhập*.
- Nếu captcha sai, hệ thống tự động thử lại tối đa 5 lần.

### Cấu Hình Giám Sát (Monitor)
- Vào mục **Cài đặt** để bật tính năng Monitor.
- Thiết lập **Telegram Bot Token** và **Chat ID** để nhận thông báo biến động số dư ngay trên điện thoại.
- Tùy chỉnh thời gian giãn cách (Interval) để tối ưu hóa hiệu suất.

### Tài Liệu API
- Hệ thống cung cấp tài liệu API tích hợp sẵn (Swagger-like) ngay trong ứng dụng.
- Hỗ trợ các mẫu code **Node.js**, **Python**, **cURL** để bạn tích hợp vào hệ thống riêng của mình.

---

## 🛠 Kiến Trúc Hệ Thống

```text
├── server/
│   ├── index.ts               # Máy chủ Express hiệu năng cao
│   ├── services/
│   │   ├── captcha-ocr.ts     # Trí tuệ nhân tạo giải mã Captcha
│   │   ├── wasm-engine.ts     # Động cơ mã hóa WASM bảo mật
│   │   └── monitor.ts         # Trình giám sát giao dịch ngầm
├── src/                       # Frontend Vue.js 3 với Inter Font
├── render.yaml                # Cấu hình BluePrint Render
└── Dockerfile                 # Docker Containerization
```

---

## ⚖️ Giấy Phép & Miễn Trừ

### Bản Quyền (Credits)
- 🛠 **Original Creator**: [Dang Quoc Huy](https://facebook.com/dangquochuy.dev)
- 🔀 **Refined & Maintained**: [Astear17](https://github.com/Astear17)

### Miễn Trừ Trách Nhiệm
Dự án được phát triển cho mục đích nghiên cứu học thuật và học tập cá nhân. Người sử dụng hoàn toàn chịu trách nhiệm về hành vi sử dụng của mình đối với quy định của Ngân hàng và Pháp luật.

---
<div align="center">
  <p>Giao diện được tinh chỉnh với ❤️ bởi <strong>Antigravity AI</strong></p>
</div>
