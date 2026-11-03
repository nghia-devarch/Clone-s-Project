import React from "react";
import { Link } from "react-router-dom";
import programs from "../data/programs";

const FACULTY_ICONS = {
  "Khoa Công nghệ Thông tin": "💻",
  "Khoa Hóa học": "🧪",
  "Khoa Vật lý - Vật lý kỹ thuật": "⚛️",
  "Khoa Điện tử - Viễn thông": "📡",
  "Khoa Toán - Tin học": "📐",
  "Khoa Địa chất": "🌍",
  "Khoa Khoa học Vật liệu": "🔬",
  "Khoa Môi trường": "🌿",
};

function HomePage() {
  const grouped = {};
  programs.forEach((p) => {
    if (!grouped[p.faculty]) grouped[p.faculty] = [];
    grouped[p.faculty].push(p);
  });

  return (
    <div>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>🏛️ HCMUS Portal - Cổng Quản lý Học tập</h1>
          <p style={styles.heroSubtitle}>
            Hệ thống tra cứu lộ trình đào tạo, môn tiên quyết, danh mục môn học và công cụ tính điểm GPA chuẩn xác cho sinh viên Đại học Khoa học Tự nhiên TP.HCM.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/gpa" className="btn btn-accent" style={{ padding: "12px 24px", fontSize: "15px" }}>
              📊 Tính điểm GPA ngay
            </Link>
            <Link to="/courses" className="btn btn-outline" style={{ padding: "12px 24px", fontSize: "15px", borderColor: "#fff", color: "#fff" }}>
              📚 Tra cứu môn học
            </Link>
            <Link to="/prerequisites" className="btn btn-primary" style={{ padding: "12px 24px", fontSize: "15px", backgroundColor: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)" }}>
              🔗 Xem môn tiên quyết
            </Link>
          </div>
        </div>
      </section>

      {/* Feature highlight */}
      <section style={{ marginBottom: "36px" }}>
        <h2 className="section-title">✨ Tính năng nổi bật</h2>
        <div className="grid grid-3">
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Công cụ tính GPA</h3>
            <p style={styles.featureDesc}>
              Tính toán tự động GPA hệ 10 và hệ 4 theo thang điểm chuẩn HCMUS, xếp loại học lực nhanh chóng.
            </p>
            <Link to="/gpa" className="btn btn-outline" style={{ marginTop: "12px", fontSize: "13px" }}>
              Mở tính điểm →
            </Link>
          </div>

          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>📚</div>
            <h3 style={styles.featureTitle}>Kho dữ liệu môn học</h3>
            <p style={styles.featureDesc}>
              Tra cứu nhanh theo mã học phần, tên tiếng Việt, số tín chỉ lý thuyết/thực hành và loại môn (BB/TC).
            </p>
            <Link to="/courses" className="btn btn-outline" style={{ marginTop: "12px", fontSize: "13px" }}>
              Xem danh mục →
            </Link>
          </div>

          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🔗</div>
            <h3 style={styles.featureTitle}>Ràng buộc tiên quyết</h3>
            <p style={styles.featureDesc}>
              Hiển thị sơ đồ tiên quyết (Previous), môn song hành (Parallel) và khuyến nghị (Recommended) chuẩn bị đăng ký học phần.
            </p>
            <Link to="/prerequisites" className="btn btn-outline" style={{ marginTop: "12px", fontSize: "13px" }}>
              Kiểm tra cây điều kiện →
            </Link>
          </div>
        </div>
      </section>

      {/* Program list */}
      <section>
        <h2 className="section-title">🏛️ Chương trình đào tạo theo Khoa</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {Object.entries(grouped).map(([faculty, progs]) => (
            <div key={faculty} className="card" style={{ padding: "20px" }}>
              <div style={styles.facultyHeader}>
                <span style={{ fontSize: "24px" }}>{FACULTY_ICONS[faculty] || "🏫"}</span>
                <h3 style={{ fontSize: "18px", color: "var(--primary)" }}>{faculty}</h3>
                <span className="badge badge-info" style={{ marginLeft: "auto" }}>
                  {progs.length} ngành
                </span>
              </div>
              <div className="grid grid-2" style={{ marginTop: "14px" }}>
                {progs.map((p) => (
                  <Link
                    key={p.id}
                    to={`/program/${p.id}`}
                    style={styles.progItem}
                  >
                    <div>
                      <strong style={{ fontSize: "15px", color: "#1e272e" }}>{p.name}</strong>
                      <div style={{ fontSize: "12px", color: "#808e9b", marginTop: "2px" }}>
                        Mã chương trình: <code style={{ color: "var(--primary)" }}>{p.id}</code>
                      </div>
                    </div>
                    <span style={{ color: "var(--primary)", fontWeight: "bold" }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(135deg, #004A98 0%, #0984e3 100%)",
    borderRadius: "16px",
    padding: "48px 32px",
    color: "#ffffff",
    marginBottom: "36px",
    boxShadow: "0 10px 25px rgba(0, 74, 152, 0.2)",
  },
  heroContent: {
    maxWidth: "800px",
  },
  heroTitle: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "14px",
    lineHeight: "1.2",
  },
  heroSubtitle: {
    fontSize: "16px",
    opacity: 0.9,
    marginBottom: "28px",
    lineHeight: "1.6",
  },
  heroButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  featureCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  featureIcon: {
    fontSize: "36px",
    marginBottom: "12px",
  },
  featureTitle: {
    fontSize: "18px",
    color: "var(--primary)",
    marginBottom: "8px",
  },
  featureDesc: {
    fontSize: "14px",
    color: "var(--text-light)",
    flex: 1,
  },
  facultyHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid var(--border-light)",
    paddingBottom: "10px",
  },
  progItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    transition: "all 0.2s ease",
  },
};

export default HomePage;
