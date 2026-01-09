# 📝 Software Architect Portfolio - Hướng dẫn sử dụng

## 🎯 Cách sửa nội dung Portfolio

### ✏️ Chỉ cần sửa file `data.json`!

Bạn **KHÔNG CẦN** sửa HTML hay JavaScript nữa. Tất cả nội dung được quản lý trong file `data.json`.

### 📂 Cấu trúc file `data.json`

```json
{
  "personal": {
    "name": "Tên của bạn",
    "title": "Chức danh",
    "description": "Mô tả ngắn gọn..."
  },
  "skills": [...],
  "experience": [...],
  "projects": [...],
  ...
}
```

### 🔧 Các phần có thể chỉnh sửa:

1. **Thông tin cá nhân** (`personal`): Tên, chức danh, mô tả
2. **Kỹ năng** (`skills`): Thêm/sửa/xóa skills và progress %
3. **Kinh nghiệm** (`experience`): Cập nhật công việc, thời gian
4. **Dự án** (`projects`): Thêm dự án mới, sửa mô tả
5. **Học vấn** (`education`): Bằng cấp, trường học
6. **Chứng chỉ** (`certifications`): Các chứng chỉ chuyên môn
7. **Liên hệ** (`contact`): Email, số điện thoại, địa chỉ

---

## 🚀 Cách chạy Portfolio

### ⚠️ LƯU Ý QUAN TRỌNG

**KHÔNG THỂ** mở trực tiếp file `index.html` bằng cách double-click!

Lý do: Trình duyệt chặn việc load file JSON từ `file://` protocol (CORS policy).

### ✅ Cách 1: Dùng Live Server (Khuyến nghị)

1. Mở thư mục dự án bằng **Visual Studio Code**
2. Cài extension **Live Server**:
   - Vào Extensions (Ctrl+Shift+X)
   - Tìm "Live Server"
   - Click Install
3. Chuột phải vào `index.html` → chọn **"Open with Live Server"**
4. Website sẽ tự động mở tại `http://localhost:5500`

**Lợi ích**: Tự động reload khi bạn sửa file `data.json`!

### ✅ Cách 2: Dùng Python HTTP Server

```bash
# Mở terminal tại thư mục dự án
cd c:\Users\nangh\Documents\workplace\google-antigravity\technical-profile

# Chạy server (Python 3)
python -m http.server 8000

# Hoặc Python 2
python -m SimpleHTTPServer 8000
```

Sau đó mở trình duyệt và truy cập: `http://localhost:8000`

### ✅ Cách 3: Dùng Node.js http-server

```bash
# Cài đặt (chỉ cần làm 1 lần)
npm install -g http-server

# Chạy server
cd c:\Users\nangh\Documents\workplace\google-antigravity\technical-profile
http-server

# Mở trình duyệt tại http://localhost:8080
```

---

## 📝 Ví dụ: Thêm một Skill mới

Mở file `data.json`, tìm phần `skills`, thêm vào:

```json
{
  "category": "Backend Technologies",
  "icon": "fa-server",
  "items": [
    {
      "name": "Ruby on Rails",
      "level": "Advanced",
      "progress": 80
    }
  ]
}
```

Lưu file → Trình duyệt tự động reload (nếu dùng Live Server)!

---

## 📝 Ví dụ: Thêm một Dự án mới

```json
{
  "title": "Tên dự án mới",
  "description": "Mô tả dự án...",
  "icon": "fa-rocket",
  "gradient": "var(--primary-gradient)",
  "tags": ["React", "Node.js", "MongoDB"],
  "category": "cloud microservices"
}
```

---

## 🎨 Icons có sẵn

Dự án sử dụng **Font Awesome 6.5.1**. Một số icons phổ biến:

- `fa-cloud` - Cloud
- `fa-server` - Server
- `fa-database` - Database
- `fa-code` - Code
- `fa-rocket` - Rocket
- `fa-chart-line` - Chart
- `fa-mobile-alt` - Mobile
- `fa-shopping-cart` - Shopping
- `fa-hospital` - Hospital

Xem thêm tại: https://fontawesome.com/icons

---

## 🎨 Gradients có sẵn

- `var(--primary-gradient)` - Purple to Violet
- `var(--secondary-gradient)` - Pink to Red
- `var(--accent-gradient)` - Blue to Cyan
- `var(--success-gradient)` - Green to Cyan

Hoặc tự tạo:
```
linear-gradient(135deg, #color1 0%, #color2 100%)
```

---

## 📁 Cấu trúc Files

```
technical-profile/
├── index.html          # Structure (KHÔNG CẦN SỬA)
├── style.css           # Styling (KHÔNG CẦN SỬA)
├── script.js           # Interactions (KHÔNG CẦN SỬA)
├── data-loader.js      # Data loader (KHÔNG CẦN SỬA)
├── data.json           # ✏️ CHỈ SỬA FILE NÀY!
└── README.md           # File này
```

---

## 🐛 Troubleshooting

### Vấn đề: Trang trắng hoặc hiển thị lỗi

**Nguyên nhân**: Mở file trực tiếp bằng `file://`

**Giải pháp**: Dùng một trong 3 cách chạy server ở trên

### Vấn đề: Sửa data.json nhưng không thấy thay đổi

**Giải pháp**: 
1. Hard refresh: Ctrl + F5 (Windows) hoặc Cmd + Shift + R (Mac)
2. Xóa cache trình duyệt
3. Kiểm tra JSON syntax có đúng không (dùng JSONLint.com)

### Vấn đề: Lỗi JSON syntax

**Giải pháp**:
1. Copy nội dung `data.json`
2. Paste vào https://jsonlint.com/
3. Click "Validate JSON"
4. Sửa lỗi theo gợi ý

---

## 🚀 Deploy lên Internet

### GitHub Pages (Miễn phí)

1. Tạo repository trên GitHub
2. Upload tất cả files
3. Vào Settings → Pages
4. Chọn branch `main` → Save
5. Website sẽ có địa chỉ: `https://username.github.io/repo-name`

### Netlify (Miễn phí)

1. Kéo thả thư mục vào https://app.netlify.com/drop
2. Website được deploy ngay lập tức!

### Vercel (Miễn phí)

1. Cài Vercel CLI: `npm i -g vercel`
2. Chạy: `vercel`
3. Follow hướng dẫn

---

## 💡 Tips

- **Backup**: Luôn backup file `data.json` trước khi sửa lớn
- **Git**: Dùng Git để quản lý versions
- **Validate**: Kiểm tra JSON syntax trước khi lưu
- **Test**: Test trên local server trước khi deploy

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra console log (F12 → Console tab)
2. Validate JSON syntax
3. Đảm bảo đang chạy qua HTTP server (không phải file://)

---

**Chúc bạn thành công! 🎉**
