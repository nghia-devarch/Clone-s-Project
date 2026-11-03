/**
 * Tiện ích tính điểm GPA theo hệ thống tín chỉ của HCMUS
 */

/** Bảng quy đổi điểm chữ sang điểm số hệ 4 */
const GRADE_MAP = {
  "A+": 4.0,
  "A": 4.0,
  "B+": 3.5,
  "B": 3.0,
  "C+": 2.5,
  "C": 2.0,
  "D+": 1.5,
  "D": 1.0,
  "F": 0.0,
};

/** Bảng quy đổi điểm số hệ 10 sang điểm chữ */
const SCORE_TO_GRADE = [
  { min: 8.5, grade: "A+" },
  { min: 8.0, grade: "A" },
  { min: 7.0, grade: "B+" },
  { min: 6.5, grade: "B" },
  { min: 5.5, grade: "C+" },
  { min: 5.0, grade: "C" },
  { min: 4.0, grade: "D+" },
  { min: 3.0, grade: "D" },
  { min: 0, grade: "F" },
];

/**
 * Quy đổi điểm hệ 10 sang điểm chữ
 * @param {number} score - Điểm hệ 10 (0-10)
 * @returns {string} Điểm chữ (A+, A, B+, ...)
 */
export function scoreToGrade(score) {
  for (const { min, grade } of SCORE_TO_GRADE) {
    if (score >= min) return grade;
  }
  return "F";
}

/**
 * Quy đổi điểm chữ sang điểm hệ 4
 * @param {string} grade - Điểm chữ (A+, A, B+, ...)
 * @returns {number} Điểm hệ 4 (0.0 - 4.0)
 */
export function gradeToGPA4(grade) {
  return GRADE_MAP[grade] ?? 0;
}

/**
 * Quy đổi điểm hệ 10 sang hệ 4
 * @param {number} score - Điểm hệ 10
 * @returns {number} Điểm hệ 4
 */
export function scoreTo4Scale(score) {
  return gradeToGPA4(scoreToGrade(score));
}

/**
 * Tính GPA trung bình tích lũy
 * @param {Array<{credits: number, score: number}>} courses - Danh sách môn đã học
 * @returns {{ gpa10: number, gpa4: number, totalCredits: number }}
 */
export function calculateGPA(courses) {
  if (courses.length === 0) {
    return { gpa10: 0, gpa4: 0, totalCredits: 0 };
  }

  let totalCredits = 0;
  let weightedSum10 = 0;
  let weightedSum4 = 0;

  for (const course of courses) {
    totalCredits += course.credits;
    weightedSum10 += course.credits * course.score;
    weightedSum4 += course.credits * scoreTo4Scale(course.score);
  }

  return {
    gpa10: totalCredits > 0 ? Math.round((weightedSum10 / totalCredits) * 100) / 100 : 0,
    gpa4: totalCredits > 0 ? Math.round((weightedSum4 / totalCredits) * 100) / 100 : 0,
    totalCredits,
  };
}

/**
 * Xếp loại học lực dựa trên GPA hệ 4
 * @param {number} gpa4 - Điểm GPA hệ 4
 * @returns {string} Xếp loại
 */
export function classifyGPA(gpa4) {
  if (gpa4 >= 3.6) return "Xuất sắc";
  if (gpa4 >= 3.2) return "Giỏi";
  if (gpa4 >= 2.5) return "Khá";
  if (gpa4 >= 2.0) return "Trung bình";
  return "Yếu";
}

export { GRADE_MAP, SCORE_TO_GRADE };
