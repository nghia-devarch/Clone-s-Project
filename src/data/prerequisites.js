/**
 * Danh sách các môn tiên quyết (prerequisites).
 * Mỗi mục gồm:
 *   - course_id: mã môn cần học
 *   - prereq_id: mã môn tiên quyết
 *   - type: loại tiên quyết
 *       + PREVIOUS: tiên quyết (phải hoàn thành trước)
 *       + PARALLEL: song hành (có thể học cùng lúc)
 *       + RECOMMENDED: khuyến nghị (nên học trước)
 */
const prerequisites = [
  // === Môn Toán yêu cầu CSC10012 ===
  { course_id: "MTH00050", prereq_id: "CSC10012", type: "PREVIOUS" },

  // === Các môn cơ sở ngành yêu cầu CSC10012 ===
  { course_id: "CSC10003", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC10004", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC10008", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC10009", prereq_id: "CSC10012", type: "PREVIOUS" },

  // === Các môn yêu cầu CSC10004 (Cấu trúc dữ liệu & Giải thuật) ===
  { course_id: "CSC10006", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC14003", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC15006", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC14001", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC14004", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC14119", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC15001", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC15002", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC17001", prereq_id: "CSC10004", type: "PREVIOUS" },
  { course_id: "CSC17106", prereq_id: "CSC10004", type: "PREVIOUS" },

  // === Môn yêu cầu CSC10009 ===
  { course_id: "CSC10007", prereq_id: "CSC10009", type: "PREVIOUS" },

  // === Các môn yêu cầu CSC10006 (Cơ sở dữ liệu) ===
  { course_id: "CSC13002", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC13002", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC13008", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC13008", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC13009", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC13009", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC12002", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC12004", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC12001", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC14118", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC15001", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC15002", prereq_id: "CSC10006", type: "PREVIOUS" },
  { course_id: "CSC17106", prereq_id: "CSC10006", type: "PREVIOUS" },

  // === Các môn yêu cầu CSC10008 (Mạng máy tính) ===
  { course_id: "CSC11003", prereq_id: "CSC10007", type: "PREVIOUS" },
  { course_id: "CSC11003", prereq_id: "CSC10008", type: "PREVIOUS" },
  { course_id: "CSC11004", prereq_id: "CSC10008", type: "PREVIOUS" },
  { course_id: "CSC11006", prereq_id: "CSC10008", type: "PREVIOUS" },
  { course_id: "CSC11007", prereq_id: "CSC10008", type: "PREVIOUS" },

  // === Các môn yêu cầu CSC10012 (còn lại) ===
  { course_id: "CSC10105", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC16001", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC13007", prereq_id: "CSC10012", type: "PREVIOUS" },
  { course_id: "CSC14120", prereq_id: "CSC10012", type: "PREVIOUS" },

  // === Chuỗi tiên quyết nâng cao ===
  { course_id: "CSC14005", prereq_id: "CSC14003", type: "PREVIOUS" },
  { course_id: "CSC18001", prereq_id: "CSC14005", type: "PREVIOUS" },
  { course_id: "CSC14002", prereq_id: "CSC14003", type: "PREVIOUS" },
  { course_id: "CSC14006", prereq_id: "CSC14003", type: "PREVIOUS" },

  // === Các môn yêu cầu CSC12004 ===
  { course_id: "CSC12005", prereq_id: "CSC12004", type: "PREVIOUS" },
  { course_id: "CSC12106", prereq_id: "CSC12004", type: "PREVIOUS" },

  // === Các môn yêu cầu CSC13002 (Nhập môn công nghệ phần mềm) ===
  { course_id: "CSC13003", prereq_id: "CSC13002", type: "PREVIOUS" },
  { course_id: "CSC13005", prereq_id: "CSC13002", type: "PREVIOUS" },
  { course_id: "CSC13006", prereq_id: "CSC13002", type: "PREVIOUS" },
  { course_id: "CSC13010", prereq_id: "CSC13002", type: "PREVIOUS" },
];

export default prerequisites;
