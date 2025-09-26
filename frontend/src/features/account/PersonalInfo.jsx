// src/features/account/PersonalInfo.jsx
import { useEffect, useState } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

export default function PersonalInfo() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    worksCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    (async () => {
      const { data } = await http.get("/account/profile");
      setForm(data);
    })();
  }, []);

  const save = async () => {
    await http.put("/account/profile", { name: form.name });
    nav("/account");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-8">
      {/* Card */}
      <div className="w-full max-w-2xl rounded-3xl border bg-white shadow-sm overflow-hidden relative">
        {/* Back */}
        <button
          onClick={() => nav(-1)}
          className="absolute left-4 top-4 text-2xl leading-none"
          aria-label={t("back")}
        >
          {t("back")}
        </button>

        {/* Header vàng + MyTale (không avatar) */}
        <div className="bg-amber-50 px-6 py-10 text-center">
          <div className="text-3xl font-black tracking-tight text-gray-800 select-none">
            <span className="inline-block -rotate-2">My</span>
            <span className="inline-block rotate-1">Tale</span>
          </div>
        </div>

        {/* Nội dung */}
        <div className="px-6 py-10">
          <h2 className="text-2xl font-bold text-center mb-4">
            {t("personalInfoTitle")}
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-sm block mb-1">{t("username")}</label>
              <input
                className="w-full border rounded-2xl p-3"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <input
              className="w-full border rounded-2xl p-3"
              value={t("worksCount", form.worksCount)}
              readOnly
            />
            <input
              className="w-full border rounded-2xl p-3"
              value={t("followingCount", form.followingCount)}
              readOnly
            />
            <input
              className="w-full border rounded-2xl p-3"
              value={`Email: ${form.email || ""}`}
              readOnly
            />

            <button
              onClick={save}
              className="w-full rounded-full bg-amber-100 hover:bg-amber-200 active:bg-amber-300 transition font-semibold p-3 text-gray-900"
            >
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
