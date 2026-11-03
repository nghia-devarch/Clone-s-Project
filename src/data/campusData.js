/**
 * Dữ liệu Bản đồ khuôn viên, Kế hoạch năm học và Danh bạ đơn vị HCMUS
 */

export const campusData = {
  campuses: [
    {
      id: "cs1",
      name: "Cơ sở 1 - Nguyễn Văn Cừ",
      address: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
      description: "Cơ sở đào tạo chính cho sinh viên năm 3, 4, cao học và văn phòng các Khoa/Phòng ban.",
      buildings: [
        {
          id: "A",
          name: "Tòa A - Nhà Hiệu Bộ",
          floors: [
            { floor: "Tầng 1", rooms: ["Phòng Đào tạo (Bàn 1-5)", "Phòng Công tác Sinh viên (CTSV)", "Văn phòng Một cửa", "Phòng Kế hoạch - Tài chính (A02)"] },
            { floor: "Tầng 2", rooms: ["Ban Giám hiệu", "Phòng Hành chính - Quản trị", "Phòng Quan hệ Đối ngoại"] },
            { floor: "Tầng 3", rooms: ["Phòng Sau đại học", "Phòng Khảo thí & ĐBCL", "Hội trường A"] },
          ],
        },
        {
          id: "B",
          name: "Tòa B - Khu Giảng đường Lý thuyết",
          floors: [
            { floor: "Tầng 1", rooms: ["Hội trường I (Sức chứa 400 chỗ)", "Phòng B11", "Phòng B12"] },
            { floor: "Tầng 2", rooms: ["Phòng B21", "Phòng B22", "Phòng B23", "Phòng B24"] },
            { floor: "Tầng 3", rooms: ["Phòng B31", "Phòng B32", "Phòng B33"] },
          ],
        },
        {
          id: "C",
          name: "Tòa C - Khoa Công nghệ Thông tin",
          floors: [
            { floor: "Tầng 1", rooms: ["Văn phòng Khoa CNTT", "Phòng Tiếp sinh viên", "Phòng Hội thảo C1"] },
            { floor: "Tầng 2", rooms: ["Phòng Lab Máy tính 1", "Phòng Lab Máy tính 2", "Lab Mạng máy tính"] },
            { floor: "Tầng 3", rooms: ["Trung tâm Đào tạo Quốc tế (ITEC)", "Phòng C31", "Phòng C32"] },
            { floor: "Tầng 4", rooms: ["Phòng Lab 4", "Phòng Lab 5 (Công nghệ phần mềm)", "Phòng Lab 6 (AI & Data)"] },
          ],
        },
        {
          id: "F",
          name: "Tòa F - Giảng đường Đa năng",
          floors: [
            { floor: "Tầng 1", rooms: ["Phòng F101", "Phòng F102", "Phòng F103", "Khu Tự học Sinh viên"] },
            { floor: "Tầng 2", rooms: ["Phòng F201", "Phòng F202", "Phòng F203", "Phòng F204"] },
            { floor: "Tầng 3", rooms: ["Phòng F301", "Phòng F302", "Phòng F303"] },
          ],
        },
        {
          id: "I",
          name: "Tòa I - Tòa nhà Trung tâm & Thư viện",
          floors: [
            { floor: "Tầng 1", rooms: ["Thư viện Trung tâm - Quầy mượn trả", "Phòng đọc Báo - Tạp chí", "Căn tin Tòa I"] },
            { floor: "Tầng 2", rooms: ["Thư viện - Phòng tự học máy lạnh", "Kho sách Khoa học Tự nhiên"] },
            { floor: "Tầng 3", rooms: ["Hội trường Trần Chí Đáo", "Phòng I31", "Phòng I32"] },
            { floor: "Tầng 4", rooms: ["Phòng I41 (Giảng đường bậc thang)", "Phòng I42"] },
          ],
        },
      ],
    },
    {
      id: "cs2",
      name: "Cơ sở 2 - Linh Trung (Đông Hòa)",
      address: "Khu phố 6, Phường Linh Trung, TP. Thủ Đức, TP.HCM (Khu Đô thị ĐHQG-HCM)",
      description: "Cơ sở đào tạo sinh viên năm 1, 2, khuôn viên rộng rãi, gần Ký túc xá ĐHQG-HCM.",
      buildings: [
        {
          id: "DH",
          name: "Nhà Điều Hành & Văn Phòng Khoa",
          floors: [
            { floor: "Tầng 1", rooms: ["Tổ Học vụ Cơ sở 2", "Tổ Kế toán - Thu học phí", "Phòng Y tế"] },
            { floor: "Tầng 2", rooms: ["Văn phòng đại diện các Khoa", "Phòng Họp điều hành"] },
          ],
        },
        {
          id: "GDA",
          name: "Giảng đường A",
          floors: [
            { floor: "Tầng 1", rooms: ["Phòng GDA1", "Phòng GDA2", "Phòng GDA3"] },
            { floor: "Tầng 2", rooms: ["Phòng GDA4", "Phòng GDA5", "Phòng GDA6"] },
          ],
        },
        {
          id: "GDB",
          name: "Giảng đường B & Khu Thí nghiệm",
          floors: [
            { floor: "Tầng 1", rooms: ["Phòng Lab Lý đại cương", "Phòng Lab Hóa đại cương", "Phòng GDB1"] },
            { floor: "Tầng 2", rooms: ["Phòng Thực hành Tin học 1-4", "Phòng GDB4"] },
          ],
        },
      ],
    },
  ],

  // Kế hoạch năm học 2024-2025
  academicCalendar: [
    {
      semester: "Học kỳ 1 (2024 - 2025)",
      period: "Tháng 09/2024 – Tháng 01/2025",
      events: [
        { date: "05/09/2024", title: "Bắt đầu học kỳ 1 chính thức", type: "START" },
        { date: "15/09 - 25/09/2024", title: "Hạn đóng học phí Học kỳ 1", type: "TUITION" },
        { date: "28/10 - 02/11/2024", title: "Tuần thi Giữa kỳ (Tuần 8)", type: "EXAM" },
        { date: "02/12 - 08/12/2024", title: "Đăng ký học phần Học kỳ 2 (Đợt 1)", type: "REGISTRATION" },
        { date: "16/12 - 28/12/2024", title: "Tuần thi Cuối kỳ Học kỳ 1", type: "EXAM" },
        { date: "30/12/2024 - 12/01/2025", title: "Nghỉ giữa kỳ & ĐKHP đợt 2", type: "BREAK" },
      ],
    },
    {
      semester: "Học kỳ 2 (2024 - 2025)",
      period: "Tháng 01/2025 – Tháng 06/2025",
      events: [
        { date: "13/01/2025", title: "Bắt đầu học kỳ 2 chính thức", type: "START" },
        { date: "25/01 - 09/02/2025", title: "Nghỉ Tết Nguyên Đán (2 tuần)", type: "BREAK" },
        { date: "15/02 - 28/02/2025", title: "Hạn đóng học phí Học kỳ 2", type: "TUITION" },
        { date: "24/03 - 29/03/2025", title: "Tuần thi Giữa kỳ Học kỳ 2", type: "EXAM" },
        { date: "05/05 - 11/05/2025", title: "Đăng ký học phần Học kỳ Hè", type: "REGISTRATION" },
        { date: "26/05 - 07/06/2025", title: "Tuần thi Cuối kỳ Học kỳ 2", type: "EXAM" },
        { date: "09/06 - 31/08/2025", title: "Nghỉ hè & Học kỳ hè dự thính", type: "BREAK" },
      ],
    },
  ],

  // Danh bạ các phòng ban, khoa và dịch vụ sinh viên
  directory: [
    {
      id: "pdt",
      name: "Phòng Đào Tạo (PĐT)",
      shortName: "PĐT",
      location: "Bàn 1-5, Tầng 1 Tòa A, Cơ sở 1",
      phone: "(028) 3835 4394 / (028) 3835 4395",
      email: "daotao@hcmus.edu.vn",
      website: "https://pdt.hcmus.edu.vn",
      workHours: "Thứ 2 - Thứ 6: 07h30 - 11h30 & 13h30 - 16h30",
      duties: [
        "Quản lý kết quả học tập, điểm thi, chứng nhận kết quả học tập",
        "Tổ chức đăng ký môn học và xếp thời khóa biểu toàn trường",
        "Xét tốt nghiệp, cấp phát bằng tốt nghiệp và bảng điểm chính thức",
        "Xử lý các đơn từ: nghỉ học tạm thời, rút môn, bảo lưu kết quả",
      ],
    },
    {
      id: "pkhtc",
      name: "Phòng Kế hoạch – Tài chính (Tài vụ)",
      shortName: "PKHTC",
      location: "Phòng A02, Tòa A, Cơ sở 1",
      phone: "(028) 3835 4396",
      email: "khtc@hcmus.edu.vn",
      website: "https://khtc.hcmus.edu.vn",
      workHours: "Thứ 2 - Thứ 6: 08h00 - 11h00 & 13h30 - 16h00",
      duties: [
        "Thu học phí, gia hạn học phí và cấp biên lai thu tiền",
        "Cấp phát học bổng khuyến khích học tập và trợ cấp xã hội",
        "Thanh toán thù lao nghiên cứu khoa học sinh viên",
      ],
    },
    {
      id: "pctsv",
      name: "Phòng Công tác Sinh viên (CTSV)",
      shortName: "CTSV",
      location: "Phòng A03, Tòa A, Cơ sở 1",
      phone: "(028) 3835 4397",
      email: "congtacsinhvien@hcmus.edu.vn",
      website: "https://ctsv.hcmus.edu.vn",
      workHours: "Thứ 2 - Thứ 6: 07h30 - 11h30 & 13h30 - 16h30",
      duties: [
        "Đánh giá điểm rèn luyện và xét cấp học bổng doanh nghiệp",
        "Cấp thẻ sinh viên, giấy xác nhận sinh viên vay vốn / tạm hoãn nghĩa vụ quân sự",
        "Quản lý Bảo hiểm Y tế (BHYT) và Bảo hiểm Tai nạn (BHTN)",
        "Tiếp nhận hồ sơ đăng ký Ký túc xá 135B và KTX ĐHQG",
      ],
    },
    {
      id: "fit",
      name: "Khoa Công nghệ Thông tin",
      shortName: "Khoa CNTT",
      location: "Tầng 1 Tòa C, Cơ sở 1",
      phone: "(028) 3835 1056",
      email: "info@fit.hcmus.edu.vn",
      website: "https://www.fit.hcmus.edu.vn",
      workHours: "Thứ 2 - Thứ 6: 08h00 - 11h30 & 13h30 - 17h00",
      duties: [
        "Tư vấn lộ trình học tập, chuyên ngành (CNTT, KHMT, KTPM, HTTT, MMT, TGMT)",
        "Đăng ký đồ án môn học, thực tập tốt nghiệp và khóa luận tốt nghiệp",
        "Giải quyết khiếu nại điểm các môn do Khoa CNTT giảng dạy",
      ],
    },
    {
      id: "ktx135b",
      name: "Ký túc xá 135B Trần Hưng Đạo",
      shortName: "KTX 135B",
      location: "135B Trần Hưng Đạo, P. Cầu Ông Lãnh, Quận 1, TP.HCM",
      phone: "(028) 3836 7183",
      email: "ktx135b@hcmus.edu.vn",
      website: "https://ctsv.hcmus.edu.vn",
      workHours: "24/7 (Phòng quản lý: Giờ hành chính)",
      duties: [
        "Ký túc xá nội trú trung tâm thành phố dành cho sinh viên HCMUS",
        "Gần cơ sở 1 (cách khoảng 1.5km), thuận tiện đi lại",
        "Tiếp nhận sinh viên ưu tiên theo thông báo từng học kỳ",
      ],
    },
    {
      id: "itec",
      name: "Trung tâm Đào tạo Quốc tế (ITEC)",
      shortName: "ITEC",
      location: "Tầng 3 Tòa C, Cơ sở 1",
      phone: "(028) 3830 3625",
      email: "itec@hcmus.edu.vn",
      website: "https://www.itec.hcmus.edu.vn",
      workHours: "Thứ 2 - Thứ 6: 08h00 - 17h00",
      duties: [
        "Đào tạo chương trình cử nhân liên kết Đại học Keuka (Hoa Kỳ), ĐH AUT (New Zealand)",
        "Hỗ trợ thủ tục chuyển tiếp du học và học bổng quốc tế",
      ],
    },
  ],
};
