# 🚀 Deployment Guide

Follow these steps to deploy the **AI Code Reviewer** application to production.

## 📦 Backend: Vercel (FastAPI)

Vercel is excellent for serverless Python applications.

### 1. Database & Cache Prep
- **MongoDB**: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Redis (optional but recommended for rate limiting)**: Create a free Redis instance on [Upstash](https://upstash.com/).

### 2. Update Backend for Serverless
Vercel requires an entry point. Ensure `backend/vercel_app.py` or similar is set (or just use `app/main.py`).

### 3. Deploy to Vercel
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `backend/` directory.
3. Configure the following **Environment Variables** in the Vercel Dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `MONGODB_URL`: Your MongoDB Atlas connection string.
   - `DATABASE_NAME`: `code_reviewer` (or your preferred name).

### 4. Vercel Configuration (`vercel.json`)
Ensure you have a `vercel.json` in the `backend/` folder:
```json
{
  "rewrites": [{ "source": "/api/(.*)", "destination": "/app/main.py" }]
}
```

---

## 🌐 Frontend: Netlify (React/Vite)

Netlify is the preferred way to deploy modern frontend applications.

### 1. Build and Test
Ensure your frontend can build without errors:
```bash
cd frontend
npm run build
```

### 2. Deploy to Netlify
1. Connect your GitHub repository to [Netlify](https://app.netlify.com/).
2. Select the `frontend/` directory as the base directory.
3. Use the following build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist` (or `frontend/dist` depending on setup)

### 3. Environment Variables
Add the following in the Netlify site configuration:
   - `VITE_API_BASE_URL`: The URL of your deployed Vercel backend (e.g., `https://your-backend.vercel.app/api/v1`).

### 4. Handling Client-side Routing
Add a `_redirects` file to the `frontend/public/` folder to prevent 404s on page refresh:
```text
/*    /index.html   200
```

---

## 🛠️ Post-Deployment Checklist
1. **CORS Policy**: Ensure your Backend (Vercel) allows requests from your Frontend (Netlify) domain. Update `CORSMiddleware` in `backend/app/main.py` if necessary.
2. **API Keys**: Double-check that all environment variables are correctly populated in both dashboards.
3. **Database Connectivity**: Verify that MongoDB Atlas allows connections from "anywhere" (0.0.0.0/0) or whitelist the deployment server IPs if possible.
