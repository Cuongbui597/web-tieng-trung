# Web Cây Cảnh (Next.js App Router)

Website bán cây cảnh + blog nội dung, dùng Next.js App Router.

## Chạy local

```bash
npm install
copy .env.example .env
npm run dev
```

API hiện lưu đơn hàng/liên hệ vào Postgres (Vercel Postgres).

## API endpoints

- `POST /api/contact` (lưu liên hệ)
- `POST /api/orders` (tạo đơn hàng từ trang checkout)

## Deploy Vercel

- Set các env vars trên Vercel (Project Settings → Environment Variables)
- Redeploy

Lưu ý: không commit `.env` hoặc dán secret lên nơi công khai.

## Deploy tự động bằng GitHub Actions (khi Vercel chưa auto update)

Repo đã có workflow: `.github/workflows/vercel-deploy.yml`.

Bạn cần tạo 3 secrets trong GitHub (Repo → Settings → Secrets and variables → Actions):

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Lấy `ORG_ID` và `PROJECT_ID` nhanh nhất:

```bash
npx vercel login
npx vercel link
type .vercel\project.json
```

Nếu không login được bằng CLI (lỗi mạng/timeout), bạn có thể lấy trực tiếp trên Vercel Dashboard:

- Vào Vercel → chọn Project → **Settings → General** để lấy **Project ID**.
- Nếu dùng Team, vào Team/Organization settings để lấy **Team ID** (dùng làm `VERCEL_ORG_ID`).
- Tạo `VERCEL_TOKEN`: Vercel → Account Settings → **Tokens** → tạo token mới.

Sau khi thêm secrets, chỉ cần `git push` lên `main` là Vercel sẽ deploy.

## Tự xóa deployments cũ sau 1 ngày (Vercel)

Repo có workflow: `.github/workflows/cleanup-vercel-deployments.yml`.

- Mặc định: xóa **preview deployments** cũ hơn **24 giờ** (an toàn, vẫn giữ production để rollback).
- Có thể chạy tay: GitHub → Actions → **Cleanup Vercel Deployments** → Run workflow.

Secrets cần có:

- `VERCEL_TOKEN` (bắt buộc)
- `VERCEL_PROJECT_ID` (bắt buộc)
- `VERCEL_TEAM_ID` (tuỳ chọn, nếu project nằm trong Team)

## Admin (xem dữ liệu đã lưu)

- Truy cập: `/admin`
- Bảo vệ bằng Basic Auth qua middleware.
- Cần set env vars trên Vercel:
  - `ADMIN_USER` (tuỳ chọn, mặc định: `admin`)
  - `ADMIN_PASSWORD` (bắt buộc)

## Database (Postgres)

- The app uses Postgres via `@vercel/postgres`.
- Tables are auto-created on first write/read (see `ensureDbReady()` in `app/lib/db.js`).

### Vercel

1) Vercel → **Storage → Postgres** → create a database.
2) Add env var: `POSTGRES_URL` (Vercel can auto-inject this).
3) Redeploy.

## Cấu trúc chính

- `app/`: routing + UI (App Router)
- `app/components/`: các component dùng lại
- `app/api/`: route handlers (backend)
- `content/products/`: nội dung markdown cho sản phẩm
- `content/blog/`: nội dung markdown cho bài viết
- `public/`: assets tĩnh

## Ảnh tĩnh (cách 1: để trong public)

- Bỏ toàn bộ ảnh vào `public/uploads/` (một thư mục dùng chung)
- Trong markdown (frontmatter) chỉ cần trỏ đường dẫn bắt đầu bằng `/uploads/...`

Ví dụ trong `content/products/*.md` hoặc `content/blog/*.md`:

```md
---
image: "/uploads/cay-kim-tien.jpg"
---
```

Sau đó ảnh sẽ truy cập được tại:
- Local: `http://localhost:3000/uploads/cay-kim-tien.jpg`
- Production: `https://<domain>/uploads/cay-kim-tien.jpg`
