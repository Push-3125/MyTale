// src/features/account/create/Step2.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateWorkStep2() {
  const nav = useNavigate();
  const { state } = useLocation();
  const draft = state?.draft || {}; // {title, summary, cover, coverName}

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterImages, setChapterImages] = useState([]); // sẽ làm sau

  const next = () => {
    nav("/author/work/new/step3", {
      state: { draft: { ...draft, chapterTitle, chapterImages } },
    });
  };

  return (
    <div className="p-4">
      <button onClick={() => nav(-1)}>←</button>
      <h2 className="text-2xl font-bold text-center mb-4">Viết chương đầu</h2>

      <input
        className="w-full border rounded-2xl p-3 mb-3"
        placeholder="Tiêu đề chương"
        value={chapterTitle}
        onChange={(e) => setChapterTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded-2xl p-3 mb-6"
        placeholder="(Tuỳ chọn) Gắn ảnh minh hoạ ở bước sau"
        rows="8"
        readOnly
      />
      <button
        onClick={next}
        className="w-full bg-rose-300 rounded-2xl p-3 font-semibold"
      >
        Tiếp theo
      </button>
    </div>
  );
}
