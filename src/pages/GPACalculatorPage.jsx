import React, { useState, useCallback } from "react";
import { calculateGPA, scoreToGrade, classifyGPA, scoreTo4Scale } from "../utils/gpa";
import { searchCourses } from "../utils/courseHelpers";

function createEmptyRow() {
  return { id: Date.now() + Math.random(), courseId: "", courseName: "", credits: 3, score: "" };
}

// Mẫu một số môn học phổ biến để sinh viên tiện bấm thử nghiệm
const SAMPLE_COURSES = [
  { courseId: "CSC10012", courseName: "Cơ sở lập trình", credits: 4, score: "8.5" },
  { courseId: "CSC10004", courseName: "Cấu trúc dữ liệu và giải thuật", credits: 4, score: "8.0" },
  { courseId: "CSC10006", courseName: "Cơ sở dữ liệu", credits: 4, score: "7.5" },
  { courseId: "MTH00021", courseName: "Vi tích phân 1", credits: 4, score: "8.0" },
  { courseId: "MTH00035", courseName: "Đại số tuyến tính", credits: 4, score: "9.0" },
];

function GPACalculatorPage() {
  const [rows, setRows] = useState([
    { id: 1, courseId: "CSC10012", courseName: "Cơ sở lập trình", credits: 4, score: "8.5" },
    { id: 2, courseId: "MTH00021", courseName: "Vi tích phân 1", credits: 4, score: "7.8" },
    { id: 3, courseId: "BAA00004", courseName: "Pháp luật đại cương", credits: 3, score: "8.0" },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);

  const updateRow = useCallback((id, field, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }, []);

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, createEmptyRow()]);
  }, []);

  const removeRow = useCallback((id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setRows([createEmptyRow()]);
  }, []);

  const loadSample = useCallback(() => {
    setRows(SAMPLE_COURSES.map((c, i) => ({ ...c, id: Date.now() + i })));
  }, []);

  const handleSearch = useCallback((id, value) => {
    updateRow(id, "courseName", value);
    setActiveRowId(id);
    if (value.trim().length >= 2) {
      setSearchResults(searchCourses(value).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [updateRow]);

  const selectCourse = useCallback((id, course) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              courseId: course.course_id,
              courseName: course.course_name_vi,
              credits: course.credits,
            }
          : r
      )
    );
    setSearchResults([]);
    setActiveRowId(null);
  }, []);

  const validCourses = rows.filter(
    (r) => r.credits > 0 && r.score !== "" && !isNaN(parseFloat(r.score))
  );

  const gpaResult = calculateGPA(
    validCourses.map((r) => ({ credits: Number(r.credits), score: parseFloat(r.score) }))
  );
  const classification = classifyGPA(gpaResult.gpa4);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 className="section-title">📊 Công cụ tính GPA HCMUS</h1>
          <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
            Hỗ trợ nhập môn, tự động quy đổi điểm chữ, điểm hệ 4 và xếp loại tốt nghiệp theo quy chế tín chỉ HCMUS.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn btn-outline" onClick={loadSample}>
            📋 Nạp dữ liệu mẫu
          </button>
          <button className="btn btn-outline" onClick={clearAll} style={{ color: "var(--danger)", borderColor: "var(--danger)" }}>
            🗑️ Xóa trắng
          </button>
        </div>
      </div>

      {/* Thẻ thống kê kết quả */}
      <div className="card" style={styles.statsCard}>
        <div className="grid grid-4">
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{gpaResult.gpa10.toFixed(2)}</div>
            <div style={styles.statLabel}>GPA Hệ 10</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNumber, color: "var(--accent)" }}>{gpaResult.gpa4.toFixed(2)}</div>
            <div style={styles.statLabel}>GPA Hệ 4.0</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{gpaResult.totalCredits}</div>
            <div style={styles.statLabel}>Tổng số tín chỉ tính</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNumber, fontSize: "22px", color: "#27ae60" }}>
              {validCourses.length > 0 ? classification : "—"}
            </div>
            <div style={styles.statLabel}>Xếp loại học lực</div>
          </div>
        </div>
      </div>

      {/* Bảng nhập liệu */}
      <div className="card" style={{ padding: "16px" }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: "50px", textAlign: "center" }}>STT</th>
                <th style={{ width: "120px" }}>Mã môn</th>
                <th>Tên môn học (Gợi ý tự động)</th>
                <th style={{ width: "90px", textAlign: "center" }}>Số TC</th>
                <th style={{ width: "110px", textAlign: "center" }}>Điểm hệ 10</th>
                <th style={{ width: "90px", textAlign: "center" }}>Điểm chữ</th>
                <th style={{ width: "90px", textAlign: "center" }}>Điểm hệ 4</th>
                <th style={{ width: "60px", textAlign: "center" }}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const scoreNum = parseFloat(row.score);
                const isValid = !isNaN(scoreNum) && scoreNum >= 0 && scoreNum <= 10;
                const letterGrade = isValid ? scoreToGrade(scoreNum) : "";
                const gpa4 = isValid ? scoreTo4Scale(scoreNum) : "";

                return (
                  <tr key={row.id}>
                    <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
                      {index + 1}
                    </td>
                    <td>
                      <input
                        className="input"
                        placeholder="Mã MH"
                        value={row.courseId}
                        onChange={(e) => updateRow(row.id, "courseId", e.target.value.toUpperCase())}
                        style={{ padding: "6px 8px", fontSize: "13px", fontWeight: "600" }}
                      />
                    </td>
                    <td style={{ position: "relative" }}>
                      <input
                        className="input"
                        placeholder="Nhập tên môn để tìm nhanh..."
                        value={row.courseName}
                        onChange={(e) => handleSearch(row.id, e.target.value)}
                        onFocus={() => setActiveRowId(row.id)}
                        style={{ padding: "6px 8px", fontSize: "13px" }}
                      />
                      {activeRowId === row.id && searchResults.length > 0 && (
                        <div style={styles.searchDropdown}>
                          {searchResults.map((c) => (
                            <div
                              key={c.course_id}
                              style={styles.dropdownItem}
                              onMouseDown={() => selectCourse(row.id, c)}
                            >
                              <strong>{c.course_id}</strong> - {c.course_name_vi} ({c.credits} TC)
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        className="input"
                        value={row.credits}
                        onChange={(e) => updateRow(row.id, "credits", parseInt(e.target.value) || 0)}
                        style={{ padding: "6px 8px", fontSize: "13px", textAlign: "center" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="input"
                        placeholder="0 - 10"
                        value={row.score}
                        onChange={(e) => updateRow(row.id, "score", e.target.value)}
                        style={{ padding: "6px 8px", fontSize: "13px", textAlign: "center", fontWeight: "bold" }}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {letterGrade ? (
                        <span className={`badge ${letterGrade.startsWith("A") ? "badge-success" : letterGrade === "F" ? "badge-danger" : "badge-info"}`}>
                          {letterGrade}
                        </span>
                      ) : (
                        <span style={{ color: "#dcdde1" }}>—</span>
                      )}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "700", color: "var(--primary)" }}>
                      {gpa4 !== "" ? gpa4.toFixed(1) : "—"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => removeRow(row.id)}
                        style={styles.deleteButton}
                        title="Xóa môn này"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
          <button className="btn btn-primary" onClick={addRow}>
            ➕ Thêm môn học
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  statsCard: {
    backgroundColor: "#ffffff",
    borderTop: "4px solid var(--primary)",
    marginBottom: "20px",
  },
  statBox: {
    textAlign: "center",
    padding: "10px",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "800",
    color: "var(--primary)",
  },
  statLabel: {
    fontSize: "13px",
    color: "var(--text-light)",
    marginTop: "4px",
  },
  searchDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: "0 0 8px 8px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    border: "1px solid var(--border)",
    zIndex: 100,
    maxHeight: "220px",
    overflowY: "auto",
  },
  dropdownItem: {
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: "13px",
    borderBottom: "1px solid #f1f2f6",
    transition: "background-color 0.15s ease",
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#e74c3c",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "4px 8px",
    borderRadius: "4px",
  },
};

export default GPACalculatorPage;
