import React, { useState } from "react";
import { useStudent } from "../context/StudentContext";

function SettingsPage() {
  const { student, updateStudentInfo, loadSampleData, resetData, exportBackupJSON, importBackupJSON } = useStudent();
  const [formData, setFormData] = useState({
    name: student.name || "",
    studentId: student.studentId || "",
    classCode: student.classCode || "",
    cohort: student.cohort || "",
    major: student.major || "",
    faculty: student.faculty || "",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateStudentInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importBackupJSON(event.target.result);
      if (res.success) {
        setImportStatus("✅ Khôi phục dữ liệu thành công!");
        setFormData({
          name: student.name,
          studentId: student.studentId,
          classCode: student.classCode,
          cohort: student.cohort,
          major: student.major,
          faculty: student.faculty,
        });
      } else {
        setImportStatus(`❌ Lỗi: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <h1 className="section-title">⚙️ Cài đặt & Quản lý Dữ liệu</h1>
        <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
          Tùy chỉnh thông tin hồ sơ sinh viên, sao lưu dữ liệu cá nhân hoặc nạp dữ liệu mẫu thử nghiệm.
        </p>
      </div>

      {/* 1. Hồ sơ sinh viên */}
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "16px" }}>
          👤 Thông tin hồ sơ sinh viên
        </h2>

        <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="grid grid-2">
            <div>
              <label style={styles.label}>Họ và tên sinh viên:</label>
              <input
                type="text"
                className="input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={styles.label}>Mã số sinh viên (MSSV):</label>
              <input
                type="text"
                className="input"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={styles.label}>Lớp sinh hoạt:</label>
              <input
                type="text"
                className="input"
                value={formData.classCode}
                onChange={(e) => setFormData({ ...formData, classCode: e.target.value })}
              />
            </div>

            <div>
              <label style={styles.label}>Khóa tuyển sinh:</label>
              <input
                type="text"
                className="input"
                value={formData.cohort}
                onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
              />
            </div>

            <div>
              <label style={styles.label}>Ngành đào tạo:</label>
              <input
                type="text"
                className="input"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              />
            </div>

            <div>
              <label style={styles.label}>Khoa / Bộ môn:</label>
              <input
                type="text"
                className="input"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
            <button type="submit" className="btn btn-primary">
              💾 Lưu thông tin
            </button>
            {saveSuccess && (
              <span style={{ color: "#27ae60", fontSize: "13px", fontWeight: "600" }}>
                ✓ Đã cập nhật hồ sơ thành công!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 2. Sao lưu & Khôi phục dữ liệu */}
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "6px" }}>
          📦 Sao lưu & Khôi phục dữ liệu (Local-First)
        </h2>
        <p style={{ fontSize: "13px", color: "var(--text-light)", marginBottom: "16px" }}>
          Hệ thống không lưu dữ liệu trên bất kỳ máy chủ nào. Bạn hãy xuất file sao lưu định kỳ để tránh mất dữ liệu khi xóa cache trình duyệt.
        </p>

        <div className="grid grid-2">
          {/* Xuất file */}
          <div style={styles.actionBox}>
            <div style={{ fontSize: "28px" }}>📤</div>
            <div>
              <strong>Xuất file sao lưu (.JSON)</strong>
              <div style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}>
                Tải về toàn bộ bảng điểm, TKB, lịch thi và lộ trình học tập dạng file JSON.
              </div>
            </div>
            <button className="btn btn-outline" onClick={exportBackupJSON} style={{ marginLeft: "auto" }}>
              Tải file backup
            </button>
          </div>

          {/* Nhập file */}
          <div style={styles.actionBox}>
            <div style={{ fontSize: "28px" }}>📥</div>
            <div>
              <strong>Khôi phục từ file (.JSON)</strong>
              <div style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}>
                Chọn file sao lưu đã lưu trước đó để nạp lại vào máy.
              </div>
            </div>
            <label className="btn btn-outline" style={{ marginLeft: "auto", cursor: "pointer" }}>
              Chọn file
              <input type="file" accept=".json" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
          </div>
        </div>

        {importStatus && (
          <div style={{ marginTop: "12px", fontSize: "13px", fontWeight: "600" }}>
            {importStatus}
          </div>
        )}
      </div>

      {/* 3. Nạp dữ liệu mẫu hoặc Xóa trắng */}
      <div className="card" style={{ padding: "24px", borderColor: "#fed7d7" }}>
        <h2 style={{ fontSize: "18px", color: "#c53030", marginBottom: "6px" }}>
          ⚠️ Thao tác cơ sở dữ liệu
        </h2>
        <p style={{ fontSize: "13px", color: "var(--text-light)", marginBottom: "16px" }}>
          Dành cho việc kiểm thử tính năng hoặc đặt lại trạng thái ban đầu của ứng dụng.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            className="btn btn-accent"
            onClick={() => {
              if (window.confirm("Bạn có muốn nạp lại bộ dữ liệu sinh viên mẫu HCMUS (Nguyễn Văn An - K22 CNTT)?")) {
                loadSampleData();
                alert("Đã nạp lại dữ liệu mẫu thành công!");
              }
            }}
          >
            🔄 Nạp lại dữ liệu sinh viên mẫu
          </button>

          <button
            className="btn btn-outline"
            onClick={() => {
              if (window.confirm("CẢNH BÁO: Thao tác này sẽ xóa toàn bộ bảng điểm, TKB và lịch thi trong máy của bạn. Bạn có chắc chắn muốn xóa không?")) {
                resetData();
                alert("Đã xóa trắng dữ liệu!");
              }
            }}
            style={{ color: "#e53e3e", borderColor: "#e53e3e" }}
          >
            🗑️ Xóa trắng dữ liệu (Reset)
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "4px",
    display: "block",
  },
  actionBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
};

export default SettingsPage;
