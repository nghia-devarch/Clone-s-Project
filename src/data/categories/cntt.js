/**
 * Chương trình đào tạo ngành Công nghệ Thông tin
 * Gồm 2 chuyên ngành: Mạng máy tính & Viễn thông, và Công nghệ thông tin
 */
const categories = {
  // =============================================
  // PHẦN 1: GIÁO DỤC ĐẠI CƯƠNG (56 tín chỉ)
  // =============================================
  GENERAL_EDUCATION: {
    name: "Giáo dục đại cương",
    total_credits_required: 56,
    note: "56 tín chỉ không kể Ngoại ngữ, Giáo dục thể chất và Giáo dục quốc phòng - an ninh.",
    breakdown: {
      /** Khối lý luận chính trị và pháp luật - bắt buộc */
      GENERAL_POLITICAL_LAW: {
        name: "Lý luận chính trị - Pháp luật",
        credits: 14,
        mandatory: true,
        courses: ["BAA00101", "BAA00102", "BAA00103", "BAA00104", "BAA00003", "BAA00004"],
      },

      /** Khối xã hội - kinh tế - kỹ năng: chọn 1 trong 3 */
      GENERAL_SOCIAL_ECONOMICS: {
        name: "Khoa học xã hội - Kinh tế - Kỹ năng",
        credits_required: 2,
        mandatory: false,
        note: "Chọn 01 học phần (02 tín chỉ).",
        courses: ["BAA00005", "BAA00006", "BAA00007"],
      },

      /** Khối Toán - Khoa học tự nhiên */
      GENERAL_MATH_SCIENCE: {
        name: "Toán - Khoa học tự nhiên - Công nghệ - Môi trường",
        credits_required: 36,
        breakdown: {
          /** Toán bắt buộc - 24 tín chỉ */
          MATH_MANDATORY: {
            name: "Toán bắt buộc",
            credits: 24,
            mandatory: true,
            courses: [
              "MTH00003", "MTH00081",
              "MTH00004", "MTH00082",
              "MTH00030", "MTH00083",
              "MTH00040", "MTH00085",
              "MTH00041", "MTH00086",
              "MTH00050",
            ],
          },

          /** Toán tự chọn - chọn 1 môn (4 tín chỉ) */
          MATH_ELECTIVE: {
            name: "Toán tự chọn",
            credits_required: 4,
            mandatory: false,
            note: "Chọn 01 học phần (04 tín chỉ).",
            courses: ["MTH00051", "MTH00052", "MTH00053"],
          },

          /** Môi trường tự chọn - chọn 1 môn (2 tín chỉ) */
          ENVIRONMENT_ELECTIVE: {
            name: "Khoa học Trái đất/Môi trường tự chọn",
            credits_required: 2,
            mandatory: false,
            note: "Chọn 01 học phần (02 tín chỉ).",
            courses: ["GEO00002", "ENV00001", "ENV00003"],
          },

          /** Khoa học tự nhiên tự chọn - 6 tín chỉ */
          NATURAL_SCIENCE_ELECTIVE: {
            name: "Khoa học tự nhiên tự chọn",
            credits_required: 6,
            mandatory: false,
            note: "Chọn 06 tín chỉ từ các học phần khoa học tự nhiên.",
            courses: [
              "CHE00001", "CHE00002", "CHE00081", "CHE00082",
              "BIO00001", "BIO00002", "BIO00081", "BIO00082",
              "PHY00001", "PHY00002", "PHY00081",
            ],
          },
        },
      },

      /** Tin học đại cương - bắt buộc */
      GENERAL_IT: {
        name: "Tin học",
        credits: 4,
        mandatory: true,
        courses: ["CSC00004"],
      },

      /** Ngoại ngữ - không tính vào tín chỉ tích lũy */
      GENERAL_ENGLISH: {
        name: "Ngoại ngữ",
        credits: 12,
        mandatory: false,
        note: "Không tính vào điểm trung bình và tín chỉ tích lũy.",
        courses: ["ADD00031", "ADD00032", "ADD00033", "ADD00034"],
      },

      /** Giáo dục thể chất */
      GENERAL_PE: {
        name: "Giáo dục thể chất",
        credits: 4,
        mandatory: true,
        note: "Không nằm trong 138 tín chỉ của khối lượng kiến thức toàn khóa.",
        courses: ["BAA00021", "BAA00022"],
      },

      /** Giáo dục quốc phòng - an ninh */
      GENERAL_DEFENSE: {
        name: "Giáo dục quốc phòng - an ninh",
        credits: 4,
        mandatory: true,
        note: "Không nằm trong 138 tín chỉ của khối lượng kiến thức toàn khóa.",
        courses: ["BAA00030"],
      },
    },
  },

  // =============================================
  // PHẦN 2: KIẾN THỨC CƠ SỞ NGÀNH (38 tín chỉ)
  // =============================================
  FOUNDATION: {
    name: "Kiến thức cơ sở ngành",
    total_credits_required: 38,
    mandatory: true,
    courses: [
      "CSC10001", "CSC10002", "CSC10003", "CSC10004", "CSC10006",
      "CSC10007", "CSC10008", "CSC10009", "CSC13002", "CSC14003",
    ],
  },

  // =============================================
  // PHẦN 3: KIẾN THỨC CHUYÊN NGÀNH (34 tín chỉ)
  // Chọn 1 trong 2 chuyên ngành
  // =============================================
  MAJOR: {
    name: "Kiến thức chuyên ngành",
    total_credits_required: 34,
    note: "Chọn 01 trong 02 chuyên ngành.",
    breakdown: {
      // --- Chuyên ngành 1: Mạng máy tính và Viễn thông ---
      MAJOR_NETWORK_TELECOM: {
        name: "Mạng máy tính và Viễn thông",
        total_credits_required: 34,
        breakdown: {
          /** Bắt buộc chuyên ngành - tối thiểu 16 tín chỉ */
          SPECIALIZATION_CORE: {
            name: "Kiến thức bắt buộc chuyên ngành",
            credits_required: 16,
            mandatory: false,
            note: "Tích lũy ít nhất 04 học phần, tối thiểu 16 tín chỉ.",
            courses: ["CSC11002", "CSC11003", "CSC11004", "CSC11006", "CSC11007", "CSC15001"],
          },

          /** Tự chọn chuyên ngành - tối thiểu 8 tín chỉ */
          SPECIALIZATION_ELECTIVE: {
            name: "Kiến thức tự chọn chuyên ngành",
            credits_required: 8,
            mandatory: false,
            note: "Tích lũy ít nhất 02 học phần, tối thiểu 08 tín chỉ.",
            courses: [
              "CSC11002", "CSC11003", "CSC11004", "CSC11006", "CSC11007", "CSC15001",
              "CSC10107", "CSC11106", "CSC11115", "CSC11116", "CSC11117", "CSC11118",
              "CSC15003", "CSC15005",
            ],
          },

          /** Tự chọn tự do - bổ sung nếu chưa đủ 34 tín chỉ */
          FREE_ELECTIVE: {
            name: "Kiến thức tự chọn tự do",
            credits_required: 10,
            mandatory: false,
            note: "Nếu chưa đủ 34 tín chỉ, tiếp tục chọn từ danh sách để đủ.",
            courses: [
              "CSC11002", "CSC11003", "CSC11004", "CSC11006", "CSC11007",
              "CSC11115", "CSC11116", "CSC11117", "CSC11118",
              "CSC12001", "CSC12002", "CSC13003", "CSC13008",
            ],
          },
        },
      },

      // --- Chuyên ngành 2: Công nghệ thông tin ---
      MAJOR_IT: {
        name: "Công nghệ thông tin",
        total_credits_required: 34,
        breakdown: {
          /** Bắt buộc chuyên ngành - tối thiểu 16 tín chỉ */
          SPECIALIZATION_CORE: {
            name: "Kiến thức bắt buộc chuyên ngành",
            credits_required: 16,
            mandatory: false,
            courses: [
              "CSC11004", "CSC15001", "CSC12002", "CSC12004",
              "CSC13003", "CSC13106", "CSC14004", "CSC14005",
            ],
          },

          /** Tự chọn chuyên ngành - tối thiểu 8 tín chỉ */
          SPECIALIZATION_ELECTIVE: {
            name: "Kiến thức tự chọn chuyên ngành",
            credits_required: 8,
            mandatory: false,
            courses: [
              "CSC11003", "CSC11106", "CSC11006", "CSC11117",
              "CSC10108", "CSC12105", "CSC13006", "CSC13008",
              "CSC13010", "CSC14101",
            ],
          },

          /** Tự chọn tự do - bổ sung nếu chưa đủ 34 tín chỉ */
          FREE_ELECTIVE: {
            name: "Kiến thức tự chọn tự do",
            credits_required: 10,
            mandatory: false,
            courses: [
              "CSC11002", "CSC11003", "CSC11004", "CSC11006",
              "CSC12001", "CSC12002", "CSC12003", "CSC13003",
              "CSC13008", "CSC14001", "CSC14004", "CSC15001", "CSC16001",
            ],
          },
        },
      },
    },
  },

  // =============================================
  // PHẦN 4: KIẾN THỨC TỐT NGHIỆP (10 tín chỉ)
  // =============================================
  GRADUATION: {
    name: "Kiến thức tốt nghiệp",
    total_credits_required: 10,
    options: [
      { type: "THESIS", name: "Phương án 1 - Khóa luận tốt nghiệp", credits: 10, courses: ["CSC10251"] },
      { type: "INTERNSHIP", name: "Phương án 2 - Thực tập tốt nghiệp", credits: 10, courses: ["CSC10252"] },
      { type: "PROJECT", name: "Phương án 3 - Thực tập dự án tốt nghiệp", credits: 10, courses: ["CSC10204"] },
    ],
  },
};

export default categories;
