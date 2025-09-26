// src/features/account/Login.jsx
import { useState } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

export default function Login() {
  const { t } = useI18n();
  const nav = useNavigate();

  const [email, setEmail] = useState("demo@mytale.app");
  const [password, setPassword] = useState("123456");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await http.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      nav("/account");
    } catch (e) {
      const status = e?.response?.status;
      const serverMsg = e?.response?.data?.message || "";
      if (status === 400 || /sai email|mật khẩu/i.test(serverMsg)) {
        setErr(t("invalidCredentials"));
      } else {
        setErr(t("loginFailed"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border bg-white shadow-sm overflow-hidden">
        {/* Header vàng + logo */}
        <div className="bg-amber-50 px-6 pt-6 pb-12 text-center relative">
          {/* Logo chữ MyTale (có thể thay bằng <img src="/logo-mytale.png" />) */}
          <div className="text-3xl font-black tracking-tight text-gray-800 select-none">
            <span className="inline-block -rotate-2">My</span>
            <span className="inline-block rotate-1">Tale</span>
          </div>
          {/* Avatar */}
          <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-20 h-20 rounded-full bg-white border shadow flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="px-8 pt-14 pb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")}
            </label>
            <input
              className="w-full rounded-full border px-5 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("password")}
            </label>
            <input
              type="password"
              className="w-full rounded-full border px-5 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {err && <p className="text-red-500 text-sm">{err}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-amber-100 hover:bg-amber-200 active:bg-amber-300 transition font-semibold py-3 text-gray-900"
          >
            {t("signIn")}
          </button>
        </form>
      </div>
    </div>
  );
}
