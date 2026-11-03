import React, { useState } from "react";

function GuidePage() {
  const [activeSection, setActiveSection] = useState("gpa"); // gpa | exceptions | retake | portal

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <h1 className="section-title">📖 Quy chế đào tạo & Cẩm nang học tập HCMUS</h1>
        <p style={{ color: "var(--text-light)", fontSize: "14px" }}>
          Hướng dẫn chi tiết về cách tính GPA, các quy tắc tín chỉ, môn ngoại lệ và kinh nghiệm đăng ký học phần tại Trường Đại học Khoa học Tự nhiên TP.HCM.
        </p>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {[
          { id: "gpa", label: "Cách tính GPA & Xếp loại", icon: "📊" },
          { id: "exceptions", label: "Môn ngoại lệ không tính GPA", icon: "⚠️" },
          { id: "retake", label: "Học lại & Học cải thiện", icon: "🔄" },
          { id: "portal", label: "Cách đọc chuỗi lịch Portal", icon: "📅" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              ...styles.tabBtn,
              ...(activeSection === tab.id ? styles.tabBtnActive : {}),
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SECTION 1: CÁCH TÍNH GPA & XẾP LOẠI */}
      {activeSection === "gpa" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "12px" }}>
              1. Công thức tính Điểm trung bình tích lũy (GPA)
            </h2>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#2d3748" }}>
              Điểm trung bình chung tích lũy là trung bình có trọng số theo số tín chỉ của các học phần sinh viên đã học tính từ đầu khóa:
            </p>

            <div style={styles.formulaBox}>
              <strong>GPA = (∑ (Điểm_Môn_i × Số_TC_Môn_i)) / (∑ Số_TC_Tích_Lũy)</strong>
            </div>

            <h3 style={{ fontSize: "16px", color: "var(--primary)", marginTop: "20px", marginBottom: "10px" }}>
              Bảng quy đổi thang điểm 10 sang thang điểm 4 và điểm chữ:
            </h3>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Khoảng điểm hệ 10</th>
                    <th>Điểm chữ</th>
                    <th>Điểm hệ 4</th>
                    <th>Đánh giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>8.5 – 10.0</td><td><span className="badge badge-success">A+</span></td><td><strong>4.0</strong></td><td>Xuất sắc</td></tr>
                  <tr><td>8.0 – 8.4</td><td><span className="badge badge-success">A</span></td><td><strong>4.0</strong></td><td>Giỏi</td></tr>
                  <tr><td>7.0 – 7.9</td><td><span className="badge badge-primary">B+</span></td><td><strong>3.5</strong></td><td>Khá giỏi</td></tr>
                  <tr><td>6.5 – 6.9</td><td><span className="badge badge-primary">B</span></td><td><strong>3.0</strong></td><td>Khá</td></tr>
                  <tr><td>5.5 – 6.4</td><td><span className="badge badge-info">C+</span></td><td><strong>2.5</strong></td><td>Trung bình khá</td></tr>
                  <tr><td>5.0 – 5.4</td><td><span className="badge badge-info">C</span></td><td><strong>2.0</strong></td><td>Trung bình</td></tr>
                  <tr><td>4.0 – 4.9</td><td><span className="badge badge-warning">D+</span></td><td><strong>1.5</strong></td><td>Trung bình yếu</td></tr>
                  <tr><td>3.0 – 3.9</td><td><span className="badge badge-warning">D</span></td><td><strong>1.0</strong></td><td>Yếu</td></tr>
                  <tr><td>Dưới 3.0</td><td><span className="badge badge-danger">F</span></td><td><strong>0.0</strong></td><td>Kém (Học lại)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: "16px", color: "var(--primary)", marginTop: "20px", marginBottom: "8px" }}>
              Xếp loại tốt nghiệp toàn khóa (dựa trên GPA Hệ 4):
            </h3>
            <ul style={{ paddingLeft: "20px", fontSize: "13px", lineHeight: "1.8", color: "#4a5568" }}>
              <li><strong>Xuất sắc:</strong> GPA từ 3.60 đến 4.00</li>
              <li><strong>Giỏi:</strong> GPA từ 3.20 đến 3.59</li>
              <li><strong>Khá:</strong> GPA từ 2.50 đến 3.19</li>
              <li><strong>Trung bình:</strong> GPA từ 2.00 đến 2.49</li>
              <li><strong>Yếu / Chưa đủ điều kiện:</strong> GPA dưới 2.00</li>
            </ul>
          </div>
        </div>
      )}

      {/* SECTION 2: MÔN NGOẠI LỆ */}
      {activeSection === "exceptions" && (
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "12px" }}>
            2. Các nhóm môn điều kiện KHÔNG tính vào GPA tích lũy
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#2d3748", marginBottom: "16px" }}>
            Theo quy chế đào tạo tín chỉ của HCMUS, một số học phần là <strong>điều kiện tốt nghiệp</strong> nhưng <strong>không tham gia tính điểm trung bình tích lũy</strong>:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={styles.exceptionItem}>
              <strong>🏃 Giáo dục thể chất (Thể dục 1 & Thể dục 2):</strong>
              <p style={{ fontSize: "13px", color: "#4a5568", marginTop: "2px" }}>
                Sinh viên cần tích lũy đủ 4 tín chỉ Thể dục (đạt từ 5.0 trở lên). Điểm thi chỉ dùng để xét đạt môn, không tính vào điểm GPA toàn khóa.
              </p>
            </div>

            <div style={styles.exceptionItem}>
              <strong>🎖️ Giáo dục quốc phòng – An ninh (GDQP-AN):</strong>
              <p style={{ fontSize: "13px", color: "#4a5568", marginTop: "2px" }}>
                Gồm 4 tín chỉ học tập trung tại Trung tâm GDQP ĐHQG-HCM. Là chứng chỉ bắt buộc để nhận bằng cử nhân, điểm số không cộng vào GPA.
              </p>
            </div>

            <div style={styles.exceptionItem}>
              <strong>🌐 Ngoại ngữ tổng quát (Anh văn 1, 2, 3, 4):</strong>
              <p style={{ fontSize: "13px", color: "#4a5568", marginTop: "2px" }}>
                Sinh viên nếu nộp chứng chỉ quốc tế (IELTS, TOEFL, TOEIC, VSTEP) đạt chuẩn đầu ra sẽ được <strong>miễn học</strong>. Nếu học các học phần AV1-AV4 thì chỉ tính điều kiện hoàn thành, không tính vào GPA tích lũy chính.
              </p>
            </div>

            <div style={styles.exceptionItem}>
              <strong>💻 Tin học cơ sở:</strong>
              <p style={{ fontSize: "13px", color: "#4a5568", marginTop: "2px" }}>
                Đối với các ngành ngoài CNTT, môn Tin học cơ sở là điều kiện tiên quyết, tính vào số tín chỉ tích lũy nhưng không tính vào GPA.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: HỌC LẠI & HỌC CẢI THIỆN */}
      {activeSection === "retake" && (
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "12px" }}>
            3. Quy tắc học lại và học cải thiện điểm số
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", lineHeight: "1.7", color: "#2d3748" }}>
            <div>
              <strong>🔴 Khi nào phải học lại?</strong>
              <p style={{ fontSize: "13px", color: "#4a5568" }}>
                Khi bạn có điểm tổng kết dưới 5.0 (Điểm F) đối với môn bắt buộc (BB), bạn phải đăng ký học lại môn đó ở các học kỳ tiếp theo. Nếu là môn tự chọn (TC), bạn có thể học lại chính môn đó hoặc chọn một môn tự chọn khác cùng nhóm để thay thế.
              </p>
            </div>

            <div>
              <strong>🟡 Học cải thiện điểm:</strong>
              <p style={{ fontSize: "13px", color: "#4a5568" }}>
                Sinh viên có điểm học phần đạt loại D, D+, C được phép đăng ký học lại để cải thiện điểm trung bình tích lũy. Điểm số của lần học mới nhất sẽ thay thế điểm cũ trong công thức tính GPA tích lũy (không tính lặp số tín chỉ).
              </p>
            </div>

            <div>
              <strong>⚠️ Lưu ý về xét học bổng:</strong>
              <p style={{ fontSize: "13px", color: "#4a5568" }}>
                Điểm GPA dùng để xét Học bổng khuyến khích học tập là <strong>GPA học kỳ</strong> (tính điểm thi lần 1 của các môn học trong kỳ đó, không tính điểm thi lại hoặc điểm cải thiện của môn kỳ trước).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CÁCH ĐỌC CHUỖI LỊCH PORTAL */}
      {activeSection === "portal" && (
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "12px" }}>
            4. Hướng dẫn đọc chuỗi lịch học trên Portal HCMUS
          </h2>
          <p style={{ fontSize: "14px", color: "#2d3748", lineHeight: "1.6", marginBottom: "14px" }}>
            Trên thời khóa biểu Portal, các môn học thường có chuỗi ký hiệu như: <code>T2 (Tiết 1-3) C32</code> hoặc <code>T5 (Tiết 7-10) Lab 5</code>.
          </p>

          <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "#4a5568", lineHeight: "1.8" }}>
            <li><strong>T2, T3, T4, T5, T6, T7:</strong> Thứ 2, Thứ 3, Thứ 4, Thứ 5, Thứ 6, Thứ 7.</li>
            <li><strong>Tiết 1-3:</strong> Ca sáng từ 07:30 đến 10:15.</li>
            <li><strong>Tiết 4-6:</strong> Ca sáng từ 10:30 đến 13:15.</li>
            <li><strong>Tiết 7-9 (hoặc 7-10):</strong> Ca chiều từ 13:30 đến 16:15 (hoặc 17:00).</li>
            <li><strong>C32, F204, I41:</strong> Chữ cái đầu là Tòa nhà (Tòa C, Tòa F, Tòa I), chữ số tiếp theo là Số tầng và Phòng học (vd: F204 = Tòa F, Tầng 2, Phòng 04).</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  tabBar: {
    display: "flex",
    gap: "8px",
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
  },
  tabBtnActive: {
    backgroundColor: "var(--primary)",
    color: "#ffffff",
  },
  formulaBox: {
    backgroundColor: "#eef5fc",
    padding: "14px",
    borderRadius: "8px",
    fontFamily: "monospace",
    fontSize: "15px",
    color: "var(--primary)",
    marginTop: "8px",
    borderLeft: "4px solid var(--primary)",
  },
  exceptionItem: {
    padding: "12px 14px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #edf2f7",
  },
};

export default GuidePage;
