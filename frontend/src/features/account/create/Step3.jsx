// src/features/account/create/Step3.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateWorkStep3() {
  const nav = useNavigate();
  const { state } = useLocation();
  const draft = state?.draft || {};

  const submit = () => {
    // Tạm thời quay lại list; sau này gọi API tạo luôn
    nav("/author");
  };

  return (
    <div className="p-4">
      <button onClick={() => nav(-1)}>←</button>
      <h2 className="text-2xl font-bold text-center mb-4">Thêm tag & thể loại</h2>
      <div className="text-sm text-gray-600 mb-4">
        (Stub) Nhận dữ liệu: {draft?.title ? `"${draft.title}"` : "(chưa có)"}
      </div>
      <button
        onClick={submit}
        className="w-full bg-rose-300 rounded-2xl p-3 font-semibold"
      >
        Gửi
      </button>
    </div>
  );
}
