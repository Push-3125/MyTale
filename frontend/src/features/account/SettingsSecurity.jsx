// src/features/account/SettingsSecurity.jsx
import { useState } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

export default function SettingsSecurity() {
  const { t } = useI18n();
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const nav = useNavigate();

  const changePw = async () => {
    if (pw1 !== pw2) return alert(t("passwordMismatch"));
    await http.post("/account/security/change-password", { newPassword: pw1 });
    alert(t("changePasswordOk"));
    setPw1("");
    setPw2("");
  };

  const deleteAcc = async () => {
    if (!confirm(t("confirmDeleteAccount"))) return;
    await http.post("/account/security/delete-account");
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="p-4">
      <button onClick={() => nav(-1)}>{t("back")}</button>
      <h2 className="text-xl font-bold text-center mb-4">{t("securityTitle")}</h2>

      <div className="border rounded-2xl p-3 mb-3">
        <div className="font-semibold mb-2">{t("changePassword") ?? t("securityTitle")}</div>
        <input
          className="w-full border rounded-xl p-3 mb-2"
          placeholder={t("newPassword")}
          type="password"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
        />
        <input
          className="w-full border rounded-xl p-3 mb-2"
          placeholder={t("confirmNewPassword")}
          type="password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />
        <button onClick={changePw} className="w-full bg-rose-300 rounded-2xl p-3 font-semibold">
          {t("confirm")}
        </button>
      </div>

      <div className="border rounded-2xl p-3">
        <div className="font-semibold text-red-600 mb-2">{t("deleteAccount")}</div>
        <button
          onClick={deleteAcc}
          className="w-full border border-red-400 text-red-600 rounded-2xl p-3 font-semibold"
        >
          {t("confirmDeleteAccount")}
        </button>
      </div>
    </div>
  );
}
