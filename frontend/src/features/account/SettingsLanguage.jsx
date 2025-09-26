import { useEffect, useState } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

export default function SettingsLanguage(){
  const { lang, setLang, t } = useI18n();
  const [language,setLanguage]=useState(lang);
  const nav=useNavigate();

  useEffect(()=>{(async()=>{
    const {data}=await http.get("/account/settings");
    if (data?.language) { setLanguage(data.language); setLang(data.language); }
  })();},[setLang]);

  const save=async()=>{
    await http.put("/account/settings/language",{language});
    setLang(language);
    localStorage.setItem("lang", language);
    // 👉 replace để không đẩy thêm entry vào history
    nav("/settings", { replace: true });
  };

  return (
    <div className="p-4">
      <button onClick={()=>nav(-1)}>{t("back")}</button>
      <h2 className="text-xl font-bold text-center mb-4">{t("language")}</h2>
      <select value={language} onChange={e=>setLanguage(e.target.value)} className="w-full border rounded-2xl p-3">
        <option value="vi">{t("vi")}</option>
        <option value="en">{t("en")}</option>
      </select>
      <button onClick={save} className="w-full bg-rose-300 rounded-2xl p-3 font-semibold mt-3">{t("save")}</button>
    </div>
  );
}
