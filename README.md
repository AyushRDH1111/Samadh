# Yoga Marketplace MVP (Full-Stack)

A deployable MVP for a yoga marketplace where teachers list profiles and students can discover, assess, and book sessions.

## Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth
- Frontend: React (Vite) + TailwindCSS
- Payments: Stripe & Razorpay (stubs ready)
- Optional: Zoom API (stub reference), Email (not included)

## Dev Setup
1) Backend
```bash
cd backend
cp .env.example .env
# Edit MONGO_URI, JWT_SECRET, FRONTEND_URL
npm install
npm run dev
```

2) Seed demo users (Mongo shell or your own script):
- Create a student user `student@example.com / password`
- Create a teacher user `teacher@example.com / password`
- POST `/teachers` (with teacher token) to set their profile

3) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173

## Deployment
- Backend: Render/Railway/Fly.io
- DB: MongoDB Atlas
- Frontend: Vercel/Netlify
- CORS: set `FRONTEND_URL` in backend `.env`
