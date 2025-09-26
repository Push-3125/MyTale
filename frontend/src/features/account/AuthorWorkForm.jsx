import { useEffect, useState } from "react";
import http from "../../api/http";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthorWorkForm({ mode }) {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", summary: "", tags: [], genres: [] });
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      if (mode === "edit") {
        const { data } = await http.get("/author/works");
        const w = data.find((x) => x.id === id);
        if (w) setForm({ title: w.title, summary: w.summary, tags: w.tags || [], genres: w.genres || [] });
      }
    })();
  }, [id, mode]);

  const save = async () => {
    if (mode === "create") {
      await http.post("/author/works", form);
    } else {
      await http.put(`/author/works/${id}`, form);
    }
    nav("/author"); // sau khi lưu quay về danh sách
  };

  const add = (key, val) => {
    if (!val) return;
    setForm((prev) => ({ ...prev, [key]: [...new Set([...(prev[key] || []), val])] }));
  };

  return (
    <div className="p-4">
      {/* Back luôn về /author để tránh vòng lặp lịch sử */}
      <button onClick={() => nav("/author")}>←</button>

      <h2 className="text-xl font-bold text-center mb-4">
        {mode === "create" ? "Tạo tác phẩm" : "Chỉnh sửa thông tin"}
      </h2>

      <div className="space-y-3">
        <input
          className="w-full border rounded-xl p-3"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border rounded-xl p-3"
          rows="5"
          placeholder="Giới thiệu"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />
        <TagPicker title="Phân loại" values={form.genres} onAdd={(v) => add("genres", v)} />
        <TagPicker title="Tag" values={form.tags} onAdd={(v) => add("tags", v)} />

        <button onClick={save} className="w-full bg-rose-300 rounded-2xl p-3 font-semibold">
          Lưu
        </button>
      </div>
    </div>
  );
}

function TagPicker({ title, values, onAdd }) {
  const [input, setInput] = useState("");
  return (
    <div className="border rounded-2xl p-3">
      <div className="font-semibold mb-2">{title}</div>
      <div className="flex gap-2 flex-wrap mb-2">
        {values?.map((v) => (
          <span key={v} className="px-2 py-1 rounded-xl bg-gray-200 text-sm">
            {v}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-xl p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập và bấm Thêm"
        />
        <button
          onClick={() => {
            onAdd(input.trim());
            setInput("");
          }}
          className="px-3 border rounded-xl"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
