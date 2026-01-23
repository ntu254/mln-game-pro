# Dự án: Cổng Game Phép Biện Chứng

## 1. Giới thiệu chung
**Cổng Game Phép Biện Chứng** là một nền tảng giáo dục tương tác, được thiết kế để giúp người học tiếp cận và thấu hiểu các quy luật triết học biện chứng thông qua các trò chơi mô phỏng và trải nghiệm trực quan.

Dự án biến những khái niệm triết học trừu tượng thành các tương tác sinh động, giúp việc học trở nên thú vị và dễ dàng hơn.

**Mục tiêu:**
- Giáo dục về Triết học Mác - Lênin một cách trực quan.
- Minh họa các quy luật biện chứng thông qua gameplay.
- Kết nối lý thuyết với thực tiễn đời sống.

## 2. Cơ sở Triết học cốt lõi
Dự án tập trung vào 3 quy luật cơ bản của phép biện chứng duy vật, giải thích sự "Phát triển":

### 2.1. Quy luật Lượng - Chất (Cách thức)
- **Khái niệm:** Tích lũy về lượng dẫn đến sự thay đổi về chất.
- **Trong game:** Minh họa qua sự thay đổi trạng thái của vật chất (ví dụ: nước sôi biến thành hơi nước).
- **Thông điệp:** Sự kiên trì tích lũy từng bước nhỏ sẽ tạo ra những bước nhảy vọt lớn.

### 2.2. Quy luật Thống nhất và Đấu tranh của các mặt đối lập (Nguyên nhân)
- **Khái niệm:** Mâu thuẫn là động lực của sự phát triển.
- **Trong game:** Thể hiện qua sự cân bằng và xung đột giữa các lực lượng đối lập (như âm và dương).
- **Thông điệp:** Sự phát triển sinh ra từ việc giải quyết các mâu thuẫn nội tại.

### 2.3. Quy luật Phủ định của phủ định (Hình thức)
- **Khái niệm:** Sự phát triển diễn ra theo đường xoắn ốc, kế thừa và nâng cao cái cũ.
- **Trong game:** Mô phỏng qua hình ảnh cầu thang xoắn ốc đi lên.
- **Thông điệp:** Sự phát triển không phải là vòng tròn khép kín mà là quá trình tiến lên liên tục, có tính kế thừa.

## 3. Các tính năng chính
Hệ thống cung cấp một trải nghiệm học tập toàn diện:

### 🎮 Modules Trò chơi (Game Levels)
- **Level 1:** Khám phá quy luật Lượng - Chất.
- **Level 2:** Trải nghiệm quy luật Mâu thuẫn.
- **Level 3:** Tìm hiểu quy luật Phủ định của phủ định.

### 📚 Thư viện kiến thức (Library)
- Kho tài liệu tham khảo chi tiết về các khái niệm triết học tương ứng.

### 🌐 Ứng dụng thực tiễn (Real-world Applications)
- Các ví dụ minh họa cách áp dụng triết học vào đời sống, công việc và xã hội.

### 🏆 Bảng xếp hạng (Leaderboard)
- Thúc đẩy tinh thần học tập qua sự cạnh tranh lành mạnh giữa người chơi.

## 4. Công nghệ sử dụng
Dự án được xây dựng trên nền tảng web hiện đại, hiệu suất cao:

- **Frontend Framework:** React 19
- **Build Tool:** Vite (cho tốc độ phát triển và build cực nhanh)
- **Ngôn ngữ:** TypeScript (đảm bảo tính chặt chẽ của mã nguồn)
- **Styling:** Tailwind CSS (thiết kế giao diện hiện đại, responsive)
- **Môi trường:** Node.js

## 5. Hướng dẫn cài đặt và chạy dự án

### Yêu cầu tiên quyết
- Node.js đã được cài đặt trên máy.

### Các bước thực hiện
1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```
2. **Cấu hình môi trường:**
   - Cập nhật `GEMINI_API_KEY` trong file `.env.local` (nếu cần sử dụng tính năng AI).
3. **Chạy ứng dụng (Môi trường Dev):**
   ```bash
   npm run dev
   ```
4. **Build production:**
   ```bash
   npm run build
   ```

---
*Dự án được phát triển với niềm đam mê đổi mới phương pháp giáo dục Triết học.*
