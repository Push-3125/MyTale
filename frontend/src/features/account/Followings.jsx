// src/features/account/Followings.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import http from "../../api/http";
import { useI18n } from "../../i18n";

export default function Followings() {
  const { t } = useI18n();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const location = useLocation();

  // Refetch mỗi lần điều hướng vào trang này
  useEffect(() => {
    let canceled = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await http.get("/account/followings");
        if (!canceled) setList(Array.isArray(data) ? data : []);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();
    return () => {
      canceled = true;
    };
  }, [location.key]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 flex items-start justify-center">
      {/* CARD bọc nội dung – đặt min-height để cao như trang Personal Info */}
      <div className="w-full max-w-2xl min-h-[720px] rounded-3xl border bg-white shadow-sm overflow-hidden relative">
        {/* Banner vàng + tiêu đề MyTale */}
        <div className="bg-amber-50 border-b px-4 sm:px-6 py-5">
          <button
            onClick={() => nav(-1)}
            aria-label={t("back")}
            className="absolute left-4 top-4 text-xl"
          >
            {t("back")}
          </button>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-center text-slate-800">
            MyTale
          </h1>
        </div>

        {/* Tiêu đề trang */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-6 sm:mt-8 mb-4 sm:mb-6">
          {t("followingsTitle")}
        </h2>

        {/* Nội dung */}
        <div className="px-4 sm:px-6 pb-8">
          {loading ? (
            <div className="text-sm text-gray-500">{t("loading")}</div>
          ) : list.length === 0 ? (
            <div className="text-sm text-gray-500">{t("noFollowings")}</div>
          ) : (
            <div className="space-y-3">
              {list.map((w) => (
                <FollowCard key={w.id} w={w} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FollowCard({ w }) {
  const thumb =
    w?.coverPreview ||
    w?.cover ||
    w?.coverUrl ||
    w?.coverURL ||
    (w?.firstChapter?.imagePreviews?.[0] ?? "");

  return (
    <div className="border rounded-2xl p-3 flex gap-3 items-center">
      {thumb ? (
        <img
          src={thumb}
          alt="cover"
          className="w-16 h-16 rounded-xl object-cover border"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-100 border rounded-xl flex items-center justify-center text-xs text-gray-500">
          No cover
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{w.title || "—"}</div>
        <div className="text-sm text-gray-500 truncate">
          {w.summary || ""}
        </div>
      </div>
    </div>
  );
}
