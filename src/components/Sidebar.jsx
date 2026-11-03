import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStudent } from "../context/StudentContext";
import PortalSyncModal from "./PortalSyncModal";

const navGroups = [
  {
    title: "Chính",
    items: [
      { path: "/dashboard", label: "Tổng quan", icon: "📊" },
      { path: "/study-roadmap", label: "Lộ trình học tập", icon: "🗺️" },
      { path: "/grades", label: "Quản lý điểm", icon: "📝" },
      { path: "/exam-schedule", label: "Lịch thi học kỳ", icon: "⏳" },
    ],
  },
  {
    title: "Tài chính",
    items: [
      { path: "/tuition", label: "Tra cứu học phí", icon: "💰" },
    ],
  },
  {
    title: "Tiện ích & Tra cứu",
    items: [
      { path: "/schedule", label: "Thời khóa biểu", icon: "📅" },
      { path: "/campus", label: "Bản đồ & Danh bạ", icon: "🏫" },
      { path: "/courses", label: "Kho môn học", icon: "📚" },
      { path: "/prerequisites", label: "Môn tiên quyết", icon: "🔗" },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      { path: "/settings", label: "Cài đặt & Dữ liệu", icon: "⚙️" },
      { path: "/privacy", label: "Bảo mật & Quyền", icon: "🔒" },
      { path: "/guide", label: "Quy chế & Hướng dẫn", icon: "📖" },
    ],
  },
];

function Sidebar() {
  const location = useLocation();
  const { student, stats } = useStudent();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div style={styles.sidebarWrapper}>
        {/* Brand Header */}
        <div style={styles.brandBox}>
          <div style={styles.logoIcon}>🏛️</div>
          <div style={styles.brandText}>
            <div style={styles.brandTitle}>
              <span style={{ color: "var(--primary)" }}>HCMUS</span>
              <span style={{ color: "var(--accent)", marginLeft: "4px" }}>Portal</span>
            </div>
            <div style={styles.brandSub}>Cổng Hỗ trợ Học tập KHTN</div>
          </div>
        </div>

        {/* Mini Student Profile Card */}
        <div style={styles.profileBox}>
          <div style={styles.avatar}>
            {student.name ? student.name.charAt(0) : "S"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={styles.studentName} title={student.name}>
              {student.name || "Sinh viên KHTN"}
            </div>
            <div style={styles.studentMeta}>
              <span>{student.studentId || "22120001"}</span> · <span>{student.cohort || "K2022"}</span>
            </div>
            <div style={styles.gpaBadge}>
              GPA: <strong>{stats.gpa4.toFixed(2)}</strong> / 4.0 ({stats.classification})
            </div>
          </div>
        </div>

        {/* Sync Button */}
        <div style={{ padding: "0 14px 12px 14px" }}>
          <button
            className="btn btn-outline"
            onClick={() => setModalOpen(true)}
            style={styles.syncBtn}
            title="Đồng bộ / Nhập dữ liệu sinh viên"
          >
            <span>🔄</span>
            <span>Đồng bộ / Nhập dữ liệu</span>
          </button>
        </div>

        {/* Navigation list (Scrollable) */}
        <nav style={styles.navScroll}>
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} style={styles.navGroup}>
              <div style={styles.groupTitle}>{group.title}</div>
              <div style={styles.groupItems}>
                {group.items.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        ...styles.navLink,
                        ...(isActive ? styles.navLinkActive : {}),
                      }}
                    >
                      <span style={styles.navIcon}>{item.icon}</span>
                      <span style={styles.navLabel}>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer info: 100% Local-First */}
        <div style={styles.sidebarFooter}>
          <div style={styles.localFirstTag}>
            <span style={{ color: "#27ae60" }}>●</span> 100% Local-First • Không quảng cáo
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
            Trường ĐH Khoa học Tự nhiên TP.HCM
          </div>
        </div>
      </div>

      <PortalSyncModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

const styles = {
  sidebarWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    userSelect: "none",
  },
  brandBox: {
    padding: "18px 16px 14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid var(--border-light)",
  },
  logoIcon: {
    fontSize: "30px",
  },
  brandText: {
    lineHeight: "1.2",
  },
  brandTitle: {
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "0.5px",
  },
  brandSub: {
    fontSize: "11px",
    color: "var(--text-muted)",
    fontWeight: "600",
  },
  profileBox: {
    margin: "12px 14px 10px 14px",
    padding: "10px 12px",
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
    border: "1px solid var(--border-light)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "var(--primary)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "15px",
    flexShrink: 0,
  },
  studentName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#2d3748",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  studentMeta: {
    fontSize: "11px",
    color: "#718096",
  },
  gpaBadge: {
    fontSize: "11px",
    color: "var(--primary)",
    fontWeight: "600",
    marginTop: "2px",
  },
  syncBtn: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
  },
  navScroll: {
    flex: 1,
    overflowY: "auto",
    padding: "4px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  navGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  groupTitle: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#a0aec0",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    paddingLeft: "8px",
    marginBottom: "4px",
  },
  groupItems: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "8px",
    color: "#4a5568",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "all 0.15s ease",
  },
  navLinkActive: {
    backgroundColor: "#eef5fc",
    color: "var(--primary)",
    fontWeight: "700",
  },
  navIcon: {
    fontSize: "16px",
  },
  navLabel: {
    flex: 1,
  },
  sidebarFooter: {
    padding: "12px 14px",
    borderTop: "1px solid var(--border-light)",
    backgroundColor: "#ffffff",
  },
  localFirstTag: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

export default Sidebar;
