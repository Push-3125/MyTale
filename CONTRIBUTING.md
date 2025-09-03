# Contributing Guide – Mytale

## 1. Nhánh (Branches)
- `main`: mã ổn định, đã review.
- `develop` (tuỳ chọn): tích hợp trước khi lên `main`.
- Nhánh tính năng: `feature/<short-name>` (vd: `feature/login-ui`)
- Nhánh sửa lỗi: `fix/<short-name>`
- Nhánh tài liệu: `docs/<short-name>`

## 2. Quy tắc commit (Conventional Commits)
- `feat: ...` – tính năng mới
- `fix: ...` – sửa lỗi
- `docs: ...` – tài liệu
- `refactor: ...` – tái cấu trúc, không đổi hành vi
- `test: ...` – thêm/sửa test
- `chore: ...` – việc lặt vặt, cấu hình

Ví dụ: `feat(auth): add JWT login API`

## 3. Quy trình Pull Request (PR)
1) Tạo nhánh → code → tự test.
2) Commit nhỏ gọn, có ý nghĩa.
3) Push và tạo **PR vào `main`** (hoặc `develop` nếu dùng).
4) Yêu cầu **>= 1 review**. Không tự merge PR của chính mình.
5) CI phải **pass** trước khi merge.

## 4. Style & Tools
- Frontend: React + ESLint + Prettier.
- Backend (Java): Spring Boot + Checkstyle (tuỳ chọn).
- Node backend: ESLint + Prettier.
- Format code trước khi commit: `npm run format` / Maven plugin.

## 5. Vấn đề/Issue
- Dùng labels: `frontend`, `backend`, `ai`, `bug`, `enhancement`, `docs`, `good first issue`.
- Gắn milestone/sprint, assignee, estimate (nếu có).
- Mỗi issue nên có: mô tả, acceptance criteria, how to test.

## 6. Bảo mật
- Không commit secrets (.env, API keys).
- Dùng GitHub Secrets cho CI/CD.
