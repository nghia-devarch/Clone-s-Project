import React, { useState, useMemo } from "react";
import { useStudent } from "../context/StudentContext";

function ExamSchedulePage() {
  const { student, exams } = useStudent();
  const [search, setSearch] = useState("");

  const filteredExams = useMemo(() => {
    return exams.filter(
      (ex) =>
        ex.courseName.toLowerCase().includes(search.toLowerCase()) ||
        ex.courseId.toLowerCase().includes(search.toLowerCase()) ||
        ex.room.toLowerCase().includes(search.toLowerCase())
    );
  }, [exams, search]);

  // Hàm tính số ngày còn lại đến ngày thi
  const getDaysLeft = (examDateStr) => {
    try {
      const examDate = new Date(examDateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diffTime = examDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return 0;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 className="section-title">⏳ Lịch thi học kỳ chính thức HCMUS</h1>
          <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
            Học kỳ: <strong>{student.currentSemesterName || "HK1 - 2024-2025"}</strong> | Sinh viên: <strong>{student.name}</strong> ({student.studentId})
          </p>
        </div>

        <div style={styles.badgeInfo}>
          Tổng số: <strong>{exams.length}</strong> môn thi
        </div>
      </div>

      {/* Tìm kiếm */}
      <div className="card" style={{ padding: "14px", marginBottom: "20px" }}>
        <input
          type="text"
          className="input"
          placeholder="🔍 Tìm kiếm môn thi, phòng thi hoặc mã môn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Danh sách thẻ môn thi */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredExams.map((ex) => {
          const daysLeft = getDaysLeft(ex.examDate);
          return (
            <div key={ex.id} className="card" style={styles.examCard}>
              {/* Cột trái: Ngày thi & Countdown */}
              <div style={styles.dateCol}>
                <div style={styles.dateNumber}>{ex.dateLabel.split("/")[0]}</div>
                <div style={{ fontSize: "12px", color: "#718096" }}>Tháng {ex.dateLabel.split("/")[1]}</div>
                <div style={{ marginTop: "6px" }}>
                  {daysLeft > 0 ? (
                    <span className="badge badge-warning" style={{ fontSize: "11px" }}>
                      Còn {daysLeft} ngày
                    </span>
                  ) : daysLeft === 0 ? (
                    <span className="badge badge-danger" style={{ fontSize: "11px" }}>
                      Hôm nay thi!
                    </span>
                  ) : (
                    <span className="badge badge-success" style={{ fontSize: "11px" }}>
                      Đã thi xong
                    </span>
                  )}
                </div>
              </div>

              {/* Cột giữa: Chi tiết môn thi */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <code style={styles.code}>{ex.courseId}</code>
                  <span className="badge badge-primary">{ex.examType || "Cuối kỳ"}</span>
                  <span className="badge badge-info">{ex.format || "Tự luận"}</span>
                </div>
                <h3 style={{ fontSize: "18px", color: "#2d3748", marginTop: "6px" }}>
                  {ex.courseName}
                </h3>
                <div style={styles.detailsRow}>
                  <div>🕒 Ca thi: <strong>{ex.time} ({ex.shift})</strong></div>
                  <div>🏫 Phòng: <strong style={{ color: "var(--primary)" }}>{ex.room}</strong></div>
                  <div>🪑 Số báo danh: <strong>{ex.seatNumber}</strong></div>
                </div>
                {ex.notes && (
                  <div style={{ fontSize: "12px", color: "#e67e22", marginTop: "8px", fontStyle: "italic" }}>
                    📌 Ghi chú: {ex.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredExams.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            Không tìm thấy môn thi nào khớp với từ khóa "{search}"
          </div>
        )}
      </div>
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
  badgeInfo: {
    backgroundColor: "#e8f0fe",
    color: "var(--primary)",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
  },
  examCard: {
    padding: "20px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    borderLeft: "5px solid var(--primary)",
  },
  dateCol: {
    minWidth: "100px",
    padding: "12px",
    backgroundColor: "#f7fafc",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid #edf2f7",
    flexShrink: 0,
  },
  dateNumber: {
    fontSize: "28px",
    fontWeight: "800",
    color: "var(--primary)",
    lineHeight: "1",
  },
  code: {
    backgroundColor: "#edf2f7",
    color: "#2b6cb0",
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  detailsRow: {
    display: "flex",
    gap: "20px",
    fontSize: "13px",
    color: "#4a5568",
    marginTop: "8px",
    flexWrap: "wrap",
  },
};

export default ExamSchedulePage;
