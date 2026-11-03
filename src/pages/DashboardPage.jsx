import React from "react";
import { Link } from "react-router-dom";
import { useStudent } from "../context/StudentContext";

function DashboardPage() {
  const { student, stats, schedule, exams, tuition } = useStudent();

  // Môn học kỳ này
  const currentSemesterCourses = (student.grades || []).filter(
    (g) => g.status === "IN_PROGRESS"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Hero Welcome banner */}
      <div className="card" style={styles.heroCard}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span className="badge badge-warning">Khóa {student.cohort || "K2022"}</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>• {student.faculty}</span>
          </div>
          <h1 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "6px" }}>
            Xin chào, {student.name || "Sinh viên HCMUS"}! 👋
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "14px", lineHeight: "1.5" }}>
            MSSV: <strong>{student.studentId}</strong> | Lớp: <strong>{student.classCode || "22CTT1"}</strong> | Ngành: <strong>{student.major}</strong>
          </p>
        </div>
        <div style={styles.heroRight} className="hero-right-mobile">
          <div style={styles.syncStatusBadge}>
            <span style={{ color: "#2ecc71" }}>●</span> Đã đồng bộ Portal cục bộ
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
            Kỳ hiện tại: {student.currentSemesterName || "HK1 (2024 - 2025)"}
          </div>
        </div>
      </div>

      {/* 4 Chỉ số KPI chính */}
      <div className="grid grid-4">
        <div className="card" style={styles.kpiCard}>
          <div style={styles.kpiHeader}>
            <span style={styles.kpiIcon}>⭐</span>
            <span style={styles.kpiTitle}>GPA Hệ 10</span>
          </div>
          <div style={styles.kpiValue}>{stats.gpa10.toFixed(2)}</div>
          <div style={styles.kpiSub}>Thang điểm 10 chuẩn</div>
        </div>

        <div className="card" style={{ ...styles.kpiCard, borderTop: "4px solid #F39C12" }}>
          <div style={styles.kpiHeader}>
            <span style={styles.kpiIcon}>🎯</span>
            <span style={styles.kpiTitle}>GPA Hệ 4.0</span>
          </div>
          <div style={{ ...styles.kpiValue, color: "#F39C12" }}>{stats.gpa4.toFixed(2)}</div>
          <div style={styles.kpiSub}>
            Xếp loại: <strong style={{ color: "var(--primary)" }}>{stats.classification}</strong>
          </div>
        </div>

        <div className="card" style={{ ...styles.kpiCard, borderTop: "4px solid #27ae60" }}>
          <div style={styles.kpiHeader}>
            <span style={styles.kpiIcon}>📚</span>
            <span style={styles.kpiTitle}>Tín chỉ tích lũy</span>
          </div>
          <div style={{ ...styles.kpiValue, color: "#27ae60" }}>
            {stats.allPassedCredits} <span style={{ fontSize: "16px", color: "#7f8c8d" }}>/ {stats.totalRequiredCredits}</span>
          </div>
          <div style={styles.kpiSub}>Đạt {stats.progressPercent}% lộ trình toàn khóa</div>
        </div>

        <div className="card" style={{ ...styles.kpiCard, borderTop: "4px solid #3498db" }}>
          <div style={styles.kpiHeader}>
            <span style={styles.kpiIcon}>💳</span>
            <span style={styles.kpiTitle}>Học phí học kỳ</span>
          </div>
          <div style={{ ...styles.kpiValue, fontSize: "20px", color: "#2980b9" }}>
            {tuition?.status === "PAID" ? "Đã thanh toán" : "Cần đóng"}
          </div>
          <div style={styles.kpiSub}>
            {tuition?.totalPayable ? `${tuition.totalPayable.toLocaleString("vi-VN")} đ` : "14.040.000 đ"}
          </div>
        </div>
      </div>

      {/* Biểu đồ xu hướng GPA qua từng học kỳ */}
      <div className="card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <h2 style={{ fontSize: "18px", color: "var(--primary)" }}>📈 Tiến trình Điểm trung bình qua các Học kỳ</h2>
            <p style={{ fontSize: "13px", color: "var(--text-light)" }}>Theo dõi độ biến thiên học lực và số tín chỉ đạt được</p>
          </div>
          <Link to="/grades" className="btn btn-outline" style={{ fontSize: "13px", padding: "6px 14px" }}>
            Xem bảng điểm chi tiết →
          </Link>
        </div>

        {/* Biểu đồ trực quan SVG */}
        <div style={styles.chartContainer}>
          <div style={styles.chartGrid}>
            {stats.semesterList.map((sem, idx) => (
              <div key={idx} style={styles.chartCol}>
                <div style={styles.barWrapper}>
                  {/* Cột hệ 10 */}
                  <div
                    style={{
                      ...styles.bar10,
                      height: `${Math.min(100, (sem.gpa10 / 10) * 100)}%`,
                    }}
                    title={`Hệ 10: ${sem.gpa10.toFixed(2)}`}
                  >
                    <span style={styles.barText}>{sem.gpa10 > 0 ? sem.gpa10.toFixed(1) : ""}</span>
                  </div>
                </div>
                <div style={styles.colLabel}>{sem.name.replace("Năm ", "N").replace(" - HK", " K")}</div>
                <div style={{ fontSize: "11px", color: "#a4b0be" }}>{sem.totalCredits} TC</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2 Cột: Thời khóa biểu tuần này & Lịch thi sắp tới */}
      <div className="grid grid-2">
        {/* Lịch học học kỳ hiện tại */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📅</span> Thời khóa biểu học kỳ ({schedule.length} ca học)
            </h3>
            <Link to="/schedule" style={{ fontSize: "13px", color: "var(--primary)", fontWeight: "600" }}>
              Xem TKB đầy đủ →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {schedule.slice(0, 4).map((s) => (
              <div key={s.id} style={styles.scheduleItem}>
                <div style={{ ...styles.dayBadge, backgroundColor: s.color || "#0984e3" }}>
                  {s.dayLabel}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "#2d3436" }}>{s.courseName}</div>
                  <div style={{ fontSize: "12px", color: "#636e72", marginTop: "2px" }}>
                    🕒 {s.time} | 🏫 Phòng: <strong>{s.room}</strong> ({s.building})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lịch thi sắp tới */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⏳</span> Lịch thi học kỳ ({exams.length} môn thi)
            </h3>
            <Link to="/exam-schedule" style={{ fontSize: "13px", color: "var(--primary)", fontWeight: "600" }}>
              Xem lịch thi →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {exams.slice(0, 4).map((ex) => (
              <div key={ex.id} style={styles.examItem}>
                <div style={styles.examDateBox}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#747d8c" }}>Ngày thi</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--primary)" }}>{ex.dateLabel}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "#2d3436" }}>{ex.courseName}</div>
                  <div style={{ fontSize: "12px", color: "#636e72", marginTop: "2px" }}>
                    Ca: {ex.time} | Phòng: <strong>{ex.room}</strong> | SBD: <strong>{ex.seatNumber}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phím tắt công cụ sinh viên */}
      <div className="card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "16px", color: "var(--primary)", marginBottom: "14px" }}>
          ⚡ Lối tắt tiện ích cho sinh viên
        </h3>
        <div className="grid grid-4">
          <Link to="/study-roadmap" style={styles.quickAction}>
            <span style={{ fontSize: "28px" }}>🗺️</span>
            <strong>Lộ trình học tập</strong>
            <span>Chọn môn & Xếp lịch</span>
          </Link>
          <Link to="/grades" style={styles.quickAction}>
            <span style={{ fontSize: "28px" }}>🎯</span>
            <strong>Kế hoạch GPA</strong>
            <span>Mô phỏng cải thiện điểm</span>
          </Link>
          <Link to="/tuition" style={styles.quickAction}>
            <span style={{ fontSize: "28px" }}>💰</span>
            <strong>Tra cứu học phí</strong>
            <span>Đơn giá tín chỉ các khóa</span>
          </Link>
          <Link to="/campus" style={styles.quickAction}>
            <span style={{ fontSize: "28px" }}>🏫</span>
            <strong>Bản đồ & Danh bạ</strong>
            <span>Tìm phòng học, PĐT, CTSV</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  heroCard: {
    background: "linear-gradient(135deg, #004A98 0%, #1565c0 100%)",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    padding: "28px 24px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0, 74, 152, 0.2)",
  },
  heroRight: {
    textAlign: "right",
  },
  syncStatusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  kpiCard: {
    borderTop: "4px solid var(--primary)",
    padding: "20px 16px",
  },
  kpiHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  kpiIcon: {
    fontSize: "20px",
  },
  kpiTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#718096",
    textTransform: "uppercase",
  },
  kpiValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "var(--primary)",
    lineHeight: "1.2",
  },
  kpiSub: {
    fontSize: "12px",
    color: "#718096",
    marginTop: "6px",
  },
  chartContainer: {
    padding: "16px 0",
  },
  chartGrid: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "180px",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "8px",
  },
  chartCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    flex: 1,
    height: "100%",
  },
  barWrapper: {
    flex: 1,
    width: "36px",
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "#f1f2f6",
    borderRadius: "6px 6px 0 0",
    overflow: "hidden",
  },
  bar10: {
    width: "100%",
    backgroundColor: "var(--primary)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "4px",
    borderRadius: "6px 6px 0 0",
    transition: "height 0.4s ease",
  },
  barText: {
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: "bold",
  },
  colLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#2d3436",
  },
  scheduleItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #edf2f7",
  },
  dayBadge: {
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "1.1",
    flexShrink: 0,
  },
  examItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #edf2f7",
  },
  examDateBox: {
    backgroundColor: "#edf2f7",
    padding: "6px 10px",
    borderRadius: "6px",
    textAlign: "center",
    minWidth: "75px",
    flexShrink: 0,
  },
  quickAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "16px 12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    textDecoration: "none",
    gap: "6px",
    transition: "all 0.2s ease",
    color: "#2d3748",
  },
};

export default DashboardPage;
