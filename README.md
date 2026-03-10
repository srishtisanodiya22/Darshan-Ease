# DarshanEase (MERN)

Temple darshan management system with online slot booking, real-time crowd status, and admin crowd-flow controls.

## Stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Socket.io
- Frontend: React (Vite), TailwindCSS, React Router, Axios, Socket.io client

## Structure

- `backend/` – Express API, MongoDB models, JWT auth, socket.io
- `frontend/` – React SPA with devotee and admin dashboards

## Backend Setup

```bash
cd backend
cp .env.example .env
# edit .env with your Mongo URI and JWT secret
npm install
npm run dev
```

API runs on `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

SPA runs on `http://localhost:5173`.

Configure API/socket URLs via:

- `backend/.env`: `CLIENT_URL`
- `frontend/.env` (optional): `VITE_API_URL`, `VITE_SOCKET_URL`

