// src/features/account/create/Step1.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fileToDataURL } from "../../../utils/fileToDataURL";

export default function CreateWorkStep1() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverPreview, setCoverPreview] = useState(""); // dataURL
  const [coverName, setCoverName] = useState("");

  const pickCover = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setCoverName(f.name);
    setCoverPreview(await fileToDataURL(f)); // <- data:image/...;base64,xxx
  };

  const goNext = () => {
    if (!title.trim()) {
      alert("Nhập tiêu đề trước đã!");
      return;
    }
    // Đẩy dữ liệu sang bước 2 qua state
    nav("/author/work/new/step2", {
      state: {
        draft: {
          title: title.trim(),
          summary: summary.trim(),
          cover: coverPreview, // dataURL
          coverName,
        },
      },
    });
  };

  return (
    <div className="p-4">
      <button onClick={() => nav(-1)}>←</button>
      <h2 className="text-2xl font-bold text-center mb-4">Tạo tác phẩm</h2>

      {/* Ô chọn ảnh bìa */}
      <div className="border rounded-2xl p-3 mb-3">
        <div className="font-semibold mb-2">Ảnh bìa</div>
        <input type="file" accept="image/*" onChange={pickCover} />
        {coverPreview && (
          <div className="mt-3">
            <img
              src={coverPreview}
              alt="preview"
              className="w-24 h-32 object-cover rounded-md border"
            />
            <div className="text-sm text-gray-500 mt-1">{coverName}</div>
            <button
              className="mt-2 px-3 py-1 text-sm border rounded-xl"
              onClick={() => {
                setCoverPreview("");
                setCoverName("");
              }}
            >
              Xoá ảnh
            </button>
          </div>
        )}
      </div>

      {/* Tiêu đề / Giới thiệu */}
      <input
        className="w-full border rounded-2xl p-3 mb-3"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded-2xl p-3 mb-3"
        rows="6"
        placeholder="Giới thiệu"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <button
        onClick={goNext}
        className="w-full bg-rose-300 rounded-2xl p-3 font-semibold"
      >
        Tiếp theo
      </button>
    </div>
  );
}
