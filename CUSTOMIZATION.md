# 🎨 Hướng dẫn tùy chỉnh chi tiết

## 📝 Thay đổi nội dung

### 1. Thư tình (Love Letter)

**File:** `components/LoveLetter.tsx`

Tìm và chỉnh sửa biến `letterContent`:

```typescript
const letterContent = `Gửi em yêu dấu của anh,

Hôm nay là một ngày đặc biệt...
// Viết nội dung của bạn ở đây
`
```

**Tips:**
- Giữ nguyên format với dấu backtick (`)
- Có thể thêm emoji để làm cho thư thêm dễ thương
- Mỗi dòng mới sẽ được hiển thị như một đoạn mới

### 2. Timeline tình yêu

**File:** `components/Timeline.tsx`

Chỉnh sửa mảng `timelineEvents`:

```typescript
const timelineEvents: TimelineEvent[] = [
  {
    date: '01/01/2024', // Ngày của bạn
    title: 'Chúng ta gặp nhau', // Tiêu đề
    description: 'Mô tả chi tiết về sự kiện...', // Mô tả
    icon: <Sparkles className="w-6 h-6" />, // Icon (có thể thay đổi)
  },
  // Thêm nhiều sự kiện khác...
]
```

**Icons có sẵn:**
- `<Heart />` - Trái tim
- `<Star />` - Ngôi sao
- `<Sparkles />` - Tia sáng
- `<Calendar />` - Lịch
- Hoặc bất kỳ icon nào từ `lucide-react`

### 3. Album ảnh

**File:** `components/PhotoAlbum.tsx`

**Cách 1: Sử dụng ảnh từ URL**

```typescript
const photos = [
  {
    id: 1,
    url: 'https://example.com/photo1.jpg',
    title: 'Kỷ niệm đẹp 1',
  },
]
```

**Cách 2: Sử dụng ảnh local**

1. Đặt ảnh vào thư mục `public/images/`
2. Sử dụng đường dẫn tương đối:

```typescript
const photos = [
  {
    id: 1,
    url: '/images/photo1.jpg',
    title: 'Kỷ niệm đẹp 1',
  },
]
```

**Lưu ý:**
- Ảnh nên có tỷ lệ 1:1 hoặc gần vuông để hiển thị đẹp nhất
- Kích thước khuyến nghị: 800x800px hoặc lớn hơn
- Format: JPG, PNG, WebP

### 4. Mini Game - Quà bí mật

**File:** `components/MiniGame.tsx`

Chỉnh sửa mảng `gifts`:

```typescript
const gifts: GiftItem[] = [
  {
    type: 'message', // Loại: 'message' | 'kiss' | 'promise' | 'surprise'
    content: 'Lời chúc của bạn! 💖',
    icon: <Heart className="w-12 h-12" />,
    color: 'from-pink-400 to-rose-400', // Màu gradient
  },
]
```

**Màu gradient có sẵn:**
- `from-pink-400 to-rose-400` - Hồng
- `from-yellow-400 to-orange-400` - Vàng cam
- `from-purple-400 to-pink-400` - Tím hồng
- `from-blue-400 to-purple-400` - Xanh tím
- Hoặc tự tạo màu riêng

### 5. Lời hứa tương lai

**File:** `components/FuturePromises.tsx`

Chỉnh sửa mảng `promises`:

```typescript
const promises: Promise[] = [
  {
    icon: <Heart className="w-8 h-8" />,
    text: 'Lời hứa của bạn',
    color: 'from-pink-400 to-rose-400',
  },
]
```

### 6. Landing Page

**File:** `components/LandingPage.tsx`

Tìm và chỉnh sửa:

```typescript
<motion.h1>
  Happy Anniversary // Thay đổi tiêu đề
</motion.h1>

<motion.p>
  My Love // Thay đổi phụ đề
</motion.p>
```

### 7. Ending Page

**File:** `components/EndingPage.tsx`

Tìm và chỉnh sửa:

```typescript
<motion.h2>
  Cảm ơn em vì đã ở bên anh // Thay đổi nội dung
</motion.h2>
```

## 🎨 Thay đổi màu sắc

### Màu chủ đạo

**File:** `tailwind.config.ts`

```typescript
colors: {
  'rose-pastel': '#FFE5E5', // Màu hồng pastel
  'pink-pastel': '#FFD1DC', // Màu hồng nhạt
  'lavender': '#E6E6FA', // Màu oải hương
  // Thêm màu của bạn
}
```

### Background gradient

**File:** `app/page.tsx`

Tìm dòng:

```typescript
bg-gradient-to-br from-rose-pastel via-pink-pastel to-lavender
```

Thay đổi thành màu bạn muốn, ví dụ:

```typescript
bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200
```

## 🔤 Thay đổi font chữ

**File:** `app/layout.tsx`

Hiện tại đang dùng:
- `Dancing Script` - Font chữ viết tay
- `Great Vibes` - Font chữ lãng mạn

Có thể thay đổi bằng cách:

1. Truy cập [Google Fonts](https://fonts.google.com)
2. Chọn font bạn muốn
3. Import vào `app/layout.tsx`:

```typescript
import { Your_Font } from 'next/font/google'

const yourFont = Your_Font({
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

4. Thêm vào className của body

## ⚙️ Tùy chỉnh animation

### Tốc độ animation

**File:** Các component sử dụng Framer Motion

Tìm `transition` và chỉnh sửa:

```typescript
transition={{ duration: 0.8 }} // Tăng/giảm số để thay đổi tốc độ
```

### Số lượng tim bay

**File:** `components/FloatingHearts.tsx`

```typescript
{[...Array(15)].map(...)} // Thay 15 thành số bạn muốn
```

**File:** `components/LandingPage.tsx`

```typescript
{[...Array(20)].map(...)} // Thay 20 thành số bạn muốn
```

## 🎵 Thêm nhạc nền (Tùy chọn)

1. Đặt file nhạc vào `public/music/`
2. Thêm vào `components/EndingPage.tsx` hoặc `app/page.tsx`:

```typescript
useEffect(() => {
  const audio = new Audio('/music/your-song.mp3')
  audio.loop = true
  audio.volume = 0.3 // 0-1
  // audio.play() // Uncomment để tự động phát
}, [])
```

**Lưu ý:** Nên để người dùng tự bật nhạc để tránh làm phiền.

## 📱 Tối ưu mobile

Website đã responsive, nhưng bạn có thể điều chỉnh:

- Breakpoints trong Tailwind: `md:` (768px), `lg:` (1024px)
- Font size: Giảm kích thước chữ trên mobile nếu cần
- Spacing: Điều chỉnh padding/margin cho mobile

## 🚀 Performance Tips

1. **Tối ưu ảnh:**
   - Sử dụng format WebP
   - Compress ảnh trước khi upload
   - Sử dụng Next.js Image component (đã có sẵn)

2. **Giảm animation:**
   - Giảm số lượng tim bay nếu website chậm
   - Giảm số lượng sparkles

3. **Lazy loading:**
   - Các component đã sử dụng `whileInView` để lazy load

---

**Chúc bạn tùy chỉnh thành công! 💖**
