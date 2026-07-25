# EduIntel AI Frontend

A Vite + React + TypeScript dashboard for EduIntel AI, ready for deployment with Vercel, Supabase, and a FastAPI backend on Railway.

## Environment variables

Set these in Vercel:

- VITE_API_BASE_URL: your Railway backend URL, for example https://your-backend.railway.app
- VITE_API_URL: same value plus /api/v1, for example https://your-backend.railway.app/api/v1
- VITE_SUPABASE_URL: your Supabase project URL
- VITE_SUPABASE_ANON_KEY: your Supabase anon key

## Deployment steps

1. Build the app locally:
   npm run build
2. Deploy the frontend to Vercel from this repository.
3. Configure the environment variables above in Vercel.
4. Ensure the backend is running on Railway and exposes the same API prefix.
5. In Supabase Auth, add your Vercel domain to the allowed redirect URLs.

## Notes

- The app uses SPA rewrites via vercel.json so deep links work correctly.
- The API client automatically attaches the Supabase access token when available.
