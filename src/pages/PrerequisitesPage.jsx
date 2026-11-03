import React, { useState, useMemo } from "react";
import prerequisites from "../data/prerequisites";
import { getCourseName, getCourseById } from "../utils/courseHelpers";

function PrerequisitesPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const grouped = useMemo(() => {
    const map = {};
    prerequisites.forEach((p) => {
      if (!map[p.course_id]) {
        map[p.course_id] = [];
      }
      map[p.course_id].push(p);
    });
    return map;
  }, []);

  const filteredEntries = useMemo(() => {
    return Object.entries(grouped).filter(([courseId, prereqList]) => {
      const courseName = getCourseName(courseId);
      const matchesSearch =
        courseId.toLowerCase().includes(search.toLowerCase()) ||
        courseName.toLowerCase().includes(search.toLowerCase()) ||
        prereqList.some(
          (p) =>
            p.prereq_id.toLowerCase().includes(search.toLowerCase()) ||
            getCourseName(p.prereq_id).toLowerCase().includes(search.toLowerCase())
        );

      const matchesType =
        filterType === "all" || prereqList.some((p) => p.type === filterType);

      return matchesSearch && matchesType;
    });
  }, [grouped, search, filterType]);

  const typeConfig = {
    PREVIOUS: {
      label: "Tiên quyết (Phải học trước)",
      badgeClass: "badge-danger",
      color: "#e74c3c",
      desc: "Sinh viên phải hoàn thành môn này trước khi được phép đăng ký môn tiếp theo.",
    },
    PARALLEL: {
      label: "Song hành (Học cùng kỳ)",
      badgeClass: "badge-info",
      color: "#2980b9",
      desc: "Sinh viên có thể đăng ký đồng thời trong cùng một học kỳ.",
    },
    RECOMMENDED: {
      label: "Khuyến nghị (Nên học trước)",
      badgeClass: "badge-warning",
      color: "#f39c12",
      desc: "Không bắt buộc về mặt quy chế nhưng khuyến khích có kiến thức nền.",
    },
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 className="section-title">🔗 Ràng buộc môn tiên quyết HCMUS</h1>
        <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
          Tra cứu các học phần điều kiện để chuẩn bị kế hoạch đăng ký học phần chính xác nhất.
        </p>
      </div>

      {/* Chú giải loại ràng buộc */}
      <div className="card" style={{ padding: "16px", marginBottom: "20px" }}>
        <div style={{ fontWeight: 600, marginBottom: "10px", color: "var(--primary)" }}>
          📌 Chú thích các loại điều kiện:
        </div>
        <div className="grid grid-3">
          {Object.entries(typeConfig).map(([key, cfg]) => (
            <div key={key} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span className={`badge ${cfg.badgeClass}`} style={{ marginTop: "2px" }}>
                {key}
              </span>
              <div>
                <div style={{ fontWeight: "600", fontSize: "13px" }}>{cfg.label}</div>
                <div style={{ fontSize: "12px", color: "var(--text-light)" }}>{cfg.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bộ tìm kiếm */}
      <div className="card" style={{ padding: "16px", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <input
              type="text"
              className="input"
              placeholder="🔍 Tìm kiếm theo mã hoặc tên môn học..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "all", label: "Tất cả" },
              { id: "PREVIOUS", label: "Tiên quyết" },
              { id: "PARALLEL", label: "Song hành" },
              { id: "RECOMMENDED", label: "Khuyến nghị" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`btn ${filterType === tab.id ? "btn-primary" : "btn-outline"}`}
                onClick={() => setFilterType(tab.id)}
                style={{ padding: "8px 14px", fontSize: "13px" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Danh sách thẻ môn học */}
      <div className="grid grid-2">
        {filteredEntries.map(([courseId, prereqList]) => {
          const courseInfo = getCourseById(courseId);
          return (
            <div key={courseId} className="card" style={styles.prereqCard}>
              <div style={styles.cardHeader}>
                <code style={styles.targetCourseCode}>{courseId}</code>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", color: "var(--primary)", fontSize: "16px" }}>
                    {getCourseName(courseId)}
                  </div>
                  {courseInfo && (
                    <span style={{ fontSize: "12px", color: "var(--text-light)" }}>
                      Số tín chỉ: <strong>{courseInfo.credits}</strong> ({courseInfo.theory_hours} LT / {courseInfo.lab_hours} TH)
                    </span>
                  )}
                </div>
              </div>

              <div style={styles.prereqList}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#57606f", textTransform: "uppercase", marginBottom: "6px" }}>
                  Điều kiện bắt buộc / khuyến nghị:
                </div>
                {prereqList.map((p, idx) => {
                  const cfg = typeConfig[p.type] || { badgeClass: "badge-info", label: p.type };
                  return (
                    <div key={idx} style={styles.prereqItem}>
                      <span className={`badge ${cfg.badgeClass}`} style={{ fontSize: "11px" }}>
                        {p.type}
                      </span>
                      <div style={{ fontSize: "13px" }}>
                        <strong>{p.prereq_id}</strong> — {getCourseName(p.prereq_id)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {filteredEntries.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
          Không tìm thấy môn học nào khớp với bộ lọc.
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: "20px",
  },
  prereqCard: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderLeft: "4px solid var(--primary)",
  },
  cardHeader: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  targetCourseCode: {
    backgroundColor: "#e8f0fe",
    color: "var(--primary)",
    fontWeight: "bold",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "14px",
  },
  prereqList: {
    backgroundColor: "#f8f9fa",
    padding: "12px",
    borderRadius: "8px",
  },
  prereqItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "6px",
  },
};

export default PrerequisitesPage;
