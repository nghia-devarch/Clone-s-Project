/**
 * Tiện ích hỗ trợ tra cứu và xử lý môn học
 */
import courses from "../data/courses.js";
import prerequisites from "../data/prerequisites.js";

/** Map tra cứu nhanh môn học theo mã */
const courseMap = new Map(courses.map((c) => [c.course_id, c]));

/**
 * Tìm thông tin môn học theo mã
 * @param {string} courseId - Mã môn học
 * @returns {object|undefined} Thông tin môn học
 */
export function getCourseById(courseId) {
  return courseMap.get(courseId);
}

/**
 * Tìm tên môn học theo mã
 * @param {string} courseId - Mã môn học
 * @returns {string} Tên môn học hoặc mã nếu không tìm thấy
 */
export function getCourseName(courseId) {
  return courseMap.get(courseId)?.course_name_vi ?? courseId;
}

/**
 * Lấy danh sách môn tiên quyết của một môn
 * @param {string} courseId - Mã môn học
 * @returns {Array<{prereq_id: string, type: string}>}
 */
export function getPrerequisites(courseId) {
  return prerequisites.filter((p) => p.course_id === courseId);
}

/**
 * Lấy danh sách môn cần môn này làm tiên quyết
 * @param {string} courseId - Mã môn học
 * @returns {Array<{course_id: string, type: string}>}
 */
export function getDependentCourses(courseId) {
  return prerequisites.filter((p) => p.prereq_id === courseId);
}

/**
 * Kiểm tra xem đã hoàn thành tiên quyết chưa
 * @param {string} courseId - Mã môn muốn đăng ký
 * @param {Set<string>} completedIds - Tập hợp mã môn đã hoàn thành
 * @returns {{ canRegister: boolean, missing: Array<string> }}
 */
export function checkPrerequisites(courseId, completedIds) {
  const prereqs = getPrerequisites(courseId);
  // Chỉ kiểm tra loại PREVIOUS (tiên quyết bắt buộc)
  const requiredPrereqs = prereqs.filter((p) => p.type === "PREVIOUS");
  const missing = requiredPrereqs
    .filter((p) => !completedIds.has(p.prereq_id))
    .map((p) => p.prereq_id);

  return {
    canRegister: missing.length === 0,
    missing,
  };
}

/**
 * Tìm kiếm môn học theo từ khóa
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {Array<object>} Danh sách môn phù hợp
 */
export function searchCourses(keyword) {
  const lower = keyword.toLowerCase();
  return courses.filter(
    (c) =>
      c.course_id.toLowerCase().includes(lower) ||
      c.course_name_vi.toLowerCase().includes(lower)
  );
}
