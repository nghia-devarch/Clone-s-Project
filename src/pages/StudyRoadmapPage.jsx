import React, { useState, useMemo } from "react";
import { useStudent } from "../context/StudentContext";
import courses from "../data/courses";
import { getCourseName, getCourseById, getPrerequisites } from "../utils/courseHelpers";

function StudyRoadmapPage() {
  const { student, basket, toggleBasketItem, studyPlan } = useStudent();
  const [activeTab, setActiveTab] = useState("program"); // program | study-plan | selection | calendar
  const [searchTerm, setSearchTerm] = useState("");

  // Map trạng thái môn học của sinh viên
  const studentCourseStatusMap = useMemo(() => {
    const map = new Map();
    (student.grades || []).forEach((g) => {
      const code = g.id || g.code;
      if (g.status === "PASSED" || g.status === "EXEMPT_GPA") {
        map.set(code, "PASSED");
      } else if (g.status === "IN_PROGRESS") {
        map.set(code, "IN_PROGRESS");
      } else if (g.status === "FAILED") {
        map.set(code, "FAILED");
      }
    });
    return map;
  }, [student.grades]);

  // Các môn trong giỏ chọn
  const basketCourses = useMemo(() => {
    return basket.map((id) => getCourseById(id) || { course_id: id, course_name_vi: getCourseName(id), credits: 4 });
  }, [basket]);

  const totalBasketCredits = basketCourses.reduce((sum, c) => sum + (c.credits || 0), 0);
  const estimatedBasketTuition = totalBasketCredits * 780000;

  // Thuật toán kiểm tra xung đột thời gian lịch học giả định cho các môn trong giỏ
  const scheduleConflicts = useMemo(() => {
    const conflicts = [];
    // Mô phỏng kiểm tra xung đột
    if (basket.includes("CSC10107") && basket.includes("CSC11003")) {
      conflicts.push({
        course1: "CSC10107 (Thực tập thực tế)",
        course2: "CSC11003 (Lập trình mạng)",
        day: "Thứ 4",
        period: "Tiết 7-9 (13:30 - 16:15)",
        reason: "Trùng ca học chiều Thứ 4",
      });
    }
    return conflicts;
  }, [basket]);

  return (
    <div>
      {/* Tiêu đề & Giỏ chọn môn */}
      <div style={styles.header}>
        <div>
          <h1 className="section-title">🗺️ Lộ trình học tập & Xếp lịch HCMUS</h1>
          <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
            Ngành: <strong>{student.major}</strong> ({student.faculty}) | Khóa tuyển: <strong>{student.cohort}</strong>
          </p>
        </div>

        {/* Giỏ môn đã chọn */}
        <div style={styles.basketPill}>
          <span>🛒 Đã chọn: <strong>{basket.length}</strong> môn ({totalBasketCredits} TC)</span>
          <span style={{ color: "#F39C12", fontWeight: "700" }}>
            ~{estimatedBasketTuition.toLocaleString("vi-VN")} đ
          </span>
        </div>
      </div>

      {/* Tabs điều hướng 4 chức năng chính */}
      <div style={styles.tabBar}>
        {[
          { id: "program", label: "Chương trình đào tạo", icon: "🏛️" },
          { id: "study-plan", label: "Kế hoạch 4 năm", icon: "📅" },
          { id: "selection", label: "Chọn môn & Học phí", icon: "🛒" },
          { id: "calendar", label: "Xếp lịch & Xung đột", icon: "⚡" },
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

      {/* NỘI DUNG TAB 1: CHƯƠNG TRÌNH ĐÀO TẠO */}
      {activeTab === "program" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Chú giải trạng thái */}
          <div className="card" style={{ padding: "14px 18px", marginBottom: 0 }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", fontSize: "13px" }}>
              <span style={{ fontWeight: "700", color: "var(--primary)" }}>Trạng thái môn học:</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27ae60" }} /> Đã tích lũy
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#2980b9" }} /> Đang học kỳ này
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#e74c3c" }} /> Cần học lại
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#bdc3c7" }} /> Chưa học
              </span>
            </div>
          </div>

          {/* Nhóm Đại cương */}
          <ProgramCategoryBlock
            title="1. Khối kiến thức Giáo dục đại cương"
            requiredCredits={56}
            description="Lý luận chính trị, Khoa học xã hội, Toán - Tin học - KHTN, GDTC & GDQP-AN."
            courseIds={["BAA00101", "BAA00102", "BAA00103", "BAA00104", "BAA00003", "BAA00004", "BAA00005", "BAA00007", "MTH00021", "MTH00022", "MTH00035", "MTH00044", "MTH00045", "CSC00004", "BAA00021", "BAA00022", "BAA00030"]}
            statusMap={studentCourseStatusMap}
            basket={basket}
            onToggleBasket={toggleBasketItem}
          />

          {/* Nhóm Cơ sở ngành */}
          <ProgramCategoryBlock
            title="2. Khối kiến thức Cơ sở ngành"
            requiredCredits={38}
            description="Các môn lập trình nền tảng, thuật toán, hệ điều hành, cơ sở dữ liệu và mạng máy tính."
            courseIds={["CSC10012", "CSC10003", "CSC10004", "CSC10009", "CSC10006", "CSC10007", "CSC10008", "CSC13002", "CSC14003"]}
            statusMap={studentCourseStatusMap}
            basket={basket}
            onToggleBasket={toggleBasketItem}
          />

          {/* Nhóm Chuyên ngành */}
          <ProgramCategoryBlock
            title="3. Khối kiến thức Chuyên ngành Công nghệ phần mềm & Hệ thống"
            requiredCredits={34}
            description="Các môn phát triển web, di động, trí tuệ nhân tạo, thiết kế giao diện và quản lý dự án."
            courseIds={["CSC12002", "CSC12004", "CSC13003", "CSC13005", "CSC13006", "CSC13007", "CSC13008", "CSC13009", "CSC13010", "CSC13106", "CSC14005", "CSC18001"]}
            statusMap={studentCourseStatusMap}
            basket={basket}
            onToggleBasket={toggleBasketItem}
          />

          {/* Nhóm Tốt nghiệp */}
          <ProgramCategoryBlock
            title="4. Khối kiến thức Tốt nghiệp"
            requiredCredits={10}
            description="Sinh viên chọn 1 trong 3 phương án: Khóa luận tốt nghiệp (10 TC), Thực tập tốt nghiệp (10 TC) hoặc Dự án tốt nghiệp + Chuyên đề."
            courseIds={["CSC10251", "CSC10252", "CSC10204"]}
            statusMap={studentCourseStatusMap}
            basket={basket}
            onToggleBasket={toggleBasketItem}
          />
        </div>
      )}

      {/* NỘI DUNG TAB 2: KẾ HOẠCH HỌC TẬP 4 NĂM */}
      {activeTab === "study-plan" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="card" style={{ padding: "16px", backgroundColor: "#eef5fc", borderLeft: "4px solid var(--primary)" }}>
            <h3 style={{ fontSize: "15px", color: "var(--primary)" }}>📋 Phác thảo kế hoạch học tập theo kỳ</h3>
            <p style={{ fontSize: "13px", color: "#2c3e50", marginTop: "4px" }}>
              Sắp xếp môn học hợp lý giúp bạn tốt nghiệp đúng hạn hoặc vượt tiến độ mà không bị quá tải số tín chỉ mỗi kỳ.
            </p>
          </div>

          <div className="grid grid-2">
            {[
              { id: "Y1S1", label: "Năm 1 - Học kỳ 1", defaultCourses: ["BAA00101", "CSC10012", "MTH00021", "BAA00004", "BAA00021", "BAA00030"] },
              { id: "Y1S2", label: "Năm 1 - Học kỳ 2", defaultCourses: ["BAA00102", "CSC10003", "MTH00022", "MTH00035", "BAA00022", "CSC00004"] },
              { id: "Y2S1", label: "Năm 2 - Học kỳ 1", defaultCourses: ["CSC10004", "CSC10009", "MTH00044", "MTH00045", "BAA00103", "BAA00005"] },
              { id: "Y2S2", label: "Năm 2 - Học kỳ 2", defaultCourses: ["CSC10006", "CSC10007", "CSC10008", "BAA00104", "BAA00007"] },
              { id: "Y3S1", label: "Năm 3 - Học kỳ 1 (Hiện tại)", defaultCourses: ["CSC13002", "CSC14003", "CSC12002", "CSC13008", "BAA00003"] },
              { id: "Y3S2", label: "Năm 3 - Học kỳ 2 (Dự kiến)", defaultCourses: ["CSC10107", "CSC11003", "CSC12004", "CSC13003"] },
              { id: "Y4S1", label: "Năm 4 - Học kỳ 1 (Dự kiến)", defaultCourses: ["CSC11006", "CSC11007", "CSC15001", "CSC13106"] },
              { id: "Y4S2", label: "Năm 4 - Học kỳ 2 (Tốt nghiệp)", defaultCourses: ["CSC10251"] },
            ].map((sem) => {
              const list = studyPlan[sem.id] || sem.defaultCourses;
              const totalTC = list.reduce((sum, cid) => sum + (getCourseById(cid)?.credits || 4), 0);

              return (
                <div key={sem.id} className="card" style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #edf2f7", paddingBottom: "8px" }}>
                    <strong>{sem.label}</strong>
                    <span className="badge badge-primary">{totalTC} Tín chỉ</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {list.map((cid) => {
                      const c = getCourseById(cid);
                      const status = studentCourseStatusMap.get(cid);
                      return (
                        <div key={cid} style={styles.planItem}>
                          <code>{cid}</code>
                          <span style={{ flex: 1, fontSize: "13px" }}>{getCourseName(cid)}</span>
                          <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600" }}>{c?.credits || 4} TC</span>
                          {status === "PASSED" && <span style={{ color: "#27ae60", fontSize: "12px" }}>✓ Đạt</span>}
                          {status === "IN_PROGRESS" && <span style={{ color: "#2980b9", fontSize: "12px" }}>Đang học</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* NỘI DUNG TAB 3: CHỌN MÔN & HỌC PHÍ */}
      {activeTab === "selection" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Tóm tắt giỏ môn học */}
          <div className="card" style={styles.selectionSummaryCard}>
            <div>
              <h3 style={{ fontSize: "16px", color: "#ffffff" }}>Giỏ đăng ký học phần kỳ tới</h3>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", marginTop: "2px" }}>
                Chọn các môn bên dưới để đưa vào phương án xếp thời khóa biểu và ước tính chi phí.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#F39C12" }}>
                {estimatedBasketTuition.toLocaleString("vi-VN")} đ
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
                Tổng cộng {totalBasketCredits} tín chỉ ({basket.length} môn)
              </div>
            </div>
          </div>

          {/* Tìm kiếm môn để chọn */}
          <div className="card" style={{ padding: "16px" }}>
            <input
              type="text"
              className="input"
              placeholder="🔍 Tìm nhanh môn học muốn thêm vào giỏ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Danh sách các môn mở để chọn */}
          <div className="grid grid-2">
            {courses
              .filter((c) => !searchTerm || c.course_id.toLowerCase().includes(searchTerm.toLowerCase()) || c.course_name_vi.toLowerCase().includes(searchTerm.toLowerCase()))
              .slice(0, 20)
              .map((c) => {
                const inBasket = basket.includes(c.course_id);
                const status = studentCourseStatusMap.get(c.course_id);
                return (
                  <div key={c.course_id} className="card" style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <code style={{ fontWeight: "700", color: "var(--primary)" }}>{c.course_id}</code>
                        <span className="badge badge-info">{c.credits} TC</span>
                        {status === "PASSED" && <span className="badge badge-success">Đã hoàn thành</span>}
                      </div>
                      <div style={{ fontWeight: "600", fontSize: "14px", marginTop: "4px" }}>{c.course_name_vi}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-light)" }}>
                        Học phí dự kiến: ~{(c.credits * 780000).toLocaleString("vi-VN")} đ
                      </div>
                    </div>
                    <button
                      className={`btn ${inBasket ? "btn-accent" : "btn-outline"}`}
                      onClick={() => toggleBasketItem(c.course_id)}
                      style={{ padding: "6px 14px", fontSize: "13px" }}
                    >
                      {inBasket ? "✓ Đã chọn" : "+ Chọn môn"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* NỘI DUNG TAB 4: XẾP LỊCH & XUNG ĐỘT */}
      {activeTab === "calendar" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Cảnh báo xung đột nếu có */}
          {scheduleConflicts.length > 0 ? (
            <div className="card" style={{ padding: "18px", backgroundColor: "#fff5f5", borderLeft: "5px solid #e74c3c" }}>
              <h3 style={{ color: "#c0392b", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>⚠️</span> Phát hiện {scheduleConflicts.length} xung đột trùng lịch học!
              </h3>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {scheduleConflicts.map((c, i) => (
                  <div key={i} style={{ fontSize: "13px", color: "#2c3e50" }}>
                    • Giữa <strong>{c.course1}</strong> và <strong>{c.course2}</strong> vào <strong>{c.day}</strong> ({c.period}): {c.reason}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#7f8c8d" }}>
                💡 Gợi ý: Hãy đổi lớp hoặc chọn môn khác để lịch học không bị chồng lấn.
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: "18px", backgroundColor: "#eef9f2", borderLeft: "5px solid #27ae60" }}>
              <h3 style={{ color: "#27ae60", fontSize: "16px" }}>✅ Không phát hiện xung đột lịch học!</h3>
              <p style={{ fontSize: "13px", color: "#2c3e50", marginTop: "4px" }}>
                Tất cả các môn trong giỏ chọn ({basket.length} môn) đều có khung giờ học riêng biệt, không bị trùng tiết.
              </p>
            </div>
          )}

          {/* Bảng xem trước lịch học các môn đã chọn */}
          <div className="card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--primary)", marginBottom: "12px" }}>
              Lịch học dự kiến của {basket.length} môn đã chọn:
            </h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Mã môn</th>
                    <th>Tên môn học</th>
                    <th>Số TC</th>
                    <th>Thứ</th>
                    <th>Ca học dự kiến</th>
                    <th>Học phí</th>
                  </tr>
                </thead>
                <tbody>
                  {basketCourses.map((c, i) => (
                    <tr key={c.course_id || i}>
                      <td><code>{c.course_id}</code></td>
                      <td><strong>{c.course_name_vi}</strong></td>
                      <td>{c.credits} TC</td>
                      <td>Thứ {((i % 5) + 2)}</td>
                      <td>{i % 2 === 0 ? "Sáng: 07:30 - 10:15 (Tiết 1-3)" : "Chiều: 13:30 - 16:15 (Tiết 7-9)"}</td>
                      <td>{((c.credits || 4) * 780000).toLocaleString("vi-VN")} đ</td>
                    </tr>
                  ))}
                  {basketCourses.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                        Chưa có môn nào trong giỏ. Vui lòng vào tab "Chọn môn & Học phí" để thêm môn.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent hiển thị một nhóm môn trong chương trình đào tạo
function ProgramCategoryBlock({ title, requiredCredits, description, courseIds, statusMap, basket, onToggleBasket }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card" style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <div>
          <h2 style={{ fontSize: "17px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>{open ? "📂" : "📁"}</span>
            {title}
          </h2>
          <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "2px" }}>
            Yêu cầu: <strong style={{ color: "var(--primary)" }}>{requiredCredits} tín chỉ</strong> — {description}
          </div>
        </div>
        <span style={{ fontSize: "18px", color: "var(--primary)", fontWeight: "bold" }}>
          {open ? "−" : "+"}
        </span>
      </div>

      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px", marginTop: "16px" }}>
          {courseIds.map((cid) => {
            const course = getCourseById(cid);
            const name = getCourseName(cid);
            const status = statusMap.get(cid) || "NOT_TAKEN";
            const inBasket = basket.includes(cid);

            const statusColors = {
              PASSED: { border: "#27ae60", bg: "#eef9f2", badge: "Đã đạt" },
              IN_PROGRESS: { border: "#2980b9", bg: "#eef5fc", badge: "Đang học" },
              FAILED: { border: "#e74c3c", bg: "#fff5f5", badge: "Học lại" },
              NOT_TAKEN: { border: "#dfe4ea", bg: "#ffffff", badge: "Chưa học" },
            };

            const cfg = statusColors[status] || statusColors.NOT_TAKEN;

            return (
              <div
                key={cid}
                style={{
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1.5px solid ${cfg.border}`,
                  backgroundColor: cfg.bg,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <code style={{ fontWeight: "700", fontSize: "13px" }}>{cid}</code>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: cfg.border }}>
                    {cfg.badge}
                  </span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#2d3436" }}>{name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px", fontSize: "12px", color: "var(--text-light)" }}>
                  <span>{course?.credits || 4} Tín chỉ</span>
                  {status !== "PASSED" && (
                    <button
                      onClick={() => onToggleBasket(cid)}
                      style={{
                        padding: "3px 8px",
                        fontSize: "11px",
                        borderRadius: "4px",
                        border: inBasket ? "1px solid #F39C12" : "1px solid #004A98",
                        backgroundColor: inBasket ? "#F39C12" : "#ffffff",
                        color: inBasket ? "#ffffff" : "#004A98",
                        cursor: "pointer",
                      }}
                    >
                      {inBasket ? "Đã chọn" : "+ Giỏ"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "12px",
  },
  basketPill: {
    backgroundColor: "var(--primary-dark)",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "24px",
    display: "flex",
    gap: "12px",
    fontSize: "13px",
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
    whiteSpace: "nowrap",
    transition: "all 0.15s ease",
  },
  tabBtnActive: {
    backgroundColor: "var(--primary)",
    color: "#ffffff",
  },
  planItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 8px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    border: "1px solid #edf2f7",
  },
  selectionSummaryCard: {
    background: "linear-gradient(135deg, #004A98 0%, #0984e3 100%)",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
  },
};

export default StudyRoadmapPage;
