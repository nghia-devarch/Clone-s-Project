import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import programs from "../data/programs";
import { getCourseName, getCourseById } from "../utils/courseHelpers";
import LoadingSpinner from "../components/LoadingSpinner";

function ProgramPage() {
  const { programId } = useParams();
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const program = programs.find((p) => p.id === programId);

  useEffect(() => {
    setLoading(true);
    setError(null);

    import(`../data/categories/${programId}.js`)
      .then((module) => {
        setCategories(module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Chưa có chi tiết danh mục cho:", programId, err);
        setError("Chương trình đào tạo này đang được số hóa chi tiết. Bạn có thể xem trước mẫu ngành CNTT hoặc Kỹ thuật phần mềm (KTPM).");
        setLoading(false);
      });
  }, [programId]);

  if (!program) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "50px" }}>
        <h2>⚠️ Không tìm thấy chương trình</h2>
        <p style={{ color: "var(--text-light)", marginTop: "10px" }}>
          Mã chương trình không hợp lệ hoặc không tồn tại.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "16px" }}>
          ← Quay lại trang chủ
        </Link>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <Link to="/" style={{ color: "var(--text-light)", fontSize: "14px" }}>← Quay lại trang chủ</Link>
        </div>
        <div className="card" style={{ padding: "30px", borderLeft: "5px solid var(--accent)" }}>
          <h2 style={{ color: "var(--primary)" }}>📋 {program.name}</h2>
          <p style={{ color: "var(--text-light)", marginTop: "4px" }}>{program.faculty}</p>
          <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#fff8e1", borderRadius: "8px", color: "#b7791f", fontSize: "14px" }}>
            {error}
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Link to="/program/cntt" className="btn btn-primary">
              Xem ngành CNTT mẫu
            </Link>
            <Link to="/program/ktpm" className="btn btn-outline">
              Xem ngành Kỹ thuật phần mềm mẫu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Link to="/" style={{ color: "var(--text-light)", fontSize: "14px" }}>← Trang chủ</Link>
        <span style={{ margin: "0 8px", color: "var(--text-muted)" }}>/</span>
        <span style={{ fontSize: "14px", fontWeight: "600" }}>{program.name}</span>
      </div>

      <div className="card" style={styles.programBanner}>
        <span className="badge badge-warning" style={{ alignSelf: "flex-start", marginBottom: "8px" }}>
          Khung chương trình chuẩn
        </span>
        <h1 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "6px" }}>
          📋 {program.name}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px" }}>
          Trực thuộc: <strong>{program.faculty}</strong>
        </p>
      </div>

      {categories && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {Object.entries(categories).map(([sectionKey, sectionData]) => (
            <SectionBlock key={sectionKey} sectionKey={sectionKey} data={sectionData} />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionBlock({ sectionKey, data }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card" style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <div>
          <h2 style={{ fontSize: "20px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>{open ? "📂" : "📁"}</span>
            {data.name || sectionKey}
          </h2>
          {data.total_credits_required && (
            <div style={{ fontSize: "13px", color: "var(--text-light)", marginTop: "4px" }}>
              Yêu cầu tích lũy: <strong style={{ color: "var(--primary)" }}>{data.total_credits_required} tín chỉ</strong>
            </div>
          )}
        </div>
        <span style={{ fontSize: "20px", color: "var(--primary)", fontWeight: "bold" }}>
          {open ? "−" : "+"}
        </span>
      </div>

      {data.note && (
        <p style={{ fontSize: "13px", color: "#636e72", fontStyle: "italic", marginTop: "8px", borderLeft: "3px solid #dfe6e9", paddingLeft: "10px" }}>
          {data.note}
        </p>
      )}

      {open && (
        <div style={{ marginTop: "16px" }}>
          {/* Danh sách môn trực tiếp nếu có */}
          {data.courses && (
            <CourseChipsList courses={data.courses} />
          )}

          {/* Breakdown các phân nhóm con */}
          {data.breakdown && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
              {Object.entries(data.breakdown).map(([subKey, subData]) => (
                <SubSectionBlock key={subKey} subKey={subKey} sub={subData} />
              ))}
            </div>
          )}

          {/* Các phương án tốt nghiệp nếu có */}
          {data.options && (
            <div style={{ marginTop: "14px" }}>
              <h4 style={{ color: "var(--text)", fontSize: "15px", marginBottom: "8px" }}>
                Các phương án lựa chọn:
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {data.options.map((opt, idx) => (
                  <div key={idx} style={styles.optionBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong>{opt.name || opt.type}</strong>
                      <span className="badge badge-info">{opt.credits} tín chỉ</span>
                    </div>
                    {opt.courses && <CourseChipsList courses={opt.courses} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SubSectionBlock({ subKey, sub }) {
  return (
    <div style={styles.subBlock}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <h3 style={{ fontSize: "16px", color: "#2c3e50" }}>
          🔹 {sub.name || subKey}
        </h3>
        {(sub.credits || sub.credits_required) && (
          <span className="badge badge-primary">
            {sub.credits || sub.credits_required} TC
          </span>
        )}
      </div>

      {sub.note && (
        <div style={{ fontSize: "12px", color: "#747d8c", fontStyle: "italic", marginBottom: "8px" }}>
          {sub.note}
        </div>
      )}

      {sub.courses && <CourseChipsList courses={sub.courses} />}

      {sub.breakdown && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px", marginLeft: "12px" }}>
          {Object.entries(sub.breakdown).map(([k, v]) => (
            <SubSectionBlock key={k} subKey={k} sub={v} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseChipsList({ courses }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
      {courses.map((id) => {
        const info = getCourseById(id);
        const name = getCourseName(id);
        return (
          <div key={id} style={styles.chip} title={`${id} - ${name} (${info?.credits || 0} TC)`}>
            <strong>{id}</strong>
            <span style={{ color: "#57606f", marginLeft: "6px" }}>{name}</span>
            {info && (
              <span style={{ color: "var(--primary)", fontWeight: "bold", marginLeft: "6px", fontSize: "11px" }}>
                ({info.credits} TC)
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  programBanner: {
    background: "linear-gradient(135deg, #004A98 0%, #003366 100%)",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  subBlock: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "14px",
    border: "1px solid #e2e8f0",
  },
  optionBox: {
    padding: "12px",
    backgroundColor: "#f1f2f6",
    borderRadius: "6px",
    borderLeft: "3px solid var(--accent)",
  },
  chip: {
    backgroundColor: "#ffffff",
    border: "1px solid #dcdde1",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    display: "inline-flex",
    alignItems: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
};

export default ProgramPage;
