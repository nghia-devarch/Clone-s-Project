/**
 * Chương trình đào tạo ngành Kỹ thuật Phần mềm
 * Chuyên ngành duy nhất: Kỹ thuật Phần mềm
 */
const categories = {
  // =============================================
  // PHẦN 1: GIÁO DỤC ĐẠI CƯƠNG (56 tín chỉ)
  // =============================================
  GENERAL_EDUCATION: {
    name: "Giáo dục đại cương",
    total_credits_required: 56,
    note: "56 tín chỉ không kể Ngoại ngữ, GDTC và GDQP-AN.",
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
          /** Toán bắt buộc - 20 tín chỉ */
          MATH_MANDATORY: {
            name: "Toán bắt buộc",
            credits: 20,
            mandatory: true,
            courses: ["MTH00021", "MTH00022", "MTH00035", "MTH00044", "MTH00045"],
          },

          /** Toán tự chọn - 8 tín chỉ */
          MATH_ELECTIVE: {
            name: "Toán tự chọn",
            credits_required: 8,
            mandatory: false,
            courses: ["MTH00050", "MTH00051", "MTH00052", "MTH00053"],
          },

          /** Môi trường tự chọn - 2 tín chỉ */
          ENVIRONMENT_ELECTIVE: {
            name: "Môi trường tự chọn",
            credits_required: 2,
            mandatory: false,
            courses: ["GEO00002", "ENV00001", "ENV00003"],
          },

          /** Khoa học tự nhiên tự chọn - 6 tín chỉ */
          NATURAL_SCIENCE_ELECTIVE: {
            name: "Khoa học tự nhiên tự chọn",
            credits_required: 6,
            mandatory: false,
            courses: [
              "CHE00001", "CHE00002", "CHE00081", "CHE00082",
              "BIO00001", "BIO00002",
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
        courses: ["BAA00021", "BAA00022"],
      },

      /** Giáo dục quốc phòng - an ninh */
      GENERAL_DEFENSE: {
        name: "Giáo dục quốc phòng - an ninh",
        credits: 4,
        mandatory: true,
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
      "CSC10012", "CSC10003", "CSC10004", "CSC10014", "CSC10006",
      "CSC10007", "CSC10008", "CSC10009", "CSC13002", "CSC14003",
    ],
  },

  // =============================================
  // PHẦN 3: KIẾN THỨC CHUYÊN NGÀNH (34 tín chỉ)
  // =============================================
  MAJOR: {
    name: "Kiến thức chuyên ngành",
    total_credits_required: 34,
    breakdown: {
      /** Bắt buộc chuyên ngành - tối thiểu 16 tín chỉ */
      MANDATORY: {
        name: "Bắt buộc chuyên ngành",
        credits_required: 16,
        mandatory: false,
        note: "Tích lũy ít nhất 04 học phần, tối thiểu 16 tín chỉ.",
        courses: [
          "CSC13003", "CSC13005", "CSC13006", "CSC13007",
          "CSC13008", "CSC13009", "CSC13010", "CSC13106", "CSC13112",
        ],
      },

      /** Tự chọn chuyên ngành - 8 tín chỉ */
      ELECTIVE: {
        name: "Tự chọn chuyên ngành",
        credits_required: 8,
        mandatory: false,
        courses: [
          "CSC13001", "CSC13101", "CSC13102", "CSC13103",
          "CSC13107", "CSC13117", "CSC13114", "CSC13116",
        ],
      },

      /** Tự chọn tự do - 10 tín chỉ */
      FREE_ELECTIVES: {
        name: "Tự chọn tự do",
        credits_required: 10,
        mandatory: false,
        courses: [
          "CSC11002", "CSC12001", "CSC12002", "CSC14001",
          "CSC14004", "CSC14005", "CSC15001", "CSC15006",
          "CSC16001", "CSC18001",
        ],
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
