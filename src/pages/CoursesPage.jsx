import React, { useState, useMemo } from "react";
import courses from "../data/courses";
import { getPrerequisites, getCourseName } from "../utils/courseHelpers";

function CoursesPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.course_id.toLowerCase().includes(search.toLowerCase()) ||
        c.course_name_vi.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === "all" || c.course_type === filterType;
      return matchSearch && matchType;
    });
  }, [search, filterType]);

  return (
    <div>
      <div style={styles.headerRow}>
        <div>
          <h1 className="section-title">📚 Danh sách môn học HCMUS</h1>
          <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
            Tra cứu thông tin chi tiết số tín chỉ, cấu trúc giờ giảng dạy và ràng buộc điều kiện môn học.
          </p>
        </div>
        <div style={styles.statsBadge}>
          Tổng số: <strong>{courses.length}</strong> môn
        </div>
      </div>

      {/* Bộ lọc tìm kiếm */}
      <div className="card" style={{ padding: "16px", marginBottom: "20px" }}>
        <div style={styles.filterBar}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <input
              type="text"
              className="input"
              placeholder="🔍 Nhập mã môn (vd: CSC10004) hoặc tên môn (vd: Cấu trúc dữ liệu)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "all", label: "Tất cả" },
              { id: "BB", label: "Bắt buộc" },
              { id: "TC", label: "Tự chọn" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`btn ${filterType === tab.id ? "btn-primary" : "btn-outline"}`}
                onClick={() => setFilterType(tab.id)}
                style={{ padding: "8px 16px" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: "120px" }}>Mã môn</th>
                <th>Tên môn học</th>
                <th style={{ textAlign: "center", width: "90px" }}>Số TC</th>
                <th style={{ textAlign: "center", width: "120px" }}>LT / TH / BT</th>
                <th style={{ textAlign: "center", width: "100px" }}>Phân loại</th>
                <th style={{ width: "220px" }}>Môn tiên quyết</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const prereqs = getPrerequisites(c.course_id);
                return (
                  <tr key={c.course_id}>
                    <td>
                      <code style={styles.codeBadge}>{c.course_id}</code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text)" }}>
                        {c.course_name_vi}
                      </div>
                      {c.description && (
                        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                          {c.description}
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "700", color: "var(--primary)" }}>
                      {c.credits}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "13px", color: "var(--text-light)" }}>
                      {c.theory_hours} / {c.lab_hours} / {c.exercise_hours}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span className={`badge ${c.course_type === "BB" ? "badge-primary" : "badge-info"}`}>
                        {c.course_type === "BB" ? "Bắt buộc" : "Tự chọn"}
                      </span>
                    </td>
                    <td>
                      {prereqs.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          {prereqs.map((p, idx) => (
                            <span key={idx} style={{ fontSize: "12px" }}>
                              <span style={{
                                color: p.type === "PREVIOUS" ? "var(--danger)" : "var(--info)",
                                fontWeight: "600",
                                marginRight: "4px"
                              }}>
                                [{p.type === "PREVIOUS" ? "Tiên quyết" : p.type === "PARALLEL" ? "Song hành" : "Khuyến nghị"}]
                              </span>
                              <code>{p.prereq_id}</code> - {getCourseName(p.prereq_id)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Không có</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                    Không tìm thấy môn học nào khớp với từ khóa "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "12px",
  },
  statsBadge: {
    backgroundColor: "#e8f0fe",
    color: "var(--primary)",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  filterBar: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  codeBadge: {
    backgroundColor: "#edf2f7",
    color: "#2b6cb0",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "700",
  },
};

export default CoursesPage;
