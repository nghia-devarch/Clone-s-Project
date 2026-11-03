import React, { useState, useMemo } from "react";
import { useStudent } from "../context/StudentContext";
import { tuitionData } from "../data/tuitionData";

function TuitionPage() {
  const { student, tuition } = useStudent();
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [selectedCampus, setSelectedCampus] = useState("cs1");
  const [selectedCohort, setSelectedCohort] = useState("k22");
  const [selectedMajor, setSelectedMajor] = useState("cntt");

  // Dành cho công cụ tính nhanh
  const [calcTheory, setCalcTheory] = useState(14);
  const [calcPractice, setCalcPractice] = useState(4);

  // Tính học phí ước tính
  const estimate = useMemo(() => {
    return tuitionData.calculateTuitionEstimate(selectedYear, selectedMajor, calcTheory, calcPractice);
  }, [selectedYear, selectedMajor, calcTheory, calcPractice]);

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 className="section-title">💰 Tra cứu & Quản lý Học phí HCMUS</h1>
          <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
            Biểu phí chính thức và dự báo theo năm học, khóa đào tạo và số tín chỉ đăng ký thực tế.
          </p>
        </div>
      </div>

      {/* Tình trạng đóng học phí học kỳ hiện tại */}
      <div className="card" style={styles.tuitionStatusCard}>
        <div>
          <span className="badge badge-warning" style={{ marginBottom: "6px" }}>
            {tuition?.academicYear || "2024-2025"} — {tuition?.semester || "Học kỳ 1"}
          </span>
          <h2 style={{ fontSize: "22px", color: "#ffffff", marginTop: "4px" }}>
            Học phí sinh viên: {student.name} ({student.studentId})
          </h2>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", marginTop: "4px" }}>
            Số tín chỉ đăng ký: <strong>{tuition?.totalCredits || 18} TC</strong> | Biên lai: <strong>{tuition?.receiptNumber || "HCMUS-2024-89312"}</strong>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>Tổng số tiền học phí</div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#F39C12" }}>
            {(tuition?.totalPayable || 14040000).toLocaleString("vi-VN")} đ
          </div>
          <div style={{ marginTop: "6px" }}>
            {tuition?.status === "PAID" ? (
              <span className="badge badge-success" style={{ padding: "6px 12px", fontSize: "12px" }}>
                ✓ Đã thanh toán ({tuition?.paidDate || "10/09/2024"})
              </span>
            ) : (
              <span className="badge badge-danger" style={{ padding: "6px 12px", fontSize: "12px" }}>
                Chưa thanh toán (Hạn: {tuition?.deadline || "25/09/2024"})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bảng chi tiết môn học kỳ này */}
      {tuition?.items && tuition.items.length > 0 && (
        <div className="card" style={{ padding: "20px", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--primary)", marginBottom: "12px" }}>
            Chi tiết học phí theo học phần ({tuition.items.length} môn):
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Mã môn</th>
                  <th>Tên môn học</th>
                  <th style={{ textAlign: "center" }}>Số TC</th>
                  <th style={{ textAlign: "right" }}>Học phí</th>
                </tr>
              </thead>
              <tbody>
                {tuition.items.map((item) => (
                  <tr key={item.id}>
                    <td><code>{item.courseId}</code></td>
                    <td><strong>{item.courseName}</strong></td>
                    <td style={{ textAlign: "center" }}>{item.credits} TC</td>
                    <td style={{ textAlign: "right", fontWeight: "600", color: "var(--primary)" }}>
                      {item.fee.toLocaleString("vi-VN")} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CÔNG CỤ DỰ TOÁN HỌC PHÍ THEO KHÓA & TÍN CHỈ */}
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "6px" }}>
          🧮 Công cụ tính nhanh & Tra cứu đơn giá tín chỉ
        </h2>
        <p style={{ fontSize: "13px", color: "var(--text-light)", marginBottom: "20px" }}>
          Lựa chọn năm học, cơ sở, khóa và ngành để xem đơn giá và ước tính học phí học kỳ mới.
        </p>

        {/* Bộ lọc tùy chọn */}
        <div className="grid grid-4" style={{ marginBottom: "20px" }}>
          <div>
            <label style={styles.inputLabel}>Năm học:</label>
            <select
              className="input"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {tuitionData.academicYears.map((y) => (
                <option key={y.id} value={y.id}>{y.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.inputLabel}>Cơ sở đào tạo:</label>
            <select
              className="input"
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
            >
              {tuitionData.campuses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.inputLabel}>Khóa tuyển sinh:</label>
            <select
              className="input"
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
            >
              {tuitionData.cohorts.map((ch) => (
                <option key={ch.id} value={ch.id}>{ch.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.inputLabel}>Nhóm ngành:</label>
            <select
              className="input"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
              <option value="cntt">Công nghệ thông tin / KHMT / KTPM</option>
              <option value="hoa">Hóa học</option>
              <option value="vatly">Vật lý học / Kỹ thuật hạt nhân</option>
              <option value="toan">Toán học / Toán tin</option>
            </select>
          </div>
        </div>

        {/* Nhập số tín chỉ tính toán */}
        <div className="grid grid-2" style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "10px", marginBottom: "20px" }}>
          <div>
            <label style={styles.inputLabel}>Số tín chỉ Lý thuyết dự kiến:</label>
            <input
              type="number"
              min="0"
              max="30"
              className="input"
              value={calcTheory}
              onChange={(e) => setCalcTheory(parseInt(e.target.value) || 0)}
            />
            <div style={{ fontSize: "12px", color: "#718096", marginTop: "4px" }}>
              Đơn giá: {estimate.unitTheory.toLocaleString("vi-VN")} đ / TC
            </div>
          </div>

          <div>
            <label style={styles.inputLabel}>Số tín chỉ Thực hành / Lab dự kiến:</label>
            <input
              type="number"
              min="0"
              max="20"
              className="input"
              value={calcPractice}
              onChange={(e) => setCalcPractice(parseInt(e.target.value) || 0)}
            />
            <div style={{ fontSize: "12px", color: "#718096", marginTop: "4px" }}>
              Đơn giá: {estimate.unitPractice.toLocaleString("vi-VN")} đ / TC
            </div>
          </div>
        </div>

        {/* Kết quả tính toán */}
        <div style={styles.resultBox}>
          <div>
            <div style={{ fontSize: "13px", color: "#4a5568" }}>
              Tổng số tín chỉ: <strong>{estimate.totalCredits} TC</strong> ({estimate.theoryCredits} LT + {estimate.practiceCredits} TH)
            </div>
            <div style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}>
              LT: {estimate.theoryCost.toLocaleString("vi-VN")} đ | TH: {estimate.practiceCost.toLocaleString("vi-VN")} đ
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: "#718096" }}>Tổng học phí ước tính:</div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--primary)" }}>
              {estimate.total.toLocaleString("vi-VN")} đ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: "16px",
  },
  tuitionStatusCard: {
    background: "linear-gradient(135deg, #004A98 0%, #00284d 100%)",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "20px",
  },
  inputLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "4px",
    display: "block",
  },
  resultBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "#eef5fc",
    borderRadius: "10px",
    border: "2px solid var(--primary)",
  },
};

export default TuitionPage;
