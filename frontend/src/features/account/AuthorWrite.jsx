// src/features/account/AuthorWrite.jsx
import { useParams, useNavigate } from "react-router-dom";

export default function AuthorWrite() {
  const { id } = useParams();
  const nav = useNavigate();
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Back onClick={() => nav(-1)} />
      <h1 className="text-3xl font-bold mb-6">Viết chương (work {id})</h1>
      <input className="w-full border rounded-2xl p-4 mb-4" placeholder="Tiêu đề chương" />
      <textarea className="w-full border rounded-2xl p-4" rows={14} placeholder="Nội dung..." />
      <button className="w-full mt-6 rounded-2xl p-4 bg-pink-300">Lưu chương (demo)</button>
    </div>
  );
}
function Back({ onClick }) {
  return (
    <button className="mb-4 opacity-70" onClick={onClick}>
      ← Quay lại
    </button>
  );
}
