// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { I18nProvider } from "./i18n";

import Login from "./features/account/Login";
import AccountHome from "./features/account/AccountHome";
import PersonalInfo from "./features/account/PersonalInfo";
import Followings from "./features/account/Followings";
import Settings from "./features/account/Settings";
import SettingsLanguage from "./features/account/SettingsLanguage";
import SettingsSecurity from "./features/account/SettingsSecurity";
import AuthorCenter from "./features/account/AuthorCenter";

// vẫn giữ 2 màn cũ nếu muốn
import AuthorWorkForm from "./features/account/AuthorWorkForm"; // (edit cũ - optional)
import AuthorCreate from "./features/account/AuthorCreate";     // tạo tác phẩm (wizard)

// 👇 THÊM MÀN CHỈNH SỬA MỚI
import AuthorEdit from "./features/account/AuthorEdit";

const NeedAuth = ({ children }) =>
  localStorage.getItem("token") ? children : <Navigate to="/login" replace />;

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <div className="max-w-sm mx-auto min-h-screen bg-white">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<NeedAuth><AccountHome /></NeedAuth>} />
            <Route path="/account" element={<NeedAuth><AccountHome /></NeedAuth>} />
            <Route path="/account/personal" element={<NeedAuth><PersonalInfo /></NeedAuth>} />
            <Route path="/account/followings" element={<NeedAuth><Followings /></NeedAuth>} />
            <Route path="/settings" element={<NeedAuth><Settings /></NeedAuth>} />
            <Route path="/settings/language" element={<NeedAuth><SettingsLanguage /></NeedAuth>} />
            <Route path="/settings/security" element={<NeedAuth><SettingsSecurity /></NeedAuth>} />
            <Route path="/author" element={<NeedAuth><AuthorCenter /></NeedAuth>} />

            {/* tạo tác phẩm (wizard 3 bước) */}
            <Route path="/author/work/new" element={<NeedAuth><AuthorCreate /></NeedAuth>} />

            {/* 👇 route CHỈNH SỬA MỚI */}
            <Route path="/author/work/:id/edit" element={<NeedAuth><AuthorEdit /></NeedAuth>} />

            {/* optional: giữ route edit cũ nếu còn dùng đâu đó */}
            <Route path="/author/work/:id" element={<NeedAuth><AuthorWorkForm mode="edit" /></NeedAuth>} />
          </Routes>
        </div>
      </BrowserRouter>
    </I18nProvider>
  );
}