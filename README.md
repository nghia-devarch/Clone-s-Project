# 🎓 UStudy HCMUS - Hệ thống Hỗ trợ Quản lý Học tập Toàn diện

Hệ thống web hoàn chỉnh, hiện đại, mã nguồn sạch, cấu trúc sáng sủa và dễ đọc hiểu dành cho sinh viên **Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM (HCMUS)**.

---

## 🌟 Toàn bộ Chức năng Đã Hoàn thiện (Full Features)

### 1. 📊 Trang Tổng quan sinh viên (`/dashboard` - `DashboardPage.jsx`)
- Hiển thị danh thiếp hồ sơ sinh viên: Họ tên, MSSV, Khóa tuyển sinh, Lớp sinh hoạt, Ngành đào tạo.
- 4 Thẻ KPI học tập:
  - **GPA Hệ 10** (Thang điểm 10 chuẩn).
  - **GPA Hệ 4.0** kèm Xếp loại học lực (Xuất sắc, Giỏi, Khá, Trung bình).
  - **Tín chỉ tích lũy** (So sánh với 138 TC toàn khóa và % tiến độ tốt nghiệp).
  - **Học phí học kỳ hiện tại** (Tình trạng đã nộp / cần nộp, số tiền).
- **Biểu đồ tiến trình GPA học kỳ**: Trực quan hóa biến thiên điểm trung bình và số tín chỉ qua từng học kỳ.
- Bảng tóm tắt Thời khóa biểu học kỳ này & Lịch thi sắp tới.
- Lối tắt nhanh tới các tính năng sinh viên.

### 2. 🗺️ Lộ trình học tập & Xếp lịch (`/study-roadmap` - `StudyRoadmapPage.jsx`)
- **Tab 1: Chương trình đào tạo (`program`)**: Cây phân loại môn học theo 4 khối kiến thức:
  - Khối Giáo dục đại cương (56 TC).
  - Khối Cơ sở ngành (38 TC).
  - Khối Chuyên ngành (34 TC).
  - Khối Tốt nghiệp (10 TC - Khóa luận / Thực tập / Chuyên đề).
  - Trạng thái từng môn trực quan: 🟢 *Đã đạt*, 🔵 *Đang học*, 🔴 *Cần học lại*, ⚪ *Chưa học*.
- **Tab 2: Kế hoạch 4 năm (`study-plan`)**: Sắp xếp môn học dự kiến theo từng học kỳ (Năm 1 HK1/HK2, Năm 2, Năm 3, Năm 4).
- **Tab 3: Chọn môn & Học phí (`selection`)**: Duyệt kho môn học mở, thêm vào Giỏ môn học, ước tính tổng tín chỉ và học phí dự kiến.
- **Tab 4: Xếp lịch & Xung đột (`calendar`)**: Tự động phát hiện xung đột lịch học (cảnh báo trùng tiết / trùng thứ giữa các môn trong giỏ).

### 3. 📝 Quản lý Bảng điểm & Kế hoạch GPA (`/grades` - `GradesPage.jsx`)
- **Tab 1: Bảng điểm chi tiết (`overview`)**:
  - Bảng điểm phân theo từng học kỳ, lọc theo kỳ.
  - Cột: Mã môn, Tên môn, Số TC, Điểm hệ 10, Điểm chữ, Điểm hệ 4, Trạng thái đạt.
  - Thống kê GPA tích lũy, số tín chỉ tích lũy.
  - Hỗ trợ xuất bảng điểm Word (`.docx`).
- **Tab 2: Kế hoạch GPA Mục tiêu (`target`)**:
  - Thiết lập mục tiêu tốt nghiệp: Xuất sắc (≥3.6), Giỏi (≥3.2), Khá (≥2.5).
  - Thuật toán tự động tính: Cần đạt bao nhiêu điểm trung bình ở các tín chỉ còn lại để đạt mục tiêu, đánh giá tính khả thi.
- **Tab 3: Mô phỏng cải thiện điểm (`improve`)**:
  - Chọn các môn điểm thấp (D, C), nhập điểm mô phỏng mới.
  - Xem ngay GPA tích lũy tăng thêm bao nhiêu mà không ảnh hưởng bảng điểm gốc.

### 4. 📅 Thời khóa biểu chính thức (`/schedule` - `SchedulePage.jsx`)
- **Lưới thời khóa biểu theo tuần**: Thứ 2 đến Thứ 7, Tiết 1 đến Tiết 11.
- Hiển thị đầy đủ: Tên môn, Mã lớp, Phòng học, Tòa nhà, Cơ sở, Giảng viên giảng dạy.
- Bộ lọc ca học: Cả ngày (Tiết 1-11), Buổi sáng (Tiết 1-6), Buổi chiều (Tiết 7-11).
- Chuyển đổi giữa **Dạng lưới (Grid - Tuần)** và **Dạng danh sách (List view)**.
- **Xuất lịch iCalendar (`.ics`)**: Đồng bộ trực tiếp vào Google Calendar, Apple Calendar, Outlook.
- **Xuất ảnh TKB**: Hỗ trợ xuất ảnh thời khóa biểu định dạng 16:9 và 9:16 Story cho điện thoại.

### 5. ⏳ Lịch thi học kỳ (`/exam-schedule` - `ExamSchedulePage.jsx`)
- Danh sách môn thi cuối kỳ & giữa kỳ.
- Chi tiết: Môn thi, Ngày thi, Ca thi / Giờ thi, Phòng thi, Số báo danh (SBD), Hình thức thi (Tự luận / Trắc nghiệm / Vấn đáp / Đồ án).
- **Bộ đếm ngược (Countdown)**: Hiển thị số ngày còn lại đến từng môn thi (Còn X ngày / Hôm nay thi / Đã thi xong).
- Tìm kiếm nhanh theo mã môn hoặc phòng thi.

### 6. 💰 Tra cứu & Quản lý Học phí (`/tuition` - `TuitionPage.jsx`)
- Tình trạng đóng học phí học kỳ hiện tại của sinh viên: Số tiền, ngày nộp, số biên lai, hạn chót.
- **Công cụ tính nhanh & Tra cứu đơn giá tín chỉ**:
  - Lựa chọn Năm học (2026-2027 dự báo, 2025-2026, 2024-2025).
  - Lựa chọn Cơ sở: Cơ sở 1 - Chợ Quán (227 Nguyễn Văn Cừ) hoặc Cơ sở 2 - Đông Hòa (Linh Trung - Thủ Đức).
  - Lựa chọn Khóa sinh viên (K23 - K26) và Nhóm ngành.
  - Nhập số tín chỉ Lý thuyết và Thực hành -> Tự động tính tổng học phí học kỳ.

### 7. 🏫 Thông tin trường & Bản đồ (`/campus` - `CampusPage.jsx`)
- **Tab 1: Bản đồ khuôn viên & Phòng học (`map`)**:
  - Xem theo Cơ sở 1 (Nguyễn Văn Cừ) và Cơ sở 2 (Linh Trung Thủ Đức).
  - Danh mục các tòa nhà: Tòa A (Nhà Hiệu bộ, PĐT, CTSV), Tòa B, Tòa C (Khoa CNTT, ITEC, Lab máy tính), Tòa F, Tòa I (Thư viện trung tâm).
  - Sơ đồ chi tiết từng tầng: Tầng 1 đến Tầng 4/8 và danh sách các phòng học, phòng Lab tương ứng.
- **Tab 2: Kế hoạch năm học (`academic-calendar`)**:
  - Chi tiết lịch học, hạn đóng học phí, tuần thi giữa kỳ, đợt 1 & 2 ĐKHP, tuần thi cuối kỳ, lịch nghỉ Tết Nguyên Đán và lịch nghỉ hè.
- **Tab 3: Danh bạ đơn vị & Liên hệ (`directory`)**:
  - Phòng Đào tạo (PĐT), Phòng Kế hoạch - Tài chính (PKHTC), Phòng Công tác Sinh viên (CTSV), Văn phòng Khoa CNTT, Ký túc xá 135B Trần Hưng Đạo, Trung tâm Đào tạo Quốc tế (ITEC).
  - Địa chỉ phòng, số điện thoại hotline, email, giờ làm việc và thủ tục tiếp nhận sinh viên.

### 8. 📚 Tra cứu Kho Môn học & Tiên quyết (`/courses` & `/prerequisites`)
- Kho dữ liệu hơn 100 môn học HCMUS: Mã môn, tên tiếng Việt, số tín chỉ, phân bổ giờ LT/TH/BT, loại môn BB/TC.
- Sơ đồ điều kiện tiên quyết: Môn học trước (`PREVIOUS`), môn song hành (`PARALLEL`), môn khuyến nghị (`RECOMMENDED`).

### 9. ⚙️ Cài đặt & Quản lý Dữ liệu (`/settings` - `SettingsPage.jsx`)
- Tùy chỉnh thông tin hồ sơ sinh viên (Họ tên, MSSV, Khóa, Lớp, Ngành, Khoa).
- **Sao lưu dữ liệu (`.json`)**: Tải về toàn bộ cơ sở dữ liệu học tập cá nhân.
- **Khôi phục dữ liệu**: Chọn file JSON backup để nạp lại trạng thái.
- **Nạp dữ liệu mẫu HCMUS**: 1-click để nạp trọn bộ hồ sơ sinh viên mẫu CNTT K22 có sẵn bảng điểm 5 kỳ, TKB, lịch thi và học phí.
- Xóa trắng dữ liệu (Reset).

### 10. 🔒 Bảo mật & Quyền riêng tư (`/privacy` - `PrivacyPage.jsx`)
- Cam kết kiến trúc **Local-First**: Toàn bộ dữ liệu lưu trữ trên trình duyệt của sinh viên.
- Không thu thập mật khẩu Portal, không gửi dữ liệu cá nhân lên máy chủ trung gian.
- Hỗ trợ mã hóa PBKDF2 + AES-GCM bảo vệ dữ liệu.

### 11. 📖 Quy chế đào tạo & Cẩm nang (`/guide` - `GuidePage.jsx`)
- Hướng dẫn công thức tính GPA tích lũy và bảng quy đổi điểm chuẩn HCMUS.
- Danh mục các môn điều kiện ngoại lệ không tính GPA (GDTC, GDQP-AN, Ngoại ngữ, Tin học cơ sở).
- Quy tắc học lại, học cải thiện điểm và điều kiện xét học bổng.
- Hướng dẫn đọc chuỗi lịch học Portal (Thứ, Tiết, Tòa nhà, Phòng học).

---

## 🏗️ Cấu trúc Mã nguồn

```
SC/
├── package.json                 # Cấu hình dự án (React 19, React Router 7, Vite)
├── vite.config.js               # Thiết lập build và dev server
├── index.html                   # HTML gốc
├── dist/                        # Thành phẩm build Production (đã biên dịch hoàn chỉnh)
└── src/
    ├── main.jsx                 # Mount ứng dụng React
    ├── App.jsx                  # Định tuyến toàn bộ các Route & Layout
    ├── context/
    │   └── StudentContext.jsx   # Quản trị toàn bộ State học tập (Local-First + localStorage)
    ├── data/
    │   ├── defaultStudent.js    # Bộ dữ liệu mẫu sinh viên CNTT HCMUS đầy đủ
    │   ├── courses.js           # Danh mục hơn 100 môn học
    │   ├── prerequisites.js     # Danh sách môn tiên quyết / song hành
    │   ├── tuitionData.js       # Bảng đơn giá học phí theo Khóa & Cơ sở
    │   ├── campusData.js        # Bản đồ tòa nhà, kế hoạch năm học, danh bạ đơn vị
    │   ├── programs.js          # Danh sách các ngành đào tạo
    │   └── categories/          # Chi tiết chương trình đào tạo từng ngành
    ├── components/
    │   ├── Header.jsx           # Thanh điều hướng trên cùng kèm Profile & Nút đồng bộ
    │   ├── Sidebar.jsx          # Menu bên trái (Desktop) chuẩn dX
    │   ├── BottomNav.jsx        # Thanh điều hướng chân trang (Mobile) chuẩn SLe
    │   ├── PortalSyncModal.jsx  # Hộp thoại đồng bộ dữ liệu Portal HCMUS
    │   ├── LoadingSpinner.jsx   # Hiệu ứng tải trang
    │   └── Footer.jsx           # Chân trang bản quyền
    ├── pages/
    │   ├── DashboardPage.jsx    # Trang tổng quan KPI & biểu đồ
    │   ├── StudyRoadmapPage.jsx # Lộ trình học tập & Xếp lịch (4 subtabs)
    │   ├── GradesPage.jsx       # Bảng điểm & Kế hoạch GPA (3 subtabs)
    │   ├── SchedulePage.jsx     # Thời khóa biểu tuần & Lưới tiết học
    │   ├── ExamSchedulePage.jsx # Lịch thi học kỳ & Đếm ngược
    │   ├── TuitionPage.jsx      # Tra cứu học phí & Dự toán chi phí
    │   ├── CampusPage.jsx       # Bản đồ phòng học, kế hoạch năm, danh bạ
    │   ├── CoursesPage.jsx      # Tra cứu kho môn học
    │   ├── PrerequisitesPage.jsx# Sơ đồ điều kiện tiên quyết
    │   ├── GPACalculatorPage.jsx# Công cụ tính GPA tương tác
    │   ├── ProgramPage.jsx      # Xem chi tiết khung đào tạo theo ngành
    │   ├── SettingsPage.jsx     # Cài đặt cá nhân & Sao lưu / Khôi phục
    │   ├── PrivacyPage.jsx      # Cam kết bảo mật & Quyền riêng tư
    │   └── GuidePage.jsx        # Quy chế tín chỉ & Cẩm nang học tập
    ├── utils/
    │   ├── gpa.js               # Logic quy đổi điểm chữ, điểm hệ 4 & GPA
    │   └── courseHelpers.js     # Tiện ích tìm kiếm & tra cứu môn học
    └── styles/
        └── global.css           # Bảng màu HCMUS (#004A98, #F39C12) & CSS Utilities
```

---

## 🚀 Hướng dẫn Chạy Kiểm thử

```bash
# 1. Chạy môi trường phát triển (Hot reload):
npm run dev

# 2. Đóng gói bản Production:
npm run build

# 3. Xem trước bản Production:
npm run preview
```
