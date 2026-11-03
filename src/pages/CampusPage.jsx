import React, { useState } from "react";
import { campusData } from "../data/campusData";

function CampusPage() {
  const [activeTab, setActiveTab] = useState("map"); // map | academic-calendar | directory
  const [selectedCampusId, setSelectedCampusId] = useState("cs1");
  const [selectedBuildingId, setSelectedBuildingId] = useState("A");

  const currentCampus = campusData.campuses.find((c) => c.id === selectedCampusId) || campusData.campuses[0];
  const currentBuilding = currentCampus.buildings.find((b) => b.id === selectedBuildingId) || currentCampus.buildings[0];

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 className="section-title">🏫 Thông tin trường & Tiện ích sinh viên HCMUS</h1>
          <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
            Bản đồ khuôn viên, sơ đồ phòng học các tòa nhà, kế hoạch năm học và danh bạ liên hệ các phòng ban chức năng.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {[
          { id: "map", label: "Bản đồ khuôn viên & Phòng học", icon: "🗺️" },
          { id: "academic-calendar", label: "Kế hoạch năm học", icon: "📅" },
          { id: "directory", label: "Danh bạ đơn vị & Liên hệ", icon: "📞" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tabBtn,
              ...(activeTab === tab.id ? styles.tabBtnActive : {}),
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: BẢN ĐỒ KHUÔN VIÊN & PHÒNG HỌC */}
      {activeTab === "map" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Chọn Cơ sở */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {campusData.campuses.map((c) => (
              <button
                key={c.id}
                className={`btn ${selectedCampusId === c.id ? "btn-primary" : "btn-outline"}`}
                onClick={() => {
                  setSelectedCampusId(c.id);
                  setSelectedBuildingId(c.buildings[0]?.id || "A");
                }}
                style={{ padding: "10px 18px" }}
              >
                📍 {c.name}
              </button>
            ))}
          </div>

          <div className="card" style={{ padding: "16px", backgroundColor: "#eef5fc" }}>
            <strong>Địa chỉ:</strong> {currentCampus.address}
            <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "2px" }}>
              {currentCampus.description}
            </div>
          </div>

          {/* Chọn Tòa nhà */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {currentCampus.buildings.map((b) => (
              <button
                key={b.id}
                className={`btn ${selectedBuildingId === b.id ? "btn-accent" : "btn-outline"}`}
                onClick={() => setSelectedBuildingId(b.id)}
                style={{ padding: "8px 16px", fontSize: "13px" }}
              >
                🏢 {b.name}
              </button>
            ))}
          </div>

          {/* Sơ đồ các tầng của tòa nhà được chọn */}
          <div className="card" style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "16px", borderBottom: "1px solid #edf2f7", paddingBottom: "10px" }}>
              Sơ đồ chi tiết: {currentBuilding.name}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {currentBuilding.floors.map((fl, fIdx) => (
                <div key={fIdx} style={styles.floorCard}>
                  <div style={styles.floorBadge}>{fl.floor}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {fl.rooms.map((room, rIdx) => (
                        <div key={rIdx} style={styles.roomChip}>
                          🚪 {room}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KẾ HOẠCH NĂM HỌC */}
      {activeTab === "academic-calendar" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {campusData.academicCalendar.map((sem, sIdx) => (
            <div key={sIdx} className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "2px solid var(--primary)", paddingBottom: "8px" }}>
                <h2 style={{ fontSize: "18px", color: "var(--primary)" }}>{sem.semester}</h2>
                <span className="badge badge-primary">{sem.period}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {sem.events.map((ev, eIdx) => {
                  const typeColors = {
                    START: "#27ae60",
                    TUITION: "#e67e22",
                    EXAM: "#e74c3c",
                    REGISTRATION: "#2980b9",
                    BREAK: "#8e44ad",
                  };
                  return (
                    <div key={eIdx} style={{ ...styles.calendarEvent, borderLeft: `4px solid ${typeColors[ev.type] || "var(--primary)"}` }}>
                      <div style={{ minWidth: "150px", fontWeight: "700", color: "#2d3748", fontSize: "13px" }}>
                        🗓️ {ev.date}
                      </div>
                      <div style={{ flex: 1, fontSize: "14px", fontWeight: "600", color: "#1a202c" }}>
                        {ev.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DANH BẠ ĐƠN VỊ & LIÊN HỆ */}
      {activeTab === "directory" && (
        <div className="grid grid-2">
          {campusData.directory.map((dir) => (
            <div key={dir.id} className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: "17px", color: "var(--primary)" }}>{dir.name}</h3>
                  <div style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}>
                    📍 {dir.location}
                  </div>
                </div>
                <span className="badge badge-info">{dir.shortName}</span>
              </div>

              <div style={{ fontSize: "13px", color: "#4a5568", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div>📞 <strong>Điện thoại:</strong> {dir.phone}</div>
                <div>✉️ <strong>Email:</strong> <a href={`mailto:${dir.email}`}>{dir.email}</a></div>
                <div>🕒 <strong>Giờ làm việc:</strong> {dir.workHours}</div>
                {dir.website && (
                  <div>🌐 <strong>Website:</strong> <a href={dir.website} target="_blank" rel="noreferrer">{dir.website}</a></div>
                )}
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "10px 12px", borderRadius: "6px", border: "1px solid #edf2f7" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#a0aec0", marginBottom: "4px" }}>
                  Chức năng tiếp sinh viên chính:
                </div>
                <ul style={{ paddingLeft: "16px", fontSize: "12px", color: "#4a5568", margin: 0 }}>
                  {dir.duties.map((duty, dIdx) => (
                    <li key={dIdx} style={{ marginBottom: "2px" }}>{duty}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: "16px",
  },
  tabBar: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "8px",
    overflowX: "auto",
  },
  tabBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#4a5568",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
  },
  tabBtnActive: {
    backgroundColor: "var(--primary)",
    color: "#ffffff",
  },
  floorCard: {
    display: "flex",
    gap: "16px",
    padding: "12px 14px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    alignItems: "center",
  },
  floorBadge: {
    minWidth: "75px",
    padding: "6px 10px",
    backgroundColor: "var(--primary)",
    color: "#ffffff",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "12px",
    textAlign: "center",
  },
  roomChip: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#2d3748",
  },
  calendarEvent: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    border: "1px solid #edf2f7",
  },
};

export default CampusPage;
