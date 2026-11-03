/**
 * Ma trận bảng học phí chính thức và dự báo của HCMUS
 * Phân theo Năm học, Khóa tuyển sinh, Cơ sở đào tạo và Ngành
 */

export const tuitionData = {
  academicYears: [
    { id: "2026-2027", name: "Năm học 2026-2027 (Dự báo)" },
    { id: "2025-2026", name: "Năm học 2025-2026" },
    { id: "2024-2025", name: "Năm học 2024-2025" },
    { id: "2023-2024", name: "Năm học 2023-2024" },
  ],

  campuses: [
    { id: "cs1", name: "Cơ sở 1 - Chợ Quán (227 Nguyễn Văn Cừ)" },
    { id: "cs2", name: "Cơ sở 2 - Đông Hòa (Linh Trung - Thủ Đức)" },
  ],

  cohorts: [
    { id: "k26", label: "Khóa tuyển 2026 (K26)" },
    { id: "k25", label: "Khóa tuyển 2025 (K25)" },
    { id: "k24", label: "Khóa tuyển 2024 (K24)" },
    { id: "k23", label: "Khóa tuyển 2023 (K23)" },
    { id: "k22", label: "Khóa tuyển 2022 (K22 và trước)" },
  ],

  // Bảng đơn giá tín chỉ theo năm học (VNĐ / 1 tín chỉ)
  rateTable: {
    "2026-2027": {
      standard: {
        theory: 840000,   // Tín chỉ lý thuyết
        practice: 980000, // Tín chỉ thực hành / thí nghiệm
        general: 780000,  // Tín chỉ đại cương
      },
      majors: {
        "cntt": { theory: 880000, practice: 1050000, name: "Công nghệ thông tin / KHMT / KTPM" },
        "hoa": { theory: 840000, practice: 1020000, name: "Hóa học" },
        "vatly": { theory: 800000, practice: 960000, name: "Vật lý học / Kỹ thuật hạt nhân" },
        "toan": { theory: 790000, practice: 920000, name: "Toán học / Toán tin" },
        "sinh": { theory: 820000, practice: 990000, name: "Sinh học / Công nghệ sinh học" },
      },
    },
    "2025-2026": {
      standard: {
        theory: 780000,
        practice: 920000,
        general: 720000,
      },
      majors: {
        "cntt": { theory: 820000, practice: 980000, name: "Công nghệ thông tin / KHMT / KTPM" },
        "hoa": { theory: 780000, practice: 950000, name: "Hóa học" },
        "vatly": { theory: 750000, practice: 900000, name: "Vật lý học" },
        "toan": { theory: 740000, practice: 880000, name: "Toán học" },
      },
    },
    "2024-2025": {
      standard: {
        theory: 720000,
        practice: 850000,
        general: 680000,
      },
      majors: {
        "cntt": { theory: 780000, practice: 920000, name: "Công nghệ thông tin" },
        "hoa": { theory: 720000, practice: 880000, name: "Hóa học" },
        "vatly": { theory: 700000, practice: 840000, name: "Vật lý học" },
        "toan": { theory: 690000, practice: 820000, name: "Toán học" },
      },
    },
  },

  /**
   * Tính toán học phí dự kiến dựa trên số tín chỉ
   */
  calculateTuitionEstimate(year = "2024-2025", majorKey = "cntt", theoryCredits = 14, practiceCredits = 4) {
    const table = this.rateTable[year] || this.rateTable["2024-2025"];
    const majorRate = table.majors[majorKey] || {
      theory: table.standard.theory,
      practice: table.standard.practice,
    };

    const theoryCost = theoryCredits * majorRate.theory;
    const practiceCost = practiceCredits * majorRate.practice;
    const total = theoryCost + practiceCost;

    return {
      year,
      majorKey,
      theoryCredits,
      practiceCredits,
      totalCredits: theoryCredits + practiceCredits,
      theoryCost,
      practiceCost,
      total,
      unitTheory: majorRate.theory,
      unitPractice: majorRate.practice,
    };
  },
};
