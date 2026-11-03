import React, { useState, useEffect, useMemo } from "react";
import { useStudent } from "../context/StudentContext";
import courses from "../data/courses";

const COLOR_PRESETS = [
  { name: "Xanh dương", code: "#0984e3" },
  { name: "Xanh lục", code: "#00b894" },
  { name: "Tím", code: "#6c5ce7" },
  { name: "Cam đậm", code: "#e17055" },
  { name: "Hổ phách", code: "#f39c12" },
  { name: "Đỏ hồng", code: "#e84393" },
  { name: "Teal", code: "#00cec9" },
  { name: "Chàm", code: "#2d3436" },
];

const PERIOD_TIMES = {
  1: { start: "07:30", end: "08:15" },
  2: { start: "08:20", end: "09:05" },
  3: { start: "09:10", end: "09:55" },
  4: { start: "10:05", end: "10:50" },
  5: { start: "10:55", end: "11:40" },
  6: { start: "11:45", end: "12:30" },
  7: { start: "13:30", end: "14:15" },
  8: { start: "14:20", end: "15:05" },
  9: { start: "15:10", end: "15:55" },
  10: { start: "16:05", end: "16:50" },
  11: { start: "16:55", end: "17:40" },
};

function calculateTimeRange(start, count) {
  const s = parseInt(start, 10);
  const c = parseInt(count, 10);
  const endPeriod = Math.min(11, Math.max(1, s + c - 1));
  const startTime = PERIOD_TIMES[s]?.start || "07:30";
  const endTime = PERIOD_TIMES[endPeriod]?.end || "11:00";
  return `${startTime} - ${endTime}`;
}

const DAYS_OF_WEEK = [
  { value: 2, label: "Thứ 2" },
  { value: 3, label: "Thứ 3" },
  { value: 4, label: "Thứ 4" },
  { value: 5, label: "Thứ 5" },
  { value: 6, label: "Thứ 6" },
  { value: 7, label: "Thứ 7" },
  { value: 8, label: "Chủ nhật" },
];

function ManualScheduleCard({ isOpen, onClose, editingItem }) {
  const { schedule, addScheduleItem, updateScheduleItem } = useStudent();

  const [courseSearch, setCourseSearch] = useState("");
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    classCode: "",
    type: "LT",
    dayOfWeek: 2,
    periodStart: 1,
    periodCount: 3,
    room: "",
    building: "Tòa C",
    campus: "CS1 - 227 Nguyễn Văn Cừ",
    teacher: "",
    color: "#0984e3",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // Khi mở form hoặc đổi editingItem
  useEffect(() => {
    if (editingItem) {
      setFormData({
        courseId: editingItem.courseId || "",
        courseName: editingItem.courseName || "",
        classCode: editingItem.classCode || "",
        type: editingItem.type || "LT",
        dayOfWeek: editingItem.dayOfWeek || 2,
        periodStart: editingItem.periodStart || 1,
        periodCount: editingItem.periodCount || 3,
        room: editingItem.room || "",
        building: editingItem.building || "Tòa C",
        campus: editingItem.campus || "CS1 - 227 Nguyễn Văn Cừ",
        teacher: editingItem.teacher || "",
        color: editingItem.color || "#0984e3",
      });
      setCourseSearch(editingItem.courseName || "");
    } else {
      setFormData({
        courseId: "",
        courseName: "",
        classCode: "",
        type: "LT",
        dayOfWeek: 2,
        periodStart: 1,
        periodCount: 3,
        room: "",
        building: "Tòa C",
        campus: "CS1 - 227 Nguyễn Văn Cừ",
        teacher: "",
        color: COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)].code,
      });
      setCourseSearch("");
    }
    setErrorMsg("");
    setSuccessToast("");
  }, [editingItem, isOpen]);

  // Gợi ý danh sách môn từ kho courses
  const filteredCourses = useMemo(() => {
    if (!courseSearch.trim() || courseSearch.length < 2) return [];
    const q = courseSearch.toLowerCase();
    return courses.filter(
      (c) =>
        c.course_id.toLowerCase().includes(q) ||
        c.course_name_vi.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [courseSearch]);

  // Khi người dùng chọn 1 môn gợi ý từ kho
  const handleSelectCourse = (c) => {
    setFormData((prev) => ({
      ...prev,
      courseId: c.course_id,
      courseName: c.course_name_vi,
      classCode: `${c.course_id}_${prev.type}`,
    }));
    setCourseSearch(c.course_name_vi);
  };

  // Tự động nhận diện Tòa nhà từ ký tự đầu của Tên phòng (ví dụ C32 -> Tòa C, F204 -> Tòa F)
  const handleRoomChange = (roomVal) => {
    const cleanRoom = roomVal.trim().toUpperCase();
    let detectedBuilding = formData.building;
    if (cleanRoom.length > 0) {
      const firstChar = cleanRoom.charAt(0);
      if (["A", "B", "C", "D", "E", "F", "G", "H", "I"].includes(firstChar)) {
        detectedBuilding = `Tòa ${firstChar}`;
      } else if (cleanRoom.startsWith("LAB")) {
        detectedBuilding = "Phòng Lab";
      }
    }
    setFormData((prev) => ({
      ...prev,
      room: roomVal,
      building: detectedBuilding,
    }));
  };

  // Tính giờ học hiển thị
  const calculatedTime = useMemo(() => {
    return calculateTimeRange(formData.periodStart, formData.periodCount);
  }, [formData.periodStart, formData.periodCount]);

  // Nhãn thứ trong tuần
  const currentDayLabel = useMemo(() => {
    const d = DAYS_OF_WEEK.find((item) => item.value === Number(formData.dayOfWeek));
    return d ? d.label : `Thứ ${formData.dayOfWeek}`;
  }, [formData.dayOfWeek]);

  // Kiểm tra trùng lịch với môn khác
  const conflictingCourse = useMemo(() => {
    const curStart = Number(formData.periodStart);
    const curEnd = curStart + Number(formData.periodCount) - 1;
    const curDay = Number(formData.dayOfWeek);

    return schedule.find((s) => {
      if (editingItem && s.id === editingItem.id) return false;
      if (s.dayOfWeek !== curDay) return false;

      const sStart = Number(s.periodStart);
      const sEnd = sStart + Number(s.periodCount) - 1;

      // Trùng nếu đoạn [curStart, curEnd] giao với [sStart, sEnd]
      return Math.max(curStart, sStart) <= Math.min(curEnd, sEnd);
    });
  }, [formData.dayOfWeek, formData.periodStart, formData.periodCount, schedule, editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courseName.trim()) {
      setErrorMsg("Vui lòng nhập Tên môn học hoặc chọn từ danh mục.");
      return;
    }
    if (!formData.room.trim()) {
      setErrorMsg("Vui lòng nhập Phòng học (ví dụ: C32, F204, Lab 3).");
      return;
    }

    const payload = {
      courseId: formData.courseId.trim().toUpperCase() || "HCMUS_HP",
      courseName: formData.courseName.trim(),
      classCode: formData.classCode.trim().toUpperCase() || `${formData.courseId || "HP"}_${formData.type}`,
      type: formData.type,
      dayOfWeek: Number(formData.dayOfWeek),
      dayLabel: currentDayLabel,
      periodStart: Number(formData.periodStart),
      periodCount: Number(formData.periodCount),
      time: calculatedTime,
      room: formData.room.trim().toUpperCase(),
      building: formData.building,
      campus: formData.campus,
      teacher: formData.teacher.trim() || "Chưa phân công",
      color: formData.color,
    };

    if (editingItem) {
      updateScheduleItem(editingItem.id, payload);
      setSuccessToast(`Đã cập nhật môn "${payload.courseName}" thành công!`);
    } else {
      addScheduleItem(payload);
      setSuccessToast(`Đã thêm môn "${payload.courseName}" vào Thời khóa biểu!`);
    }

    setTimeout(() => {
      setSuccessToast("");
      if (onClose) onClose();
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="card" style={styles.cardContainer}>
      {/* Tiêu đề Thẻ nhập môn */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>📝</span>
          <div>
            <h3 style={{ fontSize: "17px", color: "var(--primary)", margin: 0, fontWeight: "700" }}>
              {editingItem ? "Chỉnh sửa Môn học trong TKB" : "Thẻ Nhập Môn Học Thủ Công (Vào TKB)"}
            </h3>
            <p style={{ fontSize: "12px", color: "var(--text-light)", margin: "2px 0 0 0" }}>
              Điền thông tin học phần, thứ, tiết và phòng học để hiển thị lên Thời khóa biểu tuần
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline"
            style={{ padding: "4px 10px", fontSize: "12px" }}
          >
            ✕ Đóng lại
          </button>
        )}
      </div>

      {/* Thông báo thành công */}
      {successToast && (
        <div style={styles.successToast}>
          ✅ {successToast}
        </div>
      )}

      {/* Thông báo lỗi */}
      {errorMsg && (
        <div style={styles.errorAlert}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Cảnh báo trùng lịch học nếu có */}
      {conflictingCourse && (
        <div style={styles.conflictAlert}>
          <span style={{ fontSize: "18px" }}>⚠️</span>
          <div>
            <strong>Cảnh báo trùng lịch học:</strong> Trùng với môn <strong>{conflictingCourse.courseName}</strong> (Tiết {conflictingCourse.periodStart} - {conflictingCourse.periodStart + conflictingCourse.periodCount - 1}, Phòng {conflictingCourse.room}). Bạn vẫn có thể lưu nếu là môn học bù.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Hàng 1: Tìm kiếm & Tên môn học */}
        <div className="grid grid-2">
          {/* Nhập / Tìm tên môn */}
          <div style={{ position: "relative" }}>
            <label style={styles.label}>
              Tên môn học <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="Ví dụ: Cơ sở dữ liệu nâng cao..."
              value={courseSearch}
              onChange={(e) => {
                setCourseSearch(e.target.value);
                setFormData((prev) => ({ ...prev, courseName: e.target.value }));
              }}
              required
            />
            {/* Gợi ý autocomplete từ kho courses */}
            {filteredCourses.length > 0 && (
              <div style={styles.autocompleteBox}>
                <div style={{ padding: "4px 8px", fontSize: "11px", color: "#718096", backgroundColor: "#f8fafc" }}>
                  💡 Gợi ý môn học HCMUS:
                </div>
                {filteredCourses.map((c) => (
                  <div
                    key={c.course_id}
                    style={styles.suggestionItem}
                    onClick={() => handleSelectCourse(c)}
                  >
                    <strong>{c.course_name_vi}</strong>
                    <span style={{ fontSize: "11px", color: "var(--primary)", marginLeft: "8px" }}>
                      ({c.course_id} - {c.credits} TC)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mã môn học */}
          <div>
            <label style={styles.label}>
              Mã học phần (Mã môn)
            </label>
            <input
              type="text"
              className="input"
              placeholder="Ví dụ: CSC12002, MTH00021..."
              value={formData.courseId}
              onChange={(e) => setFormData((prev) => ({ ...prev, courseId: e.target.value.toUpperCase() }))}
            />
          </div>
        </div>

        {/* Hàng 2: Mã lớp học phần & Loại học phần */}
        <div className="grid grid-2">
          <div>
            <label style={styles.label}>Mã lớp học phần</label>
            <input
              type="text"
              className="input"
              placeholder="Ví dụ: 22CTT1_ADB_LT, 22_1_CSC1001..."
              value={formData.classCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, classCode: e.target.value }))}
            />
          </div>

          <div>
            <label style={styles.label}>Loại học phần</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value="LT"
                  checked={formData.type === "LT"}
                  onChange={() => setFormData((prev) => ({ ...prev, type: "LT" }))}
                />
                📖 Lý thuyết (LT)
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value="TH"
                  checked={formData.type === "TH"}
                  onChange={() => setFormData((prev) => ({ ...prev, type: "TH" }))}
                />
                💻 Thực hành / Bài tập (TH)
              </label>
            </div>
          </div>
        </div>

        {/* Hàng 3: Thứ, Tiết bắt đầu & Số tiết học */}
        <div className="grid grid-3">
          <div>
            <label style={styles.label}>Thứ trong tuần</label>
            <select
              className="input"
              value={formData.dayOfWeek}
              onChange={(e) => setFormData((prev) => ({ ...prev, dayOfWeek: Number(e.target.value) }))}
            >
              {DAYS_OF_WEEK.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label}>Tiết bắt đầu</label>
            <select
              className="input"
              value={formData.periodStart}
              onChange={(e) => setFormData((prev) => ({ ...prev, periodStart: Number(e.target.value) }))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((p) => (
                <option key={p} value={p}>
                  Tiết {p} ({PERIOD_TIMES[p]?.start || ""})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label}>Thời lượng (Số tiết)</label>
            <select
              className="input"
              value={formData.periodCount}
              onChange={(e) => setFormData((prev) => ({ ...prev, periodCount: Number(e.target.value) }))}
            >
              {[1, 2, 3, 4, 5].map((c) => (
                <option key={c} value={c}>
                  {c} tiết ({calculatedTime})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hàng 4: Phòng học, Cơ sở & Giảng viên */}
        <div className="grid grid-3">
          <div>
            <label style={styles.label}>
              Phòng học <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="Ví dụ: C32, F204, Lab 5..."
              value={formData.room}
              onChange={(e) => handleRoomChange(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={styles.label}>Tòa nhà / Cơ sở</label>
            <select
              className="input"
              value={formData.campus}
              onChange={(e) => setFormData((prev) => ({ ...prev, campus: e.target.value }))}
            >
              <option value="CS1 - 227 Nguyễn Văn Cừ">CS1 - 227 Nguyễn Văn Cừ</option>
              <option value="CS2 - Linh Trung, Thủ Đức">CS2 - Linh Trung, Thủ Đức</option>
            </select>
          </div>

          <div>
            <label style={styles.label}>Giảng viên phụ trách</label>
            <input
              type="text"
              className="input"
              placeholder="Ví dụ: TS. Nguyễn Văn A..."
              value={formData.teacher}
              onChange={(e) => setFormData((prev) => ({ ...prev, teacher: e.target.value }))}
            />
          </div>
        </div>

        {/* Hàng 5: Chọn màu hiển thị & Xem trước Card */}
        <div>
          <label style={styles.label}>Màu sắc phân biệt trên lưới TKB</label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginTop: "6px" }}>
            {COLOR_PRESETS.map((col) => (
              <button
                key={col.code}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, color: col.code }))}
                style={{
                  ...styles.colorDot,
                  backgroundColor: col.code,
                  outline: formData.color === col.code ? "3px solid #1a202c" : "none",
                  transform: formData.color === col.code ? "scale(1.15)" : "scale(1)",
                }}
                title={col.name}
              />
            ))}

            {/* Thẻ xem trước mini */}
            <div
              style={{
                marginLeft: "auto",
                padding: "6px 14px",
                borderRadius: "6px",
                borderLeft: `5px solid ${formData.color}`,
                backgroundColor: "#f8fafc",
                fontSize: "12px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span>Xem trước:</span>
              <strong style={{ color: formData.color }}>
                {formData.courseName || "Tên môn học"}
              </strong>
              <span>({currentDayLabel}, Tiết {formData.periodStart}-{Number(formData.periodStart) + Number(formData.periodCount) - 1})</span>
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div style={styles.actionRow}>
          <button type="submit" className="btn btn-primary" style={{ padding: "9px 22px", fontSize: "14px" }}>
            💾 {editingItem ? "Lưu thay đổi" : "Lưu vào Thời khóa biểu"}
          </button>
          {onClose && (
            <button type="button" className="btn btn-outline" onClick={onClose} style={{ padding: "9px 18px", fontSize: "14px" }}>
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  cardContainer: {
    backgroundColor: "#ffffff",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "1px solid #f1f2f6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  label: {
    display: "block",
    fontSize: "12.5px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "5px",
  },
  radioLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#4a5568",
    cursor: "pointer",
  },
  autocompleteBox: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    border: "1.5px solid #cbd5e0",
    borderRadius: "8px",
    marginTop: "4px",
    maxHeight: "180px",
    overflowY: "auto",
    zIndex: 50,
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)",
  },
  suggestionItem: {
    padding: "8px 12px",
    fontSize: "13px",
    cursor: "pointer",
    borderBottom: "1px solid #f1f2f6",
    transition: "background-color 0.15s ease",
  },
  colorDot: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    border: "2px solid #ffffff",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
    transition: "all 0.15s ease",
  },
  actionRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "8px",
    paddingTop: "12px",
    borderTop: "1px solid #f1f2f6",
  },
  successToast: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  errorAlert: {
    backgroundColor: "#fde8e8",
    color: "#9b1c1c",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  conflictAlert: {
    backgroundColor: "#fffaf0",
    color: "#975a16",
    border: "1.5px solid #fbd38d",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "12.5px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "12px",
  },
};

export default ManualScheduleCard;
