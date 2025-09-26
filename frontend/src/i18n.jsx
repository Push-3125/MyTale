// src/i18n.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const dict = {
  vi: {
    // ===== Common =====
    back: "←",
    save: "Lưu",
    update: "Cập nhật",
    delete: "Xóa",
    confirmDelete: "Xác nhận xóa",
    completed: "Đã hoàn thành",
    add: "Thêm",
    chooseImages: "Chọn ảnh…",
    optional: "(tùy chọn)",

    // ===== Login =====
    appName: "MyTale",
    email: "Email",
    password: "Mật khẩu",
    signIn: "Đăng nhập",
    invalidCredentials: "Sai email hoặc mật khẩu",
    loginFailed: "Đăng nhập thất bại",

    // ===== Account home (giữ key cũ để tương thích) =====
    account: "Quản lí tài khoản",
    personal: "Thông tin cá nhân",
    followings: "Đang theo dõi",
    settings: "Cài đặt",
    language: "Ngôn ngữ",
    security: "Tài khoản và bảo mật",
    authorCenter: "Trung tâm viết truyện",
    logout: "Đăng xuất",

    // ===== Personal info =====
    personalInfoTitle: "Thông tin cá nhân",
    username: "Tên sử dụng",
    worksCount: (n) => `Tác phẩm: ${n}`,
    followingCount: (n) => `Đang theo dõi: ${n}`,

    // ===== Followings =====
    followingsTitle: "Đang theo dõi",
    noFollowings: "Chưa theo dõi tác phẩm nào.",

    // ===== Settings language =====
    vi: "Tiếng Việt",
    en: "English",

    // ===== Settings security =====
    securityTitle: "Tài khoản & bảo mật",
    newPassword: "Mật khẩu mới",
    confirmNewPassword: "Xác nhận mật khẩu mới",
    confirm: "Xác nhận",
    deleteAccount: "Xóa tài khoản",
    confirmDeleteAccount: "Xác nhận xóa tài khoản",
    passwordMismatch: "Xác nhận mật khẩu không khớp",
    changePasswordOk: "Đổi mật khẩu thành công",
    changePassword: "Thay đổi mật khẩu",

    // ===== Author center =====
    authorCenterTitle: "Trung tâm viết truyện",
    createWork: "Tạo tác phẩm",
    edit: "Chỉnh sửa",
    noCover: "No cover",
    stats: (c, r, l, cm) => `${c} chap • ${r} lượt đọc • ${l} like • ${cm} bình luận`,
    noWorks: "Chưa có tác phẩm nào.",
    loading: "Đang tải…",

    // ===== Create work wizard =====
    createYourWork: "Tạo tác phẩm của bạn",
    cover: "Bìa",
    title: "Tiêu đề",
    summary: "Giới thiệu",
    createWorkBtn: "Tạo tác phẩm",
    writeFirstChapter: "Viết chương đầu",
    chapterTitle: "Tiêu đề chương",
    addIllus:
      "Thêm ảnh minh họa cho chương (tùy chọn). Bấm để chọn hoặc kéo-thả nhiều ảnh vào.",
    next: "Tiếp theo",
    addTagsGenres: "Thêm tag & thể loại",
    genres: "Phân loại",
    tags: "Tag",
    typeAndAdd: "Nhập và bấm Thêm",
    updatedDate: "Ngày cập nhật",
    submit: "Gửi",

    // ===== Edit work =====
    editWorkTitle: "Chỉnh sửa thông tin",
    done: "Hoàn thành",

    // ===== Validations =====
    mustEnterWorkTitle: "Nhập tiêu đề tác phẩm",
    mustEnterChapterTitle: "Nhập tiêu đề chương",
  },

  en: {
    // ===== Common =====
    back: "←",
    save: "Save",
    update: "Update",
    delete: "Delete",
    confirmDelete: "Confirm delete",
    completed: "Completed",
    add: "Add",
    chooseImages: "Choose images…",
    optional: "(optional)",

    // ===== Login =====
    appName: "MyTale",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    invalidCredentials: "Wrong email or password",
    loginFailed: "Sign in failed",

    // ===== Account home (keep old keys for compatibility) =====
    account: "Account",
    personal: "Personal info",
    followings: "Following",
    settings: "Settings",
    language: "Language",
    security: "Account & security",
    authorCenter: "Author center",
    logout: "Sign out",

    // ===== Personal info =====
    personalInfoTitle: "Personal info",
    username: "Username",
    worksCount: (n) => `Works: ${n}`,
    followingCount: (n) => `Following: ${n}`,

    // ===== Followings =====
    followingsTitle: "Following",
    noFollowings: "You are not following any work.",

    // ===== Settings language =====
    vi: "Vietnamese",
    en: "English",

    // ===== Settings security =====
    securityTitle: "Account & security",
    newPassword: "New password",
    confirmNewPassword: "Confirm new password",
    confirm: "Confirm",
    deleteAccount: "Delete account",
    confirmDeleteAccount: "Confirm delete account",
    passwordMismatch: "Password confirmation does not match",
    changePasswordOk: "Password changed successfully",
    changePassword: "Change password",

    // ===== Author center =====
    authorCenterTitle: "Author center",
    createWork: "Create work",
    edit: "Edit",
    noCover: "No cover",
    stats: (c, r, l, cm) => `${c} chap • ${r} reads • ${l} likes • ${cm} comments`,
    noWorks: "No works yet.",
    loading: "Loading…",

    // ===== Create work wizard =====
    createYourWork: "Create your work",
    cover: "Cover",
    title: "Title",
    summary: "Summary",
    createWorkBtn: "Create work",
    writeFirstChapter: "Write first chapter",
    chapterTitle: "Chapter title",
    addIllus:
      "Add illustrations for this chapter (optional). Click to choose or drag-drop multiple images.",
    next: "Next",
    addTagsGenres: "Add tags & genres",
    genres: "Genres",
    tags: "Tags",
    typeAndAdd: "Type and press Add",
    updatedDate: "Updated date",
    submit: "Submit",

    // ===== Edit work =====
    editWorkTitle: "Edit information",
    done: "Completed",

    // ===== Validations =====
    mustEnterWorkTitle: "Please enter work title",
    mustEnterChapterTitle: "Please enter chapter title",
  },
};

const I18nCtx = createContext({ lang: "vi", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "vi");
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // t() hỗ trợ cả giá trị chuỗi lẫn hàm (để truyền biến như worksCount, stats…)
  const t = useMemo(() => {
    return (key, ...args) => {
      const v = dict[lang]?.[key] ?? dict.vi[key] ?? key;
      return typeof v === "function" ? v(...args) : v;
    };
  }, [lang]);

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}
