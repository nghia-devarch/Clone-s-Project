import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../context/StudentContext";

function PortalSyncModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { student, loadSampleData, importBackupJSON } = useStudent();
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSimulateDemo = () => {
    setSyncing(true);
    setErrorMsg("");
    setTimeout(() => {
      loadSampleData();
      setSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => {
        setSyncSuccess(false);
        onClose();
      }, 1400);
    }, 800);
  };

  const handleImportJSON = () => {
    if (!jsonInput.trim()) {
      setErrorMsg("Vui lòng dán chuỗi JSON hợp lệ.");
      return;
    }
    const res = importBackupJSON(jsonInput);
    if (res.success) {
      setSyncSuccess(true);
      setTimeout(() => {
        setSyncSuccess(false);
        onClose();
      }, 1200);
    } else {
      setErrorMsg(res.error || "Lỗi định dạng JSON.");
    }
  };

  const handleGoToManualSchedule = () => {
    onClose();
    navigate("/schedule?action=add");
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>🔄</span>
            <div>
              <h2 style={{ fontSize: "17px", color: "var(--primary)" }}>Đồng bộ Dữ liệu HCMUS Portal</h2>
              <p style={{ fontSize: "12px", color: "var(--text-light)" }}>Cổng đào tạo portal.hcmus.edu.vn</p>
            </div>
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {syncSuccess ? (
            <div style={styles.successBox}>
              <span style={{ fontSize: "38px" }}>✅</span>
              <h3 style={{ color: "#27ae60", marginTop: "8px" }}>Cập nhật dữ liệu thành công!</h3>
              <p style={{ fontSize: "13px", color: "#57606f", marginTop: "4px" }}>
                Hồ sơ sinh viên <strong>{student.name}</strong> ({student.studentId}) đã được làm mới.
              </p>
            </div>
          ) : (
            <>
              {/* THÔNG BÁO BẢO TRÌ NÚT NHẬP PORTAL */}
              <div style={styles.maintenanceAlert}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "22px", flexShrink: 0 }}>🛠️</span>
                  <div>
                    <strong style={{ color: "#b7791f", fontSize: "14px" }}>
                      Tính năng Đồng bộ Portal tự động đang bảo trì & nâng cấp
                    </strong>
                    <p style={{ fontSize: "12.5px", color: "#744210", marginTop: "4px", lineHeight: "1.5" }}>
                      Do cổng đào tạo HCMUS Portal đang thay đổi giao thức xác thực CAS / 2FA, tính năng kết nối trực tiếp đang được cập nhật. Bạn vui lòng sử dụng <strong>Nhập môn học thủ công vào TKB</strong> hoặc nạp dữ liệu bằng file sao lưu.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lựa chọn 1: Nút kết nối trực tiếp Portal (Đang bảo trì) */}
              <div style={styles.disabledCard}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: "700", color: "#718096", fontSize: "14px" }}>
                      🌐 Đồng bộ trực tiếp từ Portal HCMUS
                    </span>
                    <span className="badge badge-warning" style={{ fontSize: "10px", padding: "2px 6px" }}>
                      Đang bảo trì
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#a0aec0", marginTop: "3px" }}>
                    Tự động kéo điểm, TKB, lịch thi từ tài khoản sinh viên.
                  </div>
                </div>
                <button
                  className="btn"
                  disabled
                  style={styles.disabledBtn}
                  title="Tính năng đang được nâng cấp bảo trì"
                >
                  ⚙️ Đang bảo trì
                </button>
              </div>

              {/* Lựa chọn 2 (Khuyên dùng): Nhập môn học thủ công vào TKB */}
              <div style={styles.recommendCard}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: "700", color: "var(--primary)", fontSize: "14px" }}>
                      ✨ Nhập môn học thủ công vào TKB
                    </span>
                    <span className="badge badge-success" style={{ fontSize: "10px", padding: "2px 6px" }}>
                      Khuyên dùng
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "3px" }}>
                    Tự do thêm học phần, phòng học, tiết học và thứ trong tuần vào thời khóa biểu.
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleGoToManualSchedule}
                  style={{ minWidth: "125px", fontSize: "12.5px" }}
                >
                  📅 Nhập TKB ngay
                </button>
              </div>

              {/* Lựa chọn 3: Nạp dữ liệu mẫu Demo */}
              <div style={styles.actionCard}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", color: "#2d3748", fontSize: "13.5px" }}>
                    🎲 Nạp dữ liệu mẫu sinh viên K22 (Demo)
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "2px" }}>
                    Trải nghiệm đầy đủ bảng điểm 5 kỳ, TKB tuần, lịch thi và học phí mẫu.
                  </div>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={handleSimulateDemo}
                  disabled={syncing}
                  style={{ minWidth: "125px", fontSize: "12.5px" }}
                >
                  {syncing ? "Đang nạp..." : "Nạp Demo"}
                </button>
              </div>

              {/* Lựa chọn 4: Nhập từ file JSON sao lưu */}
              <div style={{ marginTop: "14px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#2c3e50", marginBottom: "6px" }}>
                  📁 Hoặc dán mã JSON sao lưu dữ liệu cá nhân:
                </div>
                <textarea
                  className="input"
                  rows={3}
                  placeholder='Dán chuỗi JSON đã xuất trước đó vào đây... {"studentId": "...", "grades": [...]}'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  style={{ fontFamily: "monospace", fontSize: "12px" }}
                />
                {errorMsg && (
                  <div style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>
                    ⚠️ {errorMsg}
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                  <button className="btn btn-outline" onClick={handleImportJSON} style={{ fontSize: "12.5px", padding: "6px 14px" }}>
                    📥 Nhập từ JSON
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            🔒 100% Local-First • Không gửi dữ liệu ra bên ngoài
          </span>
          <button className="btn btn-outline" onClick={onClose} style={{ padding: "6px 14px", fontSize: "13px" }}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "16px",
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "580px",
    maxHeight: "90vh",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #f1f2f6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#a4b0be",
    cursor: "pointer",
    padding: "4px 8px",
  },
  body: {
    padding: "18px 20px",
    overflowY: "auto",
  },
  maintenanceAlert: {
    backgroundColor: "#fffaf0",
    border: "1.5px solid #fbd38d",
    borderLeft: "5px solid #dd6b20",
    padding: "12px 14px",
    borderRadius: "8px",
    marginBottom: "14px",
  },
  disabledCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#f7fafc",
    marginBottom: "10px",
    opacity: 0.85,
  },
  disabledBtn: {
    backgroundColor: "#e2e8f0",
    color: "#a0aec0",
    cursor: "not-allowed",
    border: "1px solid #cbd5e0",
    padding: "6px 12px",
    fontSize: "12px",
    minWidth: "125px",
  },
  recommendCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1.5px solid #bee3f8",
    backgroundColor: "#ebf8ff",
    marginBottom: "10px",
  },
  actionCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    marginBottom: "10px",
  },
  successBox: {
    textAlign: "center",
    padding: "24px 10px",
  },
  footer: {
    padding: "12px 20px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #f1f2f6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
};

export default PortalSyncModal;
