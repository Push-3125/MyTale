// src/features/account/AuthorCreate.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import { useI18n } from "../../i18n";

export default function AuthorCreate() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [step, setStep] = useState(1);

  // ===== BƯỚC 1 =====
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const handlePickCover = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setCoverUrl(reader.result);
    reader.readAsDataURL(f);
  };

  // ===== BƯỚC 2 =====
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterImages, setChapterImages] = useState([]); // dataURL[]
  const filePickRef = useRef(null);

  const filesToDataURLs = (files) =>
    Promise.all(
      Array.from(files || []).map(
        (f) =>
          new Promise((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.onerror = rej;
            r.readAsDataURL(f);
          })
      )
    );

  const appendFiles = async (files) => {
    const urls = await filesToDataURLs(files);
    if (urls.length) setChapterImages((prev) => [...prev, ...urls]);
  };
  const handlePickChapterImages = async (e) => appendFiles(e.target.files);
  const onDropOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const onDrop = async (e) => {
    e.preventDefault(); e.stopPropagation();
    await appendFiles(e.dataTransfer?.files);
  };
  const removeChapterImage = (idx) =>
    setChapterImages((prev) => prev.filter((_, i) => i !== idx));

  // ===== BƯỚC 3 =====
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");

  const addOne = (setter, list, value) => {
    const v = (value || "").trim();
    if (v && !list.includes(v)) setter([...list, v]);
  };

  // ===== Điều hướng =====
  const goBack = () => (step === 1 ? nav("/author") : setStep((s) => s - 1));
  const nextFromStep1 = () => {
    if (!title.trim()) return alert(t("mustEnterWorkTitle"));
    setStep(2);
  };
  const nextFromStep2 = () => {
    if (!chapterTitle.trim()) return alert(t("mustEnterChapterTitle"));
    setStep(3);
  };

  // ===== Submit =====
  const submitAll = async () => {
    const payload = {
      title: title.trim(),
      summary: summary.trim(),
      coverPreview: coverUrl,
      genres,
      tags,
      firstChapter: {
        title: chapterTitle.trim(),
        imagePreviews: chapterImages,
      },
      updatedAt,
      reads: 0,
      likes: 0,
      comments: 0,
      chapCount: 0,
    };
    await http.post("/author/works", payload);
    nav("/author");
  };

  return (
    <div className="p-4">
      <button onClick={goBack}>{t("back")}</button>

      {/* ======= STEP 1 ======= */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-center mb-4">
            {t("createYourWork")}
          </h2>

          <div className="border rounded-2xl p-3 mb-4">
            <div className="flex items-center gap-3">
              <label className="w-14 h-14 flex items-center justify-center rounded-full border cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePickCover}
                />
                <span className="text-2xl">+</span>
              </label>
              <div className="font-semibold">{t("cover")}</div>

              {coverUrl && (
                <img
                  src={coverUrl}
                  alt="cover"
                  className="ml-auto w-20 h-24 object-cover rounded-lg border"
                />
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
            className="w-full border rounded-xl p-3 mb-6"
            rows={6}
            placeholder={t("summary")}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <button
            onClick={nextFromStep1}
            className="w-full bg-rose-300 rounded-2xl p-3 font-semibold"
          >
            {t("createWorkBtn")}
          </button>
        </div>
      )}

      {/* ======= STEP 2 ======= */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-center mb-4">
            {t("writeFirstChapter")}
          </h2>

          <input
            className="w-full border rounded-xl p-3 mb-3"
            placeholder={t("chapterTitle")}
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />

          <div
            onDragOver={onDropOver}
            onDragEnter={onDropOver}
            onDrop={onDrop}
            className="border-2 border-dashed rounded-2xl p-4 mb-4 min-h-[160px] flex flex-col gap-3"
          >
            <div className="text-gray-500 text-sm">{t("addIllus")}</div>

            <div className="flex flex-wrap gap-2">
              {chapterImages.map((url, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-lg overflow-hidden border"
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeChapterImage(i)}
                    className="absolute top-1 right-1 text-xs bg-black/60 text-white rounded px-1"
                    title={t("delete")}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={() => filePickRef.current?.click()}
                className="px-3 py-2 border rounded-xl"
              >
                {t("chooseImages")}
              </button>
              <input
                ref={filePickRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePickChapterImages}
              />
            </div>
          </div>

          <label className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-rose-400 text-white text-2xl flex items-center justify-center shadow-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePickChapterImages}
            />
            🖼️
          </label>

          <button
            onClick={nextFromStep2}
            className="w-full bg-rose-300 rounded-2xl p-3 font-semibold"
          >
            {t("next")}
          </button>
        </div>
      )}

      {/* ======= STEP 3 ======= */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-center mb-4">
            {t("addTagsGenres")}
          </h2>

          <Picker
            title={t("genres")}
            placeholder={t("typeAndAdd")}
            values={genres}
            onAdd={(v) => addOne(setGenres, genres, v)}
          />
          <Picker
            title={t("tags")}
            placeholder={t("typeAndAdd")}
            values={tags}
            onAdd={(v) => addOne(setTags, tags, v)}
          />

          <div className="border rounded-2xl p-3 mb-6">
            <div className="font-semibold mb-2">{t("updatedDate")}</div>
            <input
              type="date"
              className="border rounded-xl p-2"
              value={updatedAt}
              onChange={(e) => setUpdatedAt(e.target.value)}
            />
          </div>

          <button
            onClick={submitAll}
            className="w-full bg-rose-300 rounded-2xl p-3 font-semibold"
          >
            {t("submit")}
          </button>
        </div>
      )}
    </div>
  );
}

function Picker({ title, values, onAdd, placeholder }) {
  const { t } = useI18n();
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
          {t("add")}
        </button>
      </div>
    </div>
  );
}
