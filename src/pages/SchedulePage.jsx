import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext";
import ManualScheduleCard from "../components/ManualScheduleCard";

function SchedulePage() {
  const { student, schedule, deleteScheduleItem } = useStudent();
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [filterShift, setFilterShift] = useState("ALL"); // ALL | MORNING | AFTERNOON
  const [showManualForm, setShowManualForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Tự động mở thẻ nhập môn nếu URL có param ?action=add
  useEffect(() => {
    if (searchParams.get("action") === "add") {
      setShowManualForm(true);
      setEditingItem(null);
    }
  }, [searchParams]);

  // Ngày trong tuần (Thứ 2 đến Thứ 7, Chủ nhật)
  const days = [
    { dayOfWeek: 2, label: "Thứ 2" },
    { dayOfWeek: 3, label: "Thứ 3" },
    { dayOfWeek: 4, label: "Thứ 4" },
    { dayOfWeek: 5, label: "Thứ 5" },
    { dayOfWeek: 6, label: "Thứ 6" },
    { dayOfWeek: 7, label: "Thứ 7" },
  ];

  // Các tiết học trong ngày: Tiết 1 đến Tiết 11
  const periods = [
    { p: 1, time: "07:30 - 08:15", shift: "MORNING" },
    { p: 2, time: "08:20 - 09:05", shift: "MORNING" },
    { p: 3, time: "09:10 - 09:55", shift: "MORNING" },
    { p: 4, time: "10:05 - 10:50", shift: "MORNING" },
    { p: 5, time: "10:55 - 11:40", shift: "MORNING" },
    { p: 6, time: "11:45 - 12:30", shift: "MORNING" },
    { p: 7, time: "13:30 - 14:15", shift: "AFTERNOON" },
    { p: 8, time: "14:20 - 15:05", shift: "AFTERNOON" },
    { p: 9, time: "15:10 - 15:55", shift: "AFTERNOON" },
    { p: 10, time: "16:05 - 16:50", shift: "AFTERNOON" },
    { p: 11, time: "16:55 - 17:40", shift: "AFTERNOON" },
  ];

  const visiblePeriods = useMemo(() => {
    if (filterShift === "MORNING") return periods.filter((p) => p.shift === "MORNING");
    if (filterShift === "AFTERNOON") return periods.filter((p) => p.shift === "AFTERNOON");
    return periods;
  }, [filterShift]);

  // Tổng số tiết trong tuần
  const totalPeriodsPerWeek = useMemo(() => {
    return schedule.reduce((sum, item) => sum + (Number(item.periodCount) || 0), 0);
  }, [schedule]);

  // Mở form chỉnh sửa môn
  const handleEditCourse = (item) => {
    setEditingItem(item);
    setShowManualForm(true);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Xóa môn khỏi TKB
  const handleDeleteCourse = (id, courseName) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa môn "${courseName}" khỏi Thời khóa biểu?`)) {
      deleteScheduleItem(id);
    }
  };

  // Đóng thẻ nhập môn
  const handleCloseForm = () => {
    setShowManualForm(false);
    setEditingItem(null);
    if (searchParams.get("action")) {
      searchParams.delete("action");
      setSearchParams(searchParams);
    }
  };

  // Xuất file lịch iCalendar (.ics)
  const handleExportICS = () => {
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//HCMUS Portal//Visual Schedule//VI",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:Thoi khoa bieu - ${student.name}`,
      "X-WR-TIMEZONE:Asia/Ho_Chi_Minh",
    ];

    schedule.forEach((s) => {
      icsContent.push(
        "BEGIN:VEVENT",
        `SUMMARY:${s.courseName}`,
        `DESCRIPTION:Lớp ${s.classCode} - GV: ${s.teacher}`,
        `LOCATION:${s.room} (${s.building}, ${s.campus})`,
        "STATUS:CONFIRMED",
        "END:VEVENT"
      );
    });

    icsContent.push("END:VCALENDAR");

    const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TKB_HCMUS_${student.studentId || "student"}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportImage = () => {
    alert("Đang chuẩn bị ảnh thời khóa biểu độ phân giải cao để lưu về máy...");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* 1. Header & Thao tác chính */}
      <div style={styles.header}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1 className="section-title" style={{ margin: 0 }}>📅 Thời khóa biểu Tuần</h1>
            <span className="badge badge-primary">{student.currentSemesterName || "HK1 - 2024-2025"}</span>
            <span className="badge badge-info">{schedule.length} môn học</span>
            <span className="badge badge-warning">{totalPeriodsPerWeek} tiết/tuần</span>
          </div>
          <p style={{ color: "var(--text-light)", fontSize: "13.5px", marginTop: "4px" }}>
            Xem lịch học theo tuần, kiểm tra phòng học, hoặc tự do nhập thêm môn học thủ công vào TKB.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {/* NÚT NHẬP MÔN THỦ CÔNG */}
          <button
            className="btn btn-accent"
            onClick={() => {
              setEditingItem(null);
              setShowManualForm(!showManualForm);
            }}
            style={{ fontWeight: "700", boxShadow: "0 2px 8px rgba(243, 156, 18, 0.3)" }}
          >
            {showManualForm && !editingItem ? "✕ Đóng thẻ nhập" : "➕ Thêm môn vào TKB"}
          </button>

          <button className="btn btn-outline" onClick={handleExportICS} title="Xuất file iCal để đồng bộ vào Google Calendar / Apple Calendar">
            📥 Xuất .ics
          </button>
          <button className="btn btn-primary" onClick={handleExportImage}>
            🖼️ Xuất ảnh
          </button>
        </div>
      </div>

      {/* 2. THẺ NHẬP MÔN HỌC THỦ CÔNG (Hiển thị khi người dùng bấm Thêm / Sửa) */}
      {showManualForm && (
        <ManualScheduleCard
          isOpen={true}
          onClose={handleCloseForm}
          editingItem={editingItem}
        />
      )}

      {/* 3. Thanh công cụ lọc & Chuyển chế độ xem */}
      <div className="card" style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        {/* Lọc buổi học */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { id: "ALL", label: "Cả ngày (Tiết 1-11)" },
            { id: "MORNING", label: "Sáng (Tiết 1-6)" },
            { id: "AFTERNOON", label: "Chiều (Tiết 7-11)" },
          ].map((f) => (
            <button
              key={f.id}
              className={`btn ${filterShift === f.id ? "btn-primary" : "btn-outline"}`}
              onClick={() => setFilterShift(f.id)}
              style={{ padding: "5px 12px", fontSize: "12.5px" }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Chuyển dạng xem Lưới / Danh sách */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className={`btn ${viewMode === "grid" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setViewMode("grid")}
            style={{ padding: "5px 12px", fontSize: "12.5px" }}
          >
            📊 Dạng lưới (Tuần)
          </button>
          <button
            className={`btn ${viewMode === "list" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setViewMode("list")}
            style={{ padding: "5px 12px", fontSize: "12.5px" }}
          >
            📋 Dạng danh sách ({schedule.length})
          </button>
        </div>
      </div>

      {/* 4. Trường hợp chưa có môn nào */}
      {schedule.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <span style={{ fontSize: "44px" }}>📅</span>
          <h3 style={{ color: "var(--primary)", marginTop: "12px", fontSize: "18px" }}>
            Thời khóa biểu hiện đang trống
          </h3>
          <p style={{ color: "var(--text-light)", fontSize: "13.5px", maxWidth: "480px", margin: "6px auto 16px auto" }}>
            Bạn chưa có học phần nào trong thời khóa biểu tuần này. Hãy bấm nút bên dưới để nhập môn học thủ công đầu tiên!
          </p>
          <button
            className="btn btn-accent"
            onClick={() => {
              setEditingItem(null);
              setShowManualForm(true);
            }}
            style={{ padding: "10px 20px", fontSize: "14px" }}
          >
            ➕ Nhập môn học thủ công ngay
          </button>
        </div>
      )}

      {/* 5. CHẾ ĐỘ 1: DẠNG LƯỚI THỜI KHÓA BIỂU */}
      {viewMode === "grid" && schedule.length > 0 && (
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "820px" }}>
            <thead>
              <tr>
                <th style={{ width: "95px", textAlign: "center", backgroundColor: "#003366" }}>Tiết học</th>
                {days.map((d) => (
                  <th key={d.dayOfWeek} style={{ textAlign: "center", width: "15%", backgroundColor: "#004A98" }}>
                    {d.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visiblePeriods.map((period) => (
                <tr key={period.p} style={{ height: "56px" }}>
                  <td style={styles.periodCell}>
                    <div style={{ fontWeight: "700", color: "var(--primary)" }}>Tiết {period.p}</div>
                    <div style={{ fontSize: "10.5px", color: "#747d8c" }}>{period.time}</div>
                  </td>
                  {days.map((d) => {
                    // Tìm môn học bắt đầu từ tiết này vào thứ này
                    const item = schedule.find(
                      (s) => s.dayOfWeek === d.dayOfWeek && s.periodStart === period.p
                    );

                    // Kiểm tra xem tiết này có nằm trong thời lượng môn đang diễn ra không
                    const isInside = schedule.find(
                      (s) =>
                        s.dayOfWeek === d.dayOfWeek &&
                        period.p > s.periodStart &&
                        period.p < s.periodStart + s.periodCount
                    );

                    if (isInside) {
                      return null; // Ô đã được gộp rowSpan
                    }

                    if (item) {
                      return (
                        <td
                          key={d.dayOfWeek}
                          rowSpan={item.periodCount}
                          style={{
                            ...styles.courseCell,
                            borderLeft: `5px solid ${item.color || "var(--primary)"}`,
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "4px" }}>
                            <span style={{ fontWeight: "700", fontSize: "12.5px", color: "#1a202c", lineHeight: "1.3" }}>
                              {item.courseName}
                            </span>
                            <span
                              className="badge"
                              style={{
                                backgroundColor: item.type === "LT" ? "#ebf8ff" : "#f0fff4",
                                color: item.type === "LT" ? "#2b6cb0" : "#276749",
                                fontSize: "10px",
                                padding: "2px 5px",
                                flexShrink: 0,
                              }}
                            >
                              {item.type}
                            </span>
                          </div>

                          <div style={{ fontSize: "11.5px", color: "#2d3748", marginTop: "4px" }}>
                            🏫 Phòng: <strong>{item.room}</strong>
                            <span style={{ fontSize: "10.5px", color: "#718096", marginLeft: "4px" }}>({item.building})</span>
                          </div>

                          <div style={{ fontSize: "10.5px", color: "#718096", marginTop: "2px" }}>
                            👤 {item.teacher || "Chưa phân công"}
                          </div>

                          <div style={{ display: "flex", gap: "6px", marginTop: "6px", borderTop: "1px dashed #e2e8f0", paddingTop: "4px" }}>
                            <button
                              onClick={() => handleEditCourse(item)}
                              style={styles.miniActionBtn}
                              title="Chỉnh sửa môn học"
                            >
                              ✏️ Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(item.id, item.courseName)}
                              style={{ ...styles.miniActionBtn, color: "var(--danger)" }}
                              title="Xóa môn khỏi TKB"
                            >
                              🗑️ Xóa
                            </button>
                          </div>
                        </td>
                      );
                    }

                    return <td key={d.dayOfWeek} style={styles.emptyCell} />;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. CHẾ ĐỘ 2: DẠNG DANH SÁCH MÔN HỌC */}
      {viewMode === "list" && schedule.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {schedule.map((s) => (
            <div key={s.id} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <div style={{ ...styles.listDayBadge, backgroundColor: s.color || "#0984e3" }}>
                <div style={{ fontSize: "14px", fontWeight: "800" }}>{s.dayLabel}</div>
                <div style={{ fontSize: "10.5px", opacity: 0.9 }}>{s.time}</div>
                <div style={{ fontSize: "10px", marginTop: "2px" }}>
                  Tiết {s.periodStart} - {Number(s.periodStart) + Number(s.periodCount) - 1}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: "220px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <code style={{ fontWeight: "700", color: "var(--primary)" }}>{s.courseId}</code>
                  <span className="badge badge-info">{s.type === "LT" ? "Lý thuyết" : "Thực hành"}</span>
                  <span style={{ fontSize: "12px", color: "#718096" }}>Mã lớp: {s.classCode}</span>
                </div>
                <h3 style={{ fontSize: "15px", marginTop: "4px", color: "#2d3748", fontWeight: "700" }}>
                  {s.courseName}
                </h3>
                <div style={{ fontSize: "12.5px", color: "#718096", marginTop: "4px" }}>
                  🏫 Phòng: <strong style={{ color: "#2d3748" }}>{s.room}</strong> ({s.building}) — 📍 {s.campus} — 👤 Giảng viên: <strong>{s.teacher}</strong>
                </div>
              </div>

              {/* Nút hành động */}
              <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
                <button
                  className="btn btn-outline"
                  onClick={() => handleEditCourse(s)}
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleDeleteCourse(s.id, s.courseName)}
                  style={{ padding: "6px 12px", fontSize: "12px", color: "var(--danger)", borderColor: "var(--danger)" }}
                >
                  🗑️ Xóa
                </button>
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "12px",
  },
  periodCell: {
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    borderRight: "1px solid #dfe4ea",
    borderBottom: "1px solid #dfe4ea",
    padding: "6px 4px",
    width: "95px",
  },
  emptyCell: {
    borderRight: "1px solid #f1f2f6",
    borderBottom: "1px solid #f1f2f6",
    backgroundColor: "#ffffff",
  },
  courseCell: {
    backgroundColor: "#f7fafc",
    borderRight: "1px solid #dfe4ea",
    borderBottom: "1px solid #dfe4ea",
    padding: "8px 10px",
    verticalAlign: "top",
    borderRadius: "4px",
    transition: "background-color 0.15s ease",
  },
  miniActionBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "11px",
    color: "var(--primary)",
    padding: "2px 4px",
    borderRadius: "4px",
    fontWeight: "600",
  },
  listDayBadge: {
    minWidth: "95px",
    padding: "10px 8px",
    borderRadius: "8px",
    color: "#ffffff",
    textAlign: "center",
    flexShrink: 0,
  },
};

export default SchedulePage;
