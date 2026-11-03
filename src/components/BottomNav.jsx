import React from "react";
import { Link, useLocation } from "react-router-dom";

// Danh sách 5 tab thanh điều hướng chân trang mobile (chuẩn SLe gốc)
const bottomNavItems = [
  { path: "/dashboard", label: "Tổng quan", icon: "📊" },
  { path: "/study-roadmap", label: "Lộ trình", icon: "🗺️" },
  { path: "/grades", label: "Điểm", icon: "📝" },
  { path: "/schedule", label: "TKB", icon: "📅" },
  { path: "/settings", label: "Thêm", icon: "⚙️" },
];

function BottomNav() {
  const location = useLocation();

  return (
    <nav className="mobile-bottom-panel" aria-label="Điều hướng chính di động">
      {bottomNavItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.tabItem,
              ...(isActive ? styles.tabItemActive : {}),
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

const styles = {
  tabItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#64748b",
    flex: 1,
    height: "100%",
    padding: "4px 0",
    transition: "color 0.15s ease",
  },
  tabItemActive: {
    color: "var(--primary)",
    fontWeight: "700",
  },
  icon: {
    fontSize: "19px",
    lineHeight: "1.1",
  },
  label: {
    fontSize: "11px",
    marginTop: "2px",
    fontWeight: "600",
  },
};

export default BottomNav;
