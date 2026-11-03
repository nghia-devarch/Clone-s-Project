import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { defaultStudentData } from "../data/defaultStudent";
import { scoreToGrade, scoreTo4Scale, classifyGPA } from "../utils/gpa";

const STORAGE_KEY = "hcmus_portal_db";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  // Tải dữ liệu từ LocalStorage hoặc dùng dữ liệu mẫu HCMUS (100% Local-First)
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Lỗi đọc dữ liệu từ LocalStorage:", e);
    }
    return defaultStudentData;
  });

  // Tự động lưu vào LocalStorage cục bộ mỗi khi data thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Lỗi lưu LocalStorage:", e);
    }
  }, [data]);

  // Nạp dữ liệu mẫu HCMUS
  const loadSampleData = useCallback(() => {
    setData(defaultStudentData);
  }, []);

  // Đặt lại dữ liệu trắng
  const resetData = useCallback(() => {
    const blank = {
      name: "Sinh viên HCMUS",
      studentId: "23120000",
      dob: "",
      cohort: "K2023",
      faculty: "Khoa Công nghệ Thông tin",
      major: "Công nghệ thông tin",
      classCode: "",
      campus: "Cơ sở 1 - 227 Nguyễn Văn Cừ",
      grades: [],
      schedule: [],
      exams: [],
      tuition: {
        academicYear: "2024-2025",
        semester: "Học kỳ 1",
        totalCredits: 0,
        subtotal: 0,
        status: "UNPAID",
        items: [],
      },
      selectedBasket: [],
      studyPlan: {},
    };
    setData(blank);
  }, []);

  // Cập nhật thông tin sinh viên
  const updateStudentInfo = useCallback((newInfo) => {
    setData((prev) => ({
      ...prev,
      ...newInfo,
    }));
  }, []);

  // Thêm / bớt môn khỏi giỏ đăng ký
  const toggleBasketItem = useCallback((courseId) => {
    setData((prev) => {
      const current = prev.selectedBasket || [];
      const next = current.includes(courseId)
        ? current.filter((id) => id !== courseId)
        : [...current, courseId];
      return { ...prev, selectedBasket: next };
    });
  }, []);

  // Cập nhật điểm một môn
  const updateGrade = useCallback((courseId, newScore10) => {
    setData((prev) => {
      const nextGrades = prev.grades.map((g) => {
        if (g.id === courseId || g.code === courseId) {
          const s10 = parseFloat(newScore10);
          return {
            ...g,
            score10: isNaN(s10) ? null : s10,
            score4: isNaN(s10) ? null : scoreTo4Scale(s10),
            grade: isNaN(s10) ? null : scoreToGrade(s10),
            status: isNaN(s10) ? "IN_PROGRESS" : s10 >= 5.0 ? "PASSED" : "FAILED",
          };
        }
        return g;
      });
      return { ...prev, grades: nextGrades };
    });
  }, []);

  // Thêm môn học vào Thời khóa biểu (TKB) thủ công
  const addScheduleItem = useCallback((item) => {
    setData((prev) => {
      const schedule = prev.schedule || [];
      const newItem = {
        id: item.id || `sch-${Date.now()}`,
        ...item,
      };
      return {
        ...prev,
        schedule: [...schedule, newItem],
      };
    });
  }, []);

  // Cập nhật thông tin môn trong TKB
  const updateScheduleItem = useCallback((id, updatedItem) => {
    setData((prev) => ({
      ...prev,
      schedule: (prev.schedule || []).map((s) => (s.id === id ? { ...s, ...updatedItem } : s)),
    }));
  }, []);

  // Xóa môn khỏi TKB
  const deleteScheduleItem = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      schedule: (prev.schedule || []).filter((s) => s.id !== id),
    }));
  }, []);

  // Xuất file sao lưu JSON
  const exportBackupJSON = useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hcmus_backup_${data.studentId || "student"}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  // Nhập file sao lưu JSON
  const importBackupJSON = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && (parsed.studentId || parsed.name || parsed.grades)) {
        setData(parsed);
        return { success: true };
      }
      return { success: false, error: "Định dạng file sao lưu không hợp lệ." };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }, []);

  // Tính toán GPA tích lũy, GPA từng kỳ, tổng tín chỉ
  const stats = useMemo(() => {
    const completed = (data.grades || []).filter(
      (g) => g.score10 !== null && g.score10 !== undefined && g.status !== "EXEMPT_GPA"
    );

    let totalCredits = 0;
    let sum10 = 0;
    let sum4 = 0;

    // Lọc môn mới nhất nếu học lại/cải thiện
    const latestCourses = new Map();
    completed.forEach((c) => {
      latestCourses.set(c.id || c.code, c);
    });

    latestCourses.forEach((c) => {
      const tc = Number(c.credits) || 0;
      const s10 = Number(c.score10) || 0;
      const s4 = c.score4 !== undefined && c.score4 !== null ? Number(c.score4) : scoreTo4Scale(s10);

      totalCredits += tc;
      sum10 += tc * s10;
      sum4 += tc * s4;
    });

    const gpa10 = totalCredits > 0 ? Math.round((sum10 / totalCredits) * 100) / 100 : 0;
    const gpa4 = totalCredits > 0 ? Math.round((sum4 / totalCredits) * 100) / 100 : 0;
    const classification = classifyGPA(gpa4);

    // Tính GPA theo từng học kỳ
    const semesterMap = {};
    (data.grades || []).forEach((g) => {
      const sem = g.semesterName || g.semester || "Khác";
      if (!semesterMap[sem]) {
        semesterMap[sem] = { name: sem, courses: [], totalCredits: 0, sum10: 0, sum4: 0 };
      }
      semesterMap[sem].courses.push(g);
      if (g.score10 !== null && g.score10 !== undefined && g.status !== "EXEMPT_GPA") {
        const tc = Number(g.credits) || 0;
        semesterMap[sem].totalCredits += tc;
        semesterMap[sem].sum10 += tc * Number(g.score10);
        semesterMap[sem].sum4 += tc * (g.score4 ?? scoreTo4Scale(g.score10));
      }
    });

    const semesterList = Object.values(semesterMap).map((s) => ({
      ...s,
      gpa10: s.totalCredits > 0 ? Math.round((s.sum10 / s.totalCredits) * 100) / 100 : 0,
      gpa4: s.totalCredits > 0 ? Math.round((s.sum4 / s.totalCredits) * 100) / 100 : 0,
    }));

    // Tổng số tín chỉ đã tích lũy (kể cả GDTC, GDQP nếu passed)
    const allPassedCredits = (data.grades || [])
      .filter((g) => g.status === "PASSED" || g.status === "EXEMPT_GPA")
      .reduce((sum, g) => sum + (Number(g.credits) || 0), 0);

    return {
      totalCredits,
      allPassedCredits,
      gpa10,
      gpa4,
      classification,
      semesterList,
      totalRequiredCredits: 138,
      progressPercent: Math.min(100, Math.round((allPassedCredits / 138) * 100)),
    };
  }, [data.grades]);

  const value = {
    student: data,
    grades: data.grades || [],
    schedule: data.schedule || [],
    exams: data.exams || [],
    tuition: data.tuition || {},
    studyPlan: data.studyPlan || {},
    basket: data.selectedBasket || [],
    stats,
    loadSampleData,
    resetData,
    updateStudentInfo,
    toggleBasketItem,
    updateGrade,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
    exportBackupJSON,
    importBackupJSON,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) {
    throw new Error("useStudent phải được sử dụng bên trong StudentProvider");
  }
  return ctx;
}
