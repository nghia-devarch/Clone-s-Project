import React from "react";

function PrivacyPage() {
  const securityPillars = [
    {
      icon: "🔒",
      title: "Mô hình Local-First (Dữ liệu trên máy bạn)",
      desc: "Toàn bộ bảng điểm, thời khóa biểu, lịch thi và thông tin cá nhân của bạn được lưu trữ hoàn toàn trên trình duyệt (Web Storage / localStorage) của thiết bị bạn đang dùng. Hệ thống không có máy chủ thu thập dữ liệu cá nhân.",
    },
    {
      icon: "🛡️",
      title: "Không lưu trữ mật khẩu Portal HCMUS",
      desc: "Khi bạn đồng bộ Portal, quá trình xác thực diễn ra trực tiếp giữa trình duyệt của bạn và máy chủ portal.hcmus.edu.vn. Mật khẩu tài khoản của bạn tuyệt đối không bao giờ được ghi lại hay gửi đi bất cứ đâu.",
    },
    {
      icon: "🔑",
      title: "Mã hóa bảo vệ dữ liệu (PBKDF2 + AES-GCM)",
      desc: "Ứng dụng hỗ trợ cơ chế mã hóa cục bộ chuẩn quân sự AES-GCM với khóa dẫn xuất PBKDF2 từ mật khẩu thiết bị, ngăn chặn việc đọc trộm dữ liệu khi dùng chung máy tính.",
    },
    {
      icon: "🚫",
      title: "Không theo dõi / Không Fingerprinting",
      desc: "HCMUS Portal không chèn mã theo dõi hành vi, không bán dữ liệu cho bên thứ ba, không thu thập dấu vân tay thiết bị (device fingerprinting).",
    },
  ];

  const userRights = [
    { title: "Quyền được biết", desc: "Bạn luôn nắm rõ dữ liệu nào đang được lưu trữ trong ứng dụng và mục đích sử dụng từng trường dữ liệu." },
    { title: "Quyền xuất dữ liệu", desc: "Bạn có thể tải về toàn bộ dữ liệu của mình dưới dạng file JSON bất cứ lúc nào qua tính năng Sao lưu." },
    { title: "Quyền xóa dữ liệu", desc: "Bạn có thể bấm nút Xóa trắng dữ liệu trong phần Cài đặt để xóa sạch mọi dấu vết dữ liệu trên thiết bị ngay lập tức." },
    { title: "Quyền đồng bộ lại", desc: "Bất kỳ lúc nào bạn có bảng điểm mới trên Portal, bạn đều có thể cập nhật đè lên để làm mới tiến trình học tập." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <h1 className="section-title">🔒 Bảo mật & Quyền Dữ liệu Cá nhân</h1>
        <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
          Cam kết bảo mật dữ liệu học tập và quyền riêng tư tối thượng cho sinh viên Trường Đại học Khoa học Tự nhiên TP.HCM.
        </p>
      </div>

      {/* 4 Trụ cột bảo mật */}
      <div className="grid grid-2">
        {securityPillars.map((p, idx) => (
          <div key={idx} className="card" style={{ padding: "22px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "32px", flexShrink: 0 }}>{p.icon}</div>
            <div>
              <h3 style={{ fontSize: "16px", color: "var(--primary)", marginBottom: "6px" }}>{p.title}</h3>
              <p style={{ fontSize: "13px", color: "#4a5568", lineHeight: "1.6" }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quyền dữ liệu của sinh viên */}
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "16px" }}>
          📋 4 Quyền hạn dữ liệu cá nhân của bạn trong HCMUS Portal
        </h2>
        <div className="grid grid-2">
          {userRights.map((r, idx) => (
            <div key={idx} style={styles.rightCard}>
              <strong style={{ color: "var(--primary)", fontSize: "14px" }}>✓ {r.title}</strong>
              <p style={{ fontSize: "13px", color: "#4a5568", marginTop: "4px" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Khuyến nghị bảo mật khi dùng máy công cộng */}
      <div className="card" style={{ padding: "20px", backgroundColor: "#fffaf0", borderLeft: "5px solid #dd6b20" }}>
        <h3 style={{ color: "#c05621", fontSize: "15px", marginBottom: "6px" }}>
          💡 Khuyến nghị khi sử dụng máy tính công cộng (Phòng máy, Quán net):
        </h3>
        <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "#744210", lineHeight: "1.6" }}>
          <li>Nên mở trình duyệt ở chế độ <strong>Ẩn danh (Incognito/Private)</strong> để trình duyệt tự xóa dữ liệu khi đóng tab.</li>
          <li>Nếu mở ở chế độ thường, trước khi rời khỏi máy hãy vào mục <strong>Cài đặt → Xóa trắng dữ liệu</strong>.</li>
          <li>Không bấm "Lưu mật khẩu" trên các trình duyệt ở quán internet hoặc thư viện trường.</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  rightCard: {
    padding: "14px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
};

export default PrivacyPage;
