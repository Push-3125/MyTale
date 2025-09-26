// src/features/account/AuthorCenter.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import { useI18n } from "../../i18n";

export default function AuthorCenter() {
  const { t } = useI18n();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const { data } = await http.get("/author/works");
        if (!canceled) setList(Array.isArray(data) ? data : []);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();
    return () => { canceled = true; };
  }, []);

  return (
    <div className="p-4">
      {/* Quay lại trang quản lý tài khoản */}
      <button onClick={() => nav("/account")}>{t("back")}</button>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">{t("authorCenterTitle")}</h2>
        <button
          onClick={() => nav("/author/work/new")}
          className="px-3 py-2 rounded-xl bg-rose-300 font-semibold"
        >
          {t("createWork")}
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">{t("loading")}</div>
      ) : list.length === 0 ? (
        <div className="text-sm text-gray-500">{t("noWorks")}</div>
      ) : (
        <div className="space-y-3">
          {list.map((w) => (
            <WorkCard
              key={w?.id ?? Math.random()}
              w={w}
              onEdit={() => nav(`/author/work/${w?.id}/edit`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkCard({ w, onEdit }) {
  const { t } = useI18n();
  const thumb =
    w?.coverPreview ||
    w?.cover ||
    w?.coverUrl ||
    w?.coverURL ||
    w?.thumbnail ||
    w?.firstChapter?.imagePreviews?.[0] ||
    "";

  return (
    <div className="border rounded-2xl p-3">
      <div className="flex gap-3 items-center">
        {thumb ? (
          <img
            src={thumb}
            alt="cover"
            className="w-16 h-20 object-cover rounded-lg border"
          />
        ) : (
          <div className="w-16 h-20 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
            {t("noCover")}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{w?.title || "—"}</div>
          <div className="text-xs text-gray-500 mt-1">
            {t(
              "stats",
              w?.chapCount ?? 0,
              w?.reads ?? 0,
              w?.likes ?? 0,
              w?.comments ?? 0
            )}
          </div>
        </div>

        <button
          onClick={onEdit}
          className="text-sm px-2 py-1 border rounded-xl whitespace-nowrap"
        >
          {t("edit")}
        </button>
      </div>
    </div>
  );
}
