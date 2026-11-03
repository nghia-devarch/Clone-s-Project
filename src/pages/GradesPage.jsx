import React, { useState, useMemo } from "react";
import { useStudent } from "../context/StudentContext";
import { scoreToGrade, scoreTo4Scale, classifyGPA } from "../utils/gpa";

function GradesPage() {
  const { student, grades, stats, updateGrade } = useStudent();
  const [activeSubTab, setActiveSubTab] = useState("overview"); // overview | target | improve
  const [filterSemester, setFilterSemester] = useState("ALL");
  const [targetGPA4, setTargetGPA4] = useState(3.2); // Mục tiêu GPA Giỏi

  // Mô phỏng cải thiện điểm
  const [simulatedGrades, setSimulatedGrades] = useState({});

  // Lọc các môn hiển thị
  const filteredGrades = useMemo(() => {
    return grades.filter((g) => {
      if (filterSemester === "ALL") return true;
      return g.semester === filterSemester || g.semesterName === filterSemester;
    });
  }, [grades, filterSemester]);

  // Danh sách các học kỳ duy nhất
  const uniqueSemesters = useMemo(() => {
    const set = new Set();
    grades.forEach((g) => {
      if (g.semesterName) set.add(g.semesterName);
    });
    return Array.from(set);
  }, [grades]);

  // Tính toán Kế hoạch GPA mục tiêu
  // Điểm cần đạt = (Target_GPA * Tổng_Tín_Chỉ_Toàn_Khóa - Điểm_Hiện_Tại * Tín_Chỉ_Đã_Tích_Lũy) / Tín_Chỉ_Còn_Lại
  const targetCalculation = useMemo(() => {
    const totalRequired = 138;
    const earned = stats.totalCredits;
    const remainingCredits = Math.max(0, totalRequired - earned);
    const currentPoints = stats.gpa4 * earned;
    const targetPoints = targetGPA4 * totalRequired;
    const pointsNeeded = targetPoints - currentPoints;
    const requiredAverageGPA4 = remainingCredits > 0 ? pointsNeeded / remainingCredits : 0;

    let feasibility = "Khả thi";
    let color = "#27ae60";
    if (requiredAverageGPA4 > 4.0) {
      feasibility = "Không khả thi (Vượt quá 4.0)";
      color = "#e74c3c";
    } else if (requiredAverageGPA4 > 3.6) {
      feasibility = "Rất thách thức (Yêu cầu toàn bộ môn còn lại điểm A/A+)";
      color = "#e67e22";
    } else if (requiredAverageGPA4 < 2.0) {
      feasibility = "Dễ dàng đạt được";
      color = "#2980b9";
    }

    return {
      remainingCredits,
      pointsNeeded: Math.max(0, pointsNeeded),
      requiredAverageGPA4: Math.max(0, Math.min(4.0, requiredAverageGPA4)),
      rawRequired: requiredAverageGPA4,
      feasibility,
      color,
    };
  }, [stats, targetGPA4]);

  // Tính GPA sau khi mô phỏng cải thiện điểm
  const simulatedStats = useMemo(() => {
    let sum10 = 0;
    let sum4 = 0;
    let count = 0;

    const merged = grades.map((g) => {
      const code = g.id || g.code;
      if (simulatedGrades[code] !== undefined) {
        const sim10 = parseFloat(simulatedGrades[code]);
        return {
          ...g,
          score10: isNaN(sim10) ? g.score10 : sim10,
          score4: isNaN(sim10) ? g.score4 : scoreTo4Scale(sim10),
        };
      }
      return g;
    });

    merged.forEach((g) => {
      if (g.score10 !== null && g.score10 !== undefined && g.status !== "EXEMPT_GPA") {
        const tc = Number(g.credits) || 0;
        count += tc;
        sum10 += tc * Number(g.score10);
        sum4 += tc * (g.score4 ?? scoreTo4Scale(g.score10));
      }
    });

    const gpa10 = count > 0 ? Math.round((sum10 / count) * 100) / 100 : 0;
    const gpa4 = count > 0 ? Math.round((sum4 / count) * 100) / 100 : 0;

    return { gpa10, gpa4, count };
  }, [grades, simulatedGrades]);

  // Xuất file bảng điểm
  const handleExportDocx = () => {
    alert("Đang chuẩn bị xuất file bảng điểm Word (.docx) mẫu HCMUS cho sinh viên " + student.name);
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 className="section-title">📝 Quản lý Bảng điểm & Kế hoạch GPA</h1>
          <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
            Theo dõi chi tiết kết quả học tập qua từng học kỳ, lập kế hoạch điểm số mục tiêu và mô phỏng cải thiện học lực.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn btn-outline" onClick={handleExportDocx}>
            📄 Xuất Word (.docx)
          </button>
        </div>
      </div>

      {/* 3 Sub-tabs */}
      <div style={styles.subTabBar}>
        {[
          { id: "overview", label: "Bảng điểm chi tiết", icon: "📑" },
          { id: "target", label: "Kế hoạch GPA Mục tiêu", icon: "🎯" },
          { id: "improve", label: "Mô phỏng cải thiện điểm", icon: "🚀" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              ...styles.tabBtn,
              ...(activeSubTab === tab.id ? styles.tabBtnActive : {}),
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: BẢNG ĐIỂM CHI TIẾT */}
      {activeSubTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Bộ lọc học kỳ */}
          <div className="card" style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Lọc theo học kỳ:</span>
              <select
                className="input"
                style={{ width: "auto", padding: "6px 12px", fontSize: "13px" }}
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
              >
                <option value="ALL">Tất cả các học kỳ</option>
                {uniqueSemesters.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "12px", fontSize: "13px" }}>
              <span>GPA tích lũy: <strong style={{ color: "var(--primary)", fontSize: "16px" }}>{stats.gpa4.toFixed(2)}</strong> (Hệ 4)</span>
              <span>•</span>
              <span><strong style={{ color: "var(--primary)", fontSize: "16px" }}>{stats.gpa10.toFixed(2)}</strong> (Hệ 10)</span>
              <span>•</span>
              <span>Tích lũy: <strong style={{ color: "#27ae60" }}>{stats.allPassedCredits} TC</strong></span>
            </div>
          </div>

          {/* Bảng danh sách môn học */}
          <div className="card" style={{ padding: 0 }}>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "60px", textAlign: "center" }}>STT</th>
                    <th style={{ width: "120px" }}>Mã môn</th>
                    <th>Tên môn học</th>
                    <th style={{ width: "80px", textAlign: "center" }}>Số TC</th>
                    <th style={{ width: "100px", textAlign: "center" }}>Hệ 10</th>
                    <th style={{ width: "90px", textAlign: "center" }}>Điểm chữ</th>
                    <th style={{ width: "90px", textAlign: "center" }}>Hệ 4</th>
                    <th style={{ width: "140px" }}>Học kỳ</th>
                    <th style={{ width: "120px", textAlign: "center" }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.map((g, idx) => {
                    const hasScore = g.score10 !== null && g.score10 !== undefined;
                    return (
                      <tr key={g.id || idx}>
                        <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "12px" }}>
                          {idx + 1}
                        </td>
                        <td>
                          <code style={styles.code}>{g.id || g.code}</code>
                        </td>
                        <td>
                          <strong>{g.name}</strong>
                        </td>
                        <td style={{ textAlign: "center", fontWeight: "600" }}>{g.credits}</td>
                        <td style={{ textAlign: "center", fontWeight: "700" }}>
                          {hasScore ? g.score10.toFixed(1) : "—"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {g.grade ? (
                            <span className={`badge ${g.grade.startsWith("A") ? "badge-success" : g.grade === "F" ? "badge-danger" : "badge-info"}`}>
                              {g.grade}
                            </span>
                          ) : "—"}
                        </td>
                        <td style={{ textAlign: "center", fontWeight: "600", color: "var(--primary)" }}>
                          {hasScore && g.score4 !== null ? g.score4.toFixed(1) : "—"}
                        </td>
                        <td style={{ fontSize: "13px", color: "#4a5568" }}>{g.semesterName || g.semester}</td>
                        <td style={{ textAlign: "center" }}>
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                g.status === "PASSED" ? "#27ae60" : g.status === "IN_PROGRESS" ? "#2980b9" : "#e74c3c",
                              color: "#fff",
                              fontSize: "11px",
                            }}
                          >
                            {g.status === "PASSED" ? "Đạt" : g.status === "IN_PROGRESS" ? "Đang học" : "Cần học lại"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: KẾ HOẠCH GPA MỤC TIÊU */}
      {activeSubTab === "target" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "8px" }}>
              🎯 Thiết lập mục tiêu học lực tốt nghiệp
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-light)", marginBottom: "20px" }}>
              Hệ thống sẽ dựa trên số tín chỉ bạn đã tích lũy và số tín chỉ còn lại toàn khóa để tính toán mức điểm trung bình bạn cần duy trì.
            </p>

            {/* Chọn mục tiêu */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
              {[
                { gpa: 3.6, label: "Tốt nghiệp Xuất sắc (GPA ≥ 3.6)" },
                { gpa: 3.2, label: "Tốt nghiệp Giỏi (GPA ≥ 3.2)" },
                { gpa: 2.8, label: "Tốt nghiệp Khá giỏi (GPA ≥ 2.8)" },
                { gpa: 2.5, label: "Tốt nghiệp Khá (GPA ≥ 2.5)" },
              ].map((t) => (
                <button
                  key={t.gpa}
                  className={`btn ${targetGPA4 === t.gpa ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setTargetGPA4(t.gpa)}
                  style={{ padding: "10px 18px" }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Bảng kết quả phân tích mục tiêu */}
            <div className="grid grid-3">
              <div className="card" style={{ backgroundColor: "#f8fafc", padding: "18px", borderLeft: "4px solid var(--primary)" }}>
                <div style={{ fontSize: "12px", color: "#718096" }}>Tín chỉ còn lại cần học</div>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--primary)", marginTop: "4px" }}>
                  {targetCalculation.remainingCredits} TC
                </div>
                <div style={{ fontSize: "12px", color: "#a0aec0", marginTop: "4px" }}>
                  Đã tích lũy: {stats.totalCredits} / 138 TC
                </div>
              </div>

              <div className="card" style={{ backgroundColor: "#f8fafc", padding: "18px", borderLeft: `4px solid ${targetCalculation.color}` }}>
                <div style={{ fontSize: "12px", color: "#718096" }}>Điểm trung bình (hệ 4) cần đạt mỗi kỳ tới</div>
                <div style={{ fontSize: "28px", fontWeight: "800", color: targetCalculation.color, marginTop: "4px" }}>
                  {targetCalculation.requiredAverageGPA4.toFixed(2)}
                </div>
                <div style={{ fontSize: "12px", color: "#a0aec0", marginTop: "4px" }}>
                  Tương đương hệ 10: ~{(targetCalculation.requiredAverageGPA4 * 2.5).toFixed(1)} / 10
                </div>
              </div>

              <div className="card" style={{ backgroundColor: "#f8fafc", padding: "18px", borderLeft: `4px solid ${targetCalculation.color}` }}>
                <div style={{ fontSize: "12px", color: "#718096" }}>Đánh giá tính khả thi</div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: targetCalculation.color, marginTop: "8px" }}>
                  {targetCalculation.feasibility}
                </div>
                <div style={{ fontSize: "12px", color: "#718096", marginTop: "4px" }}>
                  Mục tiêu hiện tại: GPA {targetGPA4.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MÔ PHỎNG CẢI THIỆN ĐIỂM */}
      {activeSubTab === "improve" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Banner kết quả mô phỏng */}
          <div className="card" style={styles.simulationBanner}>
            <div>
              <h3 style={{ fontSize: "16px", color: "#ffffff" }}>Mô phỏng nâng điểm học phần</h3>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", marginTop: "2px" }}>
                Thử nhập điểm mới cho các môn bạn muốn học lại/cải thiện. Bảng điểm gốc sẽ không bị thay đổi.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                GPA hiện tại: <strong>{stats.gpa4.toFixed(2)}</strong> (Hệ 4)
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#F39C12" }}>
                GPA sau cải thiện: {simulatedStats.gpa4.toFixed(2)}
              </div>
              <div style={{ fontSize: "12px", color: "#2ecc71" }}>
                Tăng +{(simulatedStats.gpa4 - stats.gpa4).toFixed(2)} điểm
              </div>
            </div>
          </div>

          {/* Bảng danh sách các môn có thể cải thiện */}
          <div className="card" style={{ padding: "20px" }}>
            <h4 style={{ fontSize: "15px", color: "var(--primary)", marginBottom: "12px" }}>
              Chọn môn và nhập điểm dự kiến mới:
            </h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Mã môn</th>
                    <th>Tên môn</th>
                    <th style={{ textAlign: "center" }}>Số TC</th>
                    <th style={{ textAlign: "center" }}>Điểm cũ</th>
                    <th style={{ textAlign: "center" }}>Điểm mô phỏng mới (0-10)</th>
                    <th style={{ textAlign: "center" }}>Quy đổi hệ 4 mới</th>
                  </tr>
                </thead>
                <tbody>
                  {grades
                    .filter((g) => g.score10 !== null && g.status !== "EXEMPT_GPA")
                    .map((g) => {
                      const code = g.id || g.code;
                      const simVal = simulatedGrades[code] ?? "";
                      const simNum = parseFloat(simVal);
                      const hasSim = !isNaN(simNum);

                      return (
                        <tr key={code}>
                          <td><code>{code}</code></td>
                          <td><strong>{g.name}</strong></td>
                          <td style={{ textAlign: "center" }}>{g.credits} TC</td>
                          <td style={{ textAlign: "center", color: "#e74c3c", fontWeight: "600" }}>
                            {g.score10?.toFixed(1)} ({g.grade})
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              step="0.5"
                              className="input"
                              placeholder="Nhập điểm..."
                              value={simVal}
                              onChange={(e) =>
                                setSimulatedGrades((prev) => ({
                                  ...prev,
                                  [code]: e.target.value,
                                }))
                              }
                              style={{ width: "110px", textAlign: "center", padding: "6px" }}
                            />
                          </td>
                          <td style={{ textAlign: "center", fontWeight: "700", color: "var(--primary)" }}>
                            {hasSim ? scoreTo4Scale(simNum).toFixed(1) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "12px",
  },
  subTabBar: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "8px",
  },
  tabBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#4a5568",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  tabBtnActive: {
    backgroundColor: "var(--primary)",
    color: "#ffffff",
  },
  code: {
    backgroundColor: "#edf2f7",
    color: "#2b6cb0",
    padding: "3px 6px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  simulationBanner: {
    background: "linear-gradient(135deg, #003366 0%, #004A98 100%)",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
  },
};

export default GradesPage;
