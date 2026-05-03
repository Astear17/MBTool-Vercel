<div align="center">
  <img src="https://play-lh.googleusercontent.com/M9OvPTmGRRtq40m0WtVRC7v5Rc4bNxj_IliowQSOm-oi2bLmnxsQcgqO-6ajUIQ2f-U" width="100" />
  <h1>MBPanel</h1>
  <p><strong>Dashboard quản lý tài chính MBBank, ngay trên Render.</strong></p>
  
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

## ✨ Về MBPanel

**MBPanel** là một bản fork của [danieldev23/corebank-panel](https://github.com/danieldev23/corebank-panel). Thay vì tự host và chạy bằng Docker/Node.js thì ta có thể deploy lên Render để dùng thông qua One-Click Render Deploy, chưa mất tới 5 phút.

Webapp sử dụng **AI OCR (ONNX)** để giải mã captcha và **WASM Engine** để mã hóa bảo mật, giúp bạn quản lý giao dịch một cách an toàn. Các lưu trữ API được lấy từ https://online.mbbank.com.vn.

---

## 💎 Các tính năng

| Tính năng | Chi tiết kỹ thuật |
|-----------|------------------|
| 🔐 **Auto Resolve** | Tự động giải captcha bằng tool OCR AI (ONNX model) |
| 📊 **Dynamic Dashboard** | Theo dõi số dư tổng và từng tài khoản với biểu đồ và số liệu trực quan. |
| 🔔 ***Instant Notifications** | Hệ thống đẩy thông báo *tức thì qua **Telegram**, **Discord Webhook** và **Custom API Webhook**. |
| 🛡️ **Safe Encryption** | Sử dụng chính module **Go WASM** của ngân hàng để thực hiện mã hóa chữ ký số bằng cơ chế `dataEnc`. |
| 🎨 **Pro Aesthetics** | Giao diện hỗ trợ **Dark/Light Mode**, thiết kế trực quan qua Vue 3 UI và a ngôn ngữ. |

---

## 🚀 Hướng dẫn deploy
### 1. Deploy  Render (Ưu tiên)
Đây là cách nhanh nhất để đưa hệ thống vào hoạt động:
1. Nhấn nút **Deploy to Render** ở phía dưới.
<br><a href="https://render.com/deploy?repo=https://github.com/Astear17/MBTool-Vercel"><img src="https://render.com/images/deploy-to-render-button.svg" height="40" alt="Deploy to Render" /></a>
2. Hệ thống sẽ tự động nhận diện file `render.yaml` và cài đặt toàn bộ môi trường.
3. Chờ trạng thái chuyển sang **Live** và tận hưởng kết quả.
> Nếu bạn muốn đổi subdomain `*.onrender.com`, hãy clone hoặc fork về rồi đổi `name: corebank-panel-pro` thành subdomain bạn muốn

> *Instant Notifications chỉ hoạt động nếu bạn host locally bằng Docker/sử dụng gói đăng ký Render hoạt động 24/7

### 2. Host bằng Docker (Dành cho VPS)
Dành cho người dùng muốn sự ổn định tuyệt đối 24/7 trên máy chủ riêng (nhớ cài sẵn Docker):
```bash
git clone https://github.com/Astear17/MBTool-Vercel.git
cd MBTool-Vercel
docker-compose up -d --build
```

---

## 📖 Guides

### Đăng nhập
- Sử dụng số điện thoại và mật khẩu tài khoản của bạn.
- Hệ thống sẽ tự động thực hiện các bước: *Lấy Captcha -> Giải mã AI -> Mã hóa WASM -> Đăng nhập*.
- Nếu captcha sai, hệ thống tự động thử lại tối đa 5 lần.

### Cấu Hình Giám Sát (Monitor)
- Vào mục **Cài đặt** để bật tính năng Monitor.
- Thiết lập **Telegram Bot Token** và **Chat ID** hoặc **Discord**, **Custom Webhook** để nhận thông báo biến động số dư ngay trên điện thoại.
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

