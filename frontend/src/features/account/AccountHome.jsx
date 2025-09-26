import { useEffect, useState } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

const Row = ({ label, to }) => {
  const nav = useNavigate();
  return (
    <button
      onClick={() => nav(to)}
      className="w-full flex items-center justify-between rounded-2xl border px-5 py-4 hover:bg-gray-50 transition"
    >
      <span className="flex items-center gap-3">
        <span className="text-lg">•</span>
        <span className="font-medium">{label}</span>
      </span>
      <span className="text-xl leading-none">›</span>
    </button>
  );
};

export default function AccountHome() {
  const [me, setMe] = useState(null);
  const nav = useNavigate();
  const { t, setLang } = useI18n();

  useEffect(() => {
    (async () => {
      const { data } = await http.get("/account/profile");
      setMe(data);
      // đồng bộ lang từ backend lần đầu
      const s = await http.get("/account/settings");
      if (s.data?.language) setLang(s.data.language);
    })();
  }, [setLang]);

  const signOut = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-8">
      {/* Card trắng – viền bo lớn */}
      <div className="w-full max-w-2xl rounded-3xl border bg-white shadow-sm overflow-hidden">
        {/* Header vàng + chữ MyTale */}
        <div className="bg-amber-50 px-6 pt-6 pb-14 text-center relative">
          <div className="text-3xl font-black tracking-tight text-gray-800 select-none">
            <span className="inline-block -rotate-2">My</span>
            <span className="inline-block rotate-1">Tale</span>
          </div>

          {/* Avatar tròn nổi giống màn Login */}
          <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-24 h-24 rounded-full bg-white border shadow flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Nội dung */}
        <div className="px-6 pt-16 pb-6">
          <h2 className="text-2xl font-bold text-center">{t("account")}</h2>
          <p className="text-center text-gray-600 font-semibold mt-1">
            {me?.name || "—"}
          </p>

          <div className="mt-5 space-y-3">
            <Row label={t("personal")} to="/account/personal" />
            <Row label={t("followings")} to="/account/followings" />
            <Row label={t("settings")} to="/settings" />
            <Row label={t("authorCenter")} to="/author" />
          </div>

          <button
            onClick={signOut}
            className="mt-4 w-full rounded-full bg-amber-100 hover:bg-amber-200 active:bg-amber-300 transition font-semibold py-3 text-gray-900"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
