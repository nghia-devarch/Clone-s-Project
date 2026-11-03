import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy-load các trang để tối ưu hóa hiệu năng và dung lượng bundle
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const StudyRoadmapPage = lazy(() => import("./pages/StudyRoadmapPage"));
const GradesPage = lazy(() => import("./pages/GradesPage"));
const SchedulePage = lazy(() => import("./pages/SchedulePage"));
const ExamSchedulePage = lazy(() => import("./pages/ExamSchedulePage"));
const TuitionPage = lazy(() => import("./pages/TuitionPage"));
const CampusPage = lazy(() => import("./pages/CampusPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const PrerequisitesPage = lazy(() => import("./pages/PrerequisitesPage"));
const ProgramPage = lazy(() => import("./pages/ProgramPage"));
const GPACalculatorPage = lazy(() => import("./pages/GPACalculatorPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const GuidePage = lazy(() => import("./pages/GuidePage"));

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* 1. Side Panel bên trái dành cho Máy tính (Desktop) */}
          <aside className="desktop-side-panel" aria-label="Menu thanh bên máy tính">
            <Sidebar />
          </aside>

          {/* 2. Vùng hiển thị nội dung chính ở bên phải (Desktop & Mobile) */}
          <div className="desktop-main-content">
            <Header />

            <main className="content-inner">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/study-roadmap/*" element={<StudyRoadmapPage />} />
                  <Route path="/grades" element={<GradesPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/exam-schedule" element={<ExamSchedulePage />} />
                  <Route path="/tuition" element={<TuitionPage />} />
                  <Route path="/campus/*" element={<CampusPage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/prerequisites" element={<PrerequisitesPage />} />
                  <Route path="/program/:programId" element={<ProgramPage />} />
                  <Route path="/gpa" element={<GPACalculatorPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/guide/*" element={<GuidePage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>

          {/* 3. Panel điều hướng ở dưới đáy cho Điện thoại (Mobile Bottom Navigation) */}
          <BottomNav />
        </div>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
