# 💖 Happy Anniversary Website

Một website kỷ niệm tình yêu siêu đẹp, siêu dễ thương và siêu cảm xúc, được thiết kế với phong cách Apple + Studio Ghibli + tình yêu ngọt ngào.

## ✨ Tính năng

- 🎨 **Landing Page** với animation tim bay và hiệu ứng chữ xuất hiện từ từ
- 💌 **Thư tình** với typewriter effect và hiệu ứng mở phong thư
- 📸 **Timeline tình yêu** với các mốc kỷ niệm đáng nhớ
- 🎁 **Mini Game** random quà với animation hộp quà rung lắc
- 📷 **Album Kỷ Niệm** với gallery ảnh và modal xem lớn
- 🌈 **Lời hứa tương lai** với các promise card dễ thương
- 💝 **Ending Page** với background chuyển động nhẹ
- 🎯 **Bonus Features**:
  - Click để tạo tim nổ
  - Easter egg khi click nhiều lần
  - Dark mode toggle

## 🛠️ Công nghệ

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations mượt mà
- **Lucide React** - Icons đẹp
- **Google Fonts** - Fonts handwritten/romantic

## 🚀 Cài đặt và chạy

### Yêu cầu

- Node.js 18+ 
- npm hoặc yarn

### Các bước

1. **Cài đặt dependencies:**
   ```bash
   npm install
   # hoặc
   yarn install
   ```

2. **Chạy development server:**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

3. **Mở trình duyệt:**
   Truy cập [http://localhost:3000](http://localhost:3000)

4. **Build cho production:**
   ```bash
   npm run build
   npm start
   ```

## 📝 Tùy chỉnh nội dung

### Thay đổi nội dung thư tình

Mở file `components/LoveLetter.tsx` và chỉnh sửa biến `letterContent`:

```typescript
const letterContent = `Gửi em yêu dấu của anh,
...nội dung của bạn...`
```

### Thay đổi timeline

Mở file `components/Timeline.tsx` và chỉnh sửa mảng `timelineEvents`:

```typescript
const timelineEvents: TimelineEvent[] = [
  {
    date: 'Ngày của bạn',
    title: 'Tiêu đề',
    description: 'Mô tả',
    icon: <Heart className="w-6 h-6" />,
  },
  // ...
]
```

### Thay đổi ảnh trong album

Mở file `components/PhotoAlbum.tsx` và chỉnh sửa mảng `photos`:

```typescript
const photos = [
  {
    id: 1,
    url: 'URL_ẢNH_CỦA_BẠN',
    title: 'Tiêu đề ảnh',
  },
  // ...
]
```

**Lưu ý:** 
- Có thể sử dụng ảnh từ Unsplash (đã cấu hình sẵn)
- Hoặc đặt ảnh trong thư mục `public/images/` và dùng đường dẫn `/images/tên-file.jpg`
- Nếu dùng ảnh từ domain khác, cần thêm domain vào `next.config.js`

### Thay đổi lời hứa

Mở file `components/FuturePromises.tsx` và chỉnh sửa mảng `promises`.

### Thay đổi quà trong mini game

Mở file `components/MiniGame.tsx` và chỉnh sửa mảng `gifts`.

## 🌐 Deploy miễn phí

### Deploy lên Vercel (Khuyến nghị)

1. **Đẩy code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy trên Vercel:**
   - Truy cập [vercel.com](https://vercel.com)
   - Đăng nhập bằng GitHub
   - Click "New Project"
   - Import repository của bạn
   - Vercel sẽ tự động detect Next.js và deploy
   - Website sẽ có URL dạng: `your-project.vercel.app`

### Deploy lên Netlify

1. Đẩy code lên GitHub (tương tự như trên)
2. Truy cập [netlify.com](https://netlify.com)
3. Import project từ GitHub
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Deploy lên GitHub Pages

Cần cấu hình thêm vì Next.js không hỗ trợ static export mặc định. Có thể dùng `next export` hoặc chuyển sang static site generator.

## 🎨 Tùy chỉnh màu sắc

Mở file `tailwind.config.ts` để thay đổi màu sắc:

```typescript
colors: {
  'rose-pastel': '#FFE5E5',
  'pink-pastel': '#FFD1DC',
  // Thêm màu của bạn
}
```

## 📱 Responsive

Website đã được tối ưu 100% cho mobile, tablet và desktop. Tất cả các component đều responsive.

## 💡 Tips

- **Easter Egg:** Click vào màn hình 10 lần để xem hiệu ứng đặc biệt
- **Dark Mode:** Click vào icon mặt trăng/ mặt trời ở góc trên bên phải
- **Navigation:** Sử dụng các chấm tròn bên phải để điều hướng giữa các section

## 📄 License

Dự án này được tạo với tình yêu ❤️. Bạn có thể tự do sử dụng và chỉnh sửa.

## 🙏 Credits

- Fonts: Google Fonts (Dancing Script, Great Vibes)
- Icons: Lucide React
- Animations: Framer Motion
- Design Inspiration: Apple + Studio Ghibli

---

**Chúc bạn và người yêu có một ngày kỷ niệm thật đẹp! 💖**

Nếu có bất kỳ câu hỏi nào, đừng ngần ngại tạo issue trên GitHub!
