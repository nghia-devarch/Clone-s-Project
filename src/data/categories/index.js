/**
 * Tải chương trình đào tạo theo mã ngành
 * Sử dụng dynamic import để tối ưu dung lượng và tốc độ tải trang
 */
const categoryLoaders = {
  cntt: () => import("./cntt.js"),
  ktpm: () => import("./ktpm.js"),
  khmt: () => import("./khmt.js"),
};

/**
 * Lấy dữ liệu chương trình đào tạo theo mã ngành
 * @param {string} programId - Mã ngành (vd: "cntt", "ktpm", "khmt")
 * @returns {Promise<object>} Dữ liệu categories của chương trình
 */
export async function loadCategories(programId) {
  const loader = categoryLoaders[programId];
  if (!loader) {
    throw new Error(`Không tìm thấy chương trình đào tạo: ${programId}`);
  }
  const module = await loader();
  return module.default;
}

export default categoryLoaders;
