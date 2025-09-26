import { useEffect, useState } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

export default function Settings(){
  const [language,setLanguage]=useState("vi");
  const nav=useNavigate();
  const { t } = useI18n();

  useEffect(()=>{(async()=>{
    const {data}=await http.get("/account/settings");
    setLanguage(data.language);
  })();},[]);

  return (
    <div className="p-4">
      <button onClick={()=>nav(-1)}>{t("back")}</button>
      <h2 className="text-xl font-bold text-center mb-4">{t("settings")}</h2>
      <button onClick={()=>nav("/settings/language")} className="w-full border rounded-2xl p-4 my-2 flex justify-between">
        <span>{t("language")}</span><span>{language} ▾</span>
      </button>
      <button onClick={()=>nav("/settings/security")} className="w-full border rounded-2xl p-4 my-2 flex justify-between">
        <span>{t("security")}</span><span>›</span>
      </button>
    </div>
  );
}
