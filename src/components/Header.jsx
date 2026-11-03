import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStudent } from "../context/StudentContext";
import PortalSyncModal from "./PortalSyncModal";

const ROUTE_TITLES = {
  "/dashboard": "Tổng quan Học tập",
  "/study-roadmap": "Lộ trình học tập & Xếp lịch",
  "/grades": "Quản lý Điểm & GPA",
  "/schedule": "Thời khóa biểu tuần",
  "/exam-schedule": "Lịch thi học kỳ",
  "/tuition": "Tra cứu Học phí",
  "/campus": "Thông tin trường & Bản đồ",
  "/courses": "Kho Môn học HCMUS",
  "/prerequisites": "Môn tiên quyết & Song hành",
  "/settings": "Cài đặt & Dữ liệu",
  "/privacy": "Bảo mật & Quyền riêng tư",
  "/guide": "Quy chế đào tạo & Cẩm nang",
};

function Header() {
  const location = useLocation();
  const { student, stats } = useStudent();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lấy tiêu đề trang hiện tại
  const currentTitle = ROUTE_TITLES[location.pathname] || "HCMUS Portal";

  return (
    <>
      {/* 1. THANH TOP BAR CHO ĐIỆN THOẠI (Mobile Top Bar) */}
      <div className="mobile-top-bar">
        <Link to="/dashboard" style={styles.mobileLogo}>
          <span style={{ fontSize: "20px" }}>🏛️</span>
          <span style={{ fontWeight: "800", fontSize: "16px", color: "#ffffff", letterSpacing: "0.5px" }}>
            HCMUS <span style={{ color: "#F39C12" }}>Portal</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            className="btn btn-accent"
            onClick={() => setModalOpen(true)}
            style={{ padding: "4px 8px", fontSize: "11px", borderRadius: "14px" }}
          >
            🔄 Đồng bộ
          </button>

          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={styles.mobileMenuBtn}
            aria-label="Menu mở rộng"
          >
            ☰
          </button>
        </div>
      </div>

      {/* 2. THANH TOP BAR CHO MÁY TÍNH (Desktop Top Bar) */}
      <header style={styles.desktopTopBar} className="hide-on-mobile">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#1a202c" }}>
            {currentTitle}
          </h2>
          <span className="badge badge-primary" style={{ fontSize: "11px" }}>
            {student.currentSemesterName || "HK1 - 2024-2025"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={styles.localBadge}>
            <span style={{ color: "#27ae60" }}>●</span> 100% Local-First
          </div>

          <button
            className="btn btn-accent"
            onClick={() => setModalOpen(true)}
            style={{ padding: "7px 14px", fontSize: "12px" }}
          >
            🔄 Đồng bộ / Nhập dữ liệu
          </button>

          <Link to="/settings" style={styles.userBadge} title="Cài đặt thông tin">
            <div style={styles.avatarMini}>
              {student.name ? student.name.charAt(0) : "S"}
            </div>
            <div style={{ lineHeight: "1.2", textAlign: "left" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#2d3748" }}>{student.name}</div>
              <div style={{ fontSize: "10px", color: "#718096" }}>MSSV: {student.studentId}</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Drawer menu mở rộng cho điện thoại khi bấm nút ☰ */}
      {drawerOpen && (
        <div style={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <div style={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "22px" }}>🏛️</span>
                <strong>HCMUS Portal</strong>
              </div>
              <button style={styles.drawerClose} onClick={() => setDrawerOpen(false)}>✕</button>
            </div>

            <div style={styles.drawerList}>
              <Link to="/exam-schedule" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>⏳</span> Lịch thi học kỳ
              </Link>
              <Link to="/tuition" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>💰</span> Tra cứu học phí
              </Link>
              <Link to="/campus" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>🏫</span> Bản đồ & Danh bạ
              </Link>
              <Link to="/courses" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>📚</span> Kho môn học
              </Link>
              <Link to="/prerequisites" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>🔗</span> Môn tiên quyết
              </Link>
              <Link to="/settings" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>⚙️</span> Cài đặt & Dữ liệu
              </Link>
              <Link to="/privacy" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>🔒</span> Bảo mật & Quyền riêng tư
              </Link>
              <Link to="/guide" style={styles.drawerItem} onClick={() => setDrawerOpen(false)}>
                <span>📖</span> Quy chế & Hướng dẫn
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal đồng bộ */}
      <PortalSyncModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

const styles = {
  mobileLogo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
  },
  mobileMenuBtn: {
    background: "rgba(255, 255, 255, 0.2)",
    border: "none",
    color: "#ffffff",
    fontSize: "18px",
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  desktopTopBar: {
    height: "56px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid var(--border)",
    padding: "0 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 90,
  },
  localBadge: {
    fontSize: "12px",
    color: "#4a5568",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#f7fafc",
    padding: "4px 10px",
    borderRadius: "14px",
    border: "1px solid #edf2f7",
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    padding: "3px 8px 3px 3px",
    borderRadius: "20px",
    backgroundColor: "#f7fafc",
    border: "1px solid #e2e8f0",
  },
  avatarMini: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "var(--primary)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "12px",
  },
  drawerOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2000,
    display: "flex",
    justifyContent: "flex-end",
  },
  drawerContent: {
    width: "260px",
    backgroundColor: "#ffffff",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
    animation: "slideIn 0.2s ease-out",
  },
  drawerHeader: {
    padding: "16px",
    borderBottom: "1px solid #edf2f7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  drawerClose: {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#718096",
    cursor: "pointer",
  },
  drawerList: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    overflowY: "auto",
  },
  drawerItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    color: "#2d3748",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "6px",
  },
};

export default Header;
