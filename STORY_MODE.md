# 🎬 Story-Driven Mode - Chế độ kể chuyện điện ảnh

## ✨ Tính năng mới

Website đã được nâng cấp thành **Story-Driven Mode** với trải nghiệm như xem phim!

### 🎥 Cinematic Scroll System
- **Chuyển cảnh như phim**: Mỗi section là một chương với hiệu ứng fade, zoom, depth, blur
- **Parallax effects**: Hiệu ứng chiều sâu khi scroll
- **Smooth transitions**: Chuyển cảnh mượt mà như trailer điện ảnh

### 💑 Welcome Question
- **Câu hỏi đầu tiên**: "Em đang xem cùng anh hay xem một mình?"
- **Nội dung thay đổi**: Website sẽ hiển thị nội dung khác nhau tùy theo lựa chọn
- **Personalized experience**: Trải nghiệm được cá nhân hóa

### 🎮 Memory Quiz Game
- **Trò chơi kỷ niệm**: Câu hỏi về những kỷ niệm của hai người
- **Phần thưởng xịn**: Trả lời đúng → quà đặc biệt
- **Phạt dễ thương**: Trả lời sai → phạt ngọt ngào 😆
- **Tính điểm**: Theo dõi số câu trả lời đúng

### 💌 Burnable Letter - Thư chỉ mở một lần
- **Chỉ mở được một lần**: Sử dụng localStorage để lưu trạng thái
- **Hiệu ứng cháy**: Viền thư cháy nhẹ khi đọc xong
- **Tan biến**: Thư tự động biến mất sau khi đọc
- **Không reload được**: Một khi đã mở, không thể mở lại

### ⏳ Time Capsule
- **Tin nhắn tương lai**: Gửi tin nhắn sẽ mở sau 1 năm
- **Đếm ngược**: Hiển thị thời gian còn lại
- **Tự động mở**: Đến đúng ngày sẽ tự động hiển thị nội dung
- **Cá nhân hóa**: Nội dung khác nhau tùy theo lựa chọn ban đầu

### 🎁 Mini Game không fix cứng
- **Random quà**: Mỗi lần mở sẽ có quà khác nhau
- **Nhiều loại quà**: Message, kiss, promise, surprise
- **Animation đẹp**: Hộp quà rung lắc và mở ra

### 🐰 Easter Egg cấp độ người yêu
- **Click logo tim 10 lần**: Ở góc trên bên trái
- **Thông điệp đặc biệt**: "Anh biết em tò mò mà 😘"
- **Random dựa trên**:
  - Thời gian mở web (sáng/chiều/tối)
  - Số lần click
  - Lần đầu hay lần thứ n
- **Animation đẹp**: Pháo hoa tim, sao, sparkles

## 🚀 Cách sử dụng

### Truy cập Story Mode:
```
http://localhost:3000/story
```

### Hoặc cập nhật page.tsx chính:
Thay đổi `app/page.tsx` để redirect đến story mode hoặc cho user chọn.

## 📋 Các chương trong Story

1. **Khởi đầu** - Landing Page
2. **Thư tình** - Burnable Letter (chỉ mở một lần)
3. **Hành trình** - Timeline
4. **Đếm ngược** - Countdown Timer
5. **Trò chơi kỷ niệm** - Memory Quiz Game
6. **Hộp quà** - Mini Game
7. **Khoảnh khắc** - Photo Album
8. **Hộp kỷ niệm** - Memory Box
9. **Lời hứa** - Future Promises
10. **Câu nói yêu thương** - Love Quotes
11. **Time Capsule** - Tin nhắn tương lai
12. **Kết thúc** - Ending Page

## 🎨 Tùy chỉnh

### Thay đổi Time Capsule date:
Mở `app/story/page.tsx`, tìm:
```typescript
<TimeCapsule 
  targetDate="2026-12-31"  // Thay đổi ngày ở đây
  message="..."
/>
```

### Thay đổi Countdown Timer:
```typescript
<CountdownTimer 
  targetDate="2025-12-31"  // Thay đổi ngày
  title="Tiêu đề của bạn"
/>
```

### Thêm câu hỏi vào Memory Quiz:
Mở `components/MemoryQuizGame.tsx`, thêm vào mảng `questions`:
```typescript
{
  question: 'Câu hỏi của bạn?',
  options: ['Đáp án 1', 'Đáp án 2', 'Đáp án 3', 'Đáp án 4'],
  correctAnswer: 0,  // Index của đáp án đúng
  reward: 'Phần thưởng khi đúng',
  penalty: 'Phạt khi sai',
}
```

## 💡 Tips

- **Test thư tình**: Mở một lần, sau đó xóa localStorage để test lại
- **Easter egg**: Click logo tim ở góc trên bên trái 10 lần liên tiếp
- **Cinematic scroll**: Scroll chậm để thấy hiệu ứng đẹp nhất
- **View mode**: Chọn "Xem cùng anh" để có trải nghiệm đặc biệt hơn

---

**Website giờ đây là một câu chuyện tình yêu đầy cảm xúc! 💖🎬**
