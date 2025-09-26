// src/features/account/AuthorEdit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../api/http";
import { useI18n } from "../../i18n";

export default function AuthorEdit() {
  const { t } = useI18n();
  const nav = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const { data } = await http.get(`/author/works/${id}`);
        if (canceled) return;
        setTitle(data?.title || "");
        setSummary(data?.summary || "");
        setCoverPreview(
          data?.coverPreview ||
            data?.cover ||
            data?.coverUrl ||
            data?.coverURL ||
            data?.thumbnail ||
            ""
        );
        setGenres(Array.isArray(data?.genres) ? data.genres : []);
        setTags(Array.isArray(data?.tags) ? data.tags : []);
        setIsCompleted(!!data?.isCompleted);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();
    return () => (canceled = true);
  }, [id]);

  const pickCover = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setCoverPreview(String(r.result || ""));
    r.readAsDataURL(f);
  };

  const addOne = (setter, list, value) => {
    const v = (value || "").trim();
    if (!v) return;
    if (!list.includes(v)) setter([...list, v]);
  };

  const update = async () => {
    await http.put(`/author/works/${id}`, {
      title: title.trim(),
      summary: summary.trim(),
      coverPreview,
      genres,
      tags,
      isCompleted,
    });
    alert(t("updated"));
    nav("/author", { replace: true });
  };

  const remove = async () => {
    if (!confirm(t("confirmDeleteWork"))) return;
    await http.delete(`/author/works/${id}`);
    alert(t("deleted"));
    nav("/author", { replace: true });
  };

  if (loading) return <div className="p-4">{t("loading")}</div>;

  return (
    <div className="p-4">
      <button onClick={() => nav(-1)} aria-label={t("back")}>
        ←
      </button>
      <h2 className="text-xl font-bold text-center mb-4">
        {t("editWorkTitle")}
      </h2>

      {/* Cover picker */}
      <div className="border rounded-2xl p-3 mb-4">
        <div className="flex items-center gap-3">
          <label className="w-14 h-14 flex items-center justify-center rounded-full border cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={pickCover} />
            <span className="text-2xl">+</span>
          </label>
          <div className="font-semibold">{t("cover")}</div>
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="cover"
              className="ml-auto w-20 h-24 object-cover rounded-lg border"
            />
          ) : (
            <div className="ml-auto w-20 h-24 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              {t("noCover")}
            </div>
          )}
        </div>
      </div>

      <input
        className="w-full border rounded-xl p-3 mb-3"
        placeholder={t("title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border rounded-xl p-3 mb-4"
        rows={6}
        placeholder={t("summary")}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <Picker
        title={t("genres")}
        values={genres}
        onAdd={(v) => addOne(setGenres, genres, v)}
        placeholder={t("typeAndAdd")}
        addText={t("add")}
      />
      <Picker
        title={t("tags")}
        values={tags}
        onAdd={(v) => addOne(setTags, tags, v)}
        placeholder={t("typeAndAdd")}
        addText={t("add")}
      />

      <div className="flex items-center gap-3 mb-6">
        <span className="font-semibold">{t("completed")}</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <div
            className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-rose-400
                       after:content-[''] after:w-5 after:h-5 after:bg-white after:rounded-full
                       after:translate-x-1 after:transition peer-checked:after:translate-x-5"
          />
        </label>
      </div>

      <button
        onClick={update}
        className="w-full bg-rose-300 rounded-2xl p-3 font-semibold mb-3"
      >
        {t("save")}
      </button>

      <button
        onClick={remove}
        className="w-full border border-rose-400 text-rose-500 rounded-2xl p-3 font-semibold"
      >
        {t("delete")}
      </button>
    </div>
  );
}

function Picker({ title, values, onAdd, placeholder, addText }) {
  const [input, setInput] = useState("");
  return (
    <div className="border rounded-2xl p-3 mb-4">
      <div className="font-semibold mb-2">{title}</div>
      <div className="flex gap-2 flex-wrap mb-2">
        {values.map((v) => (
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
          placeholder={placeholder}
        />
        <button
          onClick={() => {
            onAdd(input);
            setInput("");
          }}
          className="px-3 border rounded-xl"
        >
          {addText}
        </button>
      </div>
    </div>
  );
}
