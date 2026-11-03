/**
 * Chương trình đào tạo ngành Khoa học Máy tính (HCMUS)
 * Gồm 5 chuyên ngành:
 * 1. Khoa học máy tính
 * 2. Công nghệ tri thức
 * 3. Thị giác máy tính
 * 4. An toàn thông tin
 * 5. Khoa học dữ liệu
 */
const categories = {
  GENERAL_EDUCATION: {
    name: "Giáo dục đại cương",
    total_credits_required: 56,
    note: "56 tín chỉ không kể Ngoại ngữ, Giáo dục thể chất và Giáo dục quốc phòng - an ninh.",
    breakdown: {
      GENERAL_POLITICAL_LAW: {
        name: "Lý luận chính trị - Pháp luật",
        credits: 14,
        mandatory: true,
        courses: ["BAA00101", "BAA00102", "BAA00103", "BAA00104", "BAA00003", "BAA00004"],
      },
      GENERAL_SOCIAL_ECONOMICS: {
        name: "Khoa học xã hội - Kinh tế - Kỹ năng",
        credits_required: 2,
        mandatory: false,
        note: "Chọn 01 học phần (02 tín chỉ).",
        courses: ["BAA00005", "BAA00006", "BAA00007"],
      },
      GENERAL_MATH_SCIENCE: {
        name: "Toán - Khoa học tự nhiên - Công nghệ - Môi trường",
        total_credits_required: 36,
        breakdown: {
          MATH_REQUIRED: {
            name: "Toán bắt buộc",
            credits: 24,
            mandatory: true,
            courses: ["MTH00003", "MTH00081", "MTH00004", "MTH00082", "MTH00030", "MTH00083", "MTH00040", "MTH00085", "MTH00041", "MTH00086", "MTH00050"],
          },
          MATH_ELECTIVE: {
            name: "Toán tự chọn",
            credits_required: 4,
            mandatory: false,
            note: "Chọn 01 học phần (04 tín chỉ) từ các học phần toán học.",
            courses: ["MTH00051", "MTH00052", "MTH00053"],
          },
          ENVIRONMENT_ELECTIVE: {
            name: "Khoa học Trái đất / Môi trường tự chọn",
            credits_required: 2,
            mandatory: false,
            note: "Chọn 01 học phần (02 tín chỉ).",
            courses: ["GEO00002", "ENV00001", "ENV00003"],
          },
          NATURAL_SCIENCE_ELECTIVE: {
            name: "Khoa học tự nhiên tự chọn",
            credits_required: 6,
            mandatory: false,
            note: "Chọn 06 tín chỉ từ các học phần khoa học tự nhiên.",
            courses: ["CHE00001", "CHE00002", "CHE00081", "CHE00082", "BIO00001", "BIO00002", "BIO00081", "BIO00082", "PHY00001", "PHY00002", "PHY00081"],
          },
        },
      },
      GENERAL_IT: {
        name: "Tin học cơ sở",
        credits: 4,
        mandatory: true,
        courses: ["CSC00004"],
      },
      GENERAL_ENGLISH: {
        name: "Ngoại ngữ",
        mandatory: false,
        note: "Không tính vào điểm trung bình và tín chỉ tích lũy. Miễn nếu đạt chuẩn đầu ra.",
        courses: ["ADD00031", "ADD00032", "ADD00033", "ADD00034"],
      },
      GENERAL_PE: {
        name: "Giáo dục thể chất",
        credits: 4,
        mandatory: true,
        courses: ["BAA00021", "BAA00022"],
      },
      GENERAL_DEFENSE: {
        name: "Giáo dục quốc phòng - an ninh",
        credits: 4,
        mandatory: true,
        courses: ["BAA00030"],
      },
    },
  },
  FOUNDATION: {
    name: "Kiến thức cơ sở ngành",
    total_credits_required: 38,
    mandatory: true,
    courses: ["CSC10001", "CSC10002", "CSC10003", "CSC10004", "CSC10006", "CSC10007", "CSC10008", "CSC10009", "CSC13002", "CSC14003"],
  },
  MAJOR: {
    name: "Kiến thức chuyên ngành",
    total_credits_required: 34,
    note: "Chọn 01 trong 05 chuyên ngành; mỗi chuyên ngành yêu cầu 34 tín chỉ (16 BB + 8 TC chuyên ngành + 10 TC tự do).",
    breakdown: {
      MAJOR_COMPUTER_SCIENCE: {
        name: "Chuyên ngành Khoa học máy tính",
        total_credits_required: 34,
        breakdown: {
          MANDATORY: {
            name: "Bắt buộc chuyên ngành (16 TC)",
            credits: 16,
            courses: ["CSC14001", "CSC14002", "CSC14004", "CSC14005", "CSC14006", "CSC14101", "CSC14111", "CSC14120"],
          },
          ELECTIVE: {
            name: "Tự chọn chuyên ngành (8 TC)",
            credits: 8,
            courses: ["CSC10102", "CSC10103", "CSC10104", "CSC10108", "CSC14008", "CSC14105", "CSC14112", "CSC14113", "CSC14117", "CSC14118", "CSC14119", "CSC16005", "CSC17001"],
          },
          FREE_ELECTIVE: {
            name: "Tự chọn tự do (10 TC)",
            credits: 10,
            courses: ["CSC14007", "CSC15001", "CSC15002", "CSC15003", "CSC15004", "CSC15005", "CSC15006", "CSC15007", "CSC15009", "CSC15011", "CSC15012", "CSC15010"],
          },
        },
      },
      MAJOR_KNOWLEDGE_TECHNOLOGY: {
        name: "Chuyên ngành Công nghệ tri thức",
        total_credits_required: 34,
        courses: ["CSC14007", "CSC15001", "CSC15002", "CSC15003", "CSC15004", "CSC15005", "CSC15006", "CSC15007", "CSC15009", "CSC15011", "CSC15012", "CSC10121", "CSC10102", "CSC10103"],
      },
      MAJOR_COMPUTER_VISION: {
        name: "Chuyên ngành Thị giác máy tính",
        total_credits_required: 34,
        courses: ["CSC16001", "CSC16002", "CSC16003", "CSC16004", "CSC16005", "CSC16101", "CSC16102", "CSC16105", "CSC16106", "CSC16107", "CSC16109", "CSC16113", "CSC16114"],
      },
      MAJOR_INFORMATION_SECURITY: {
        name: "Chuyên ngành An toàn thông tin",
        total_credits_required: 34,
        courses: ["CSC15001", "CSC15002", "CSC15003", "CSC15005", "CSC15010", "CSC10104", "CSC10107", "CSC11004", "CSC12001", "CSC14005", "CSC14007"],
      },
      MAJOR_DATA_SCIENCE: {
        name: "Chuyên ngành Khoa học dữ liệu",
        total_credits_required: 34,
        courses: ["CSC10108", "CSC14004", "CSC14005", "CSC14119", "CSC17001", "CSC17104", "CSC14117", "CSC14118", "CSC14120", "CSC15004", "CSC15007"],
      },
    },
  },
  GRADUATION: {
    name: "Kiến thức tốt nghiệp",
    total_credits_required: 10,
    options: [
      { type: "THESIS", name: "Phương án 1 - Khóa luận tốt nghiệp", credits: 10, courses: ["CSC10251"] },
      { type: "INTERNSHIP", name: "Phương án 2 - Thực tập tốt nghiệp", credits: 10, courses: ["CSC10252"] },
      { type: "PROJECT", name: "Phương án 3 - Thực tập dự án & chuyên đề", credits: 10, courses: ["CSC10204"] },
    ],
  },
};

export default categories;
