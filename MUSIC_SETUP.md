# 🎵 Hướng dẫn thêm nhạc "7 Years"

## Cách 1: Sử dụng file MP3 local (Khuyến nghị)

### Bước 1: Tải file nhạc
- Tải file MP3 bài "7 Years" của Lukas Graham
- Đổi tên file thành: `7-years.mp3`

### Bước 2: Đặt file vào thư mục
- Tạo thư mục `public/music/` (nếu chưa có)
- Đặt file `7-years.mp3` vào thư mục đó
- Đường dẫn cuối cùng: `public/music/7-years.mp3`

### Bước 3: Kiểm tra
- Chạy `npm run dev`
- Click vào nút nhạc ở góc dưới bên trái
- Nhạc sẽ tự động phát

## Cách 2: Sử dụng URL từ internet

### Mở file `components/MusicPlayer.tsx`

Tìm dòng:
```typescript
audioRef.current.src = '/music/7-years.mp3'
```

Thay bằng URL nhạc của bạn:
```typescript
audioRef.current.src = 'https://example.com/7-years.mp3'
```

**Lưu ý:** 
- URL phải cho phép CORS (Cross-Origin Resource Sharing)
- Nhiều website chặn CORS, nên cách 1 (file local) tốt hơn

## Cách 3: Sử dụng YouTube (Nâng cao)

Nếu muốn dùng YouTube, bạn cần:
1. Sử dụng YouTube API
2. Hoặc convert YouTube sang MP3 và dùng cách 1

## Tính năng Music Player

- ✅ **Play/Pause** - Click nút nhạc để bật/tắt
- ✅ **Volume Control** - Điều chỉnh âm lượng
- ✅ **Mute/Unmute** - Tắt/bật tiếng
- ✅ **Auto Loop** - Tự động lặp lại
- ✅ **Beautiful UI** - Giao diện đẹp, responsive
- ✅ **Floating Button** - Nút nổi ở góc dưới bên trái

## Troubleshooting

### Nhạc không phát?
1. Kiểm tra file có đúng đường dẫn không
2. Kiểm tra console (F12) xem có lỗi gì không
3. Đảm bảo file MP3 hợp lệ
4. Thử dùng URL online thay vì file local

### Nhạc bị gián đoạn?
- Có thể do file quá lớn, nên nén file MP3
- Hoặc sử dụng file có bitrate thấp hơn (128kbps)

### Browser chặn auto-play?
- Đây là hành vi bình thường của browser
- User phải click nút play để bật nhạc
- Đây là cách bảo vệ user khỏi quảng cáo tự động phát

## Tùy chỉnh

### Thay đổi bài hát khác:
1. Đổi tên file hoặc URL trong `MusicPlayer.tsx`
2. Thay đổi tên bài hát hiển thị:
   ```typescript
   <p className="font-handwriting text-lg text-pink-700 font-semibold">
     7 Years  // Thay đổi tên ở đây
   </p>
   ```

### Thay đổi vị trí nút nhạc:
Tìm trong `MusicPlayer.tsx`:
```typescript
className="fixed bottom-6 left-6 z-50"
// Thay đổi bottom/left để di chuyển nút
```

---

**Chúc bạn thêm nhạc thành công! 🎵💖**
