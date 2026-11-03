import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.brand}>
          🏛️ <strong>HCMUS Portal</strong> — Cổng Hỗ trợ Học tập Sinh viên KHTN
        </p>
        <p style={styles.desc}>
          100% Local-First • Bảo mật tuyệt đối • Không quảng cáo • Không theo dõi bên thứ ba.
        </p>
        <p style={styles.copy}>
          © {new Date().getFullYear()} HCMUS Student Portal — Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#00284d",
    color: "#a4b0be",
    padding: "24px 16px",
    marginTop: "auto",
    borderTop: "3px solid #F39C12",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center",
  },
  brand: {
    color: "#ffffff",
    fontSize: "15px",
    marginBottom: "6px",
  },
  desc: {
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "8px",
  },
  copy: {
    fontSize: "11px",
    color: "#64748b",
  },
};

export default Footer;
