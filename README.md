# 🛕 DarshanEase

**DarshanEase** is a digital platform designed to simplify temple darshan management by enabling **online booking, time-slot allocation, and real-time crowd updates**.
The system reduces long waiting queues at temples and improves the overall devotee experience through technology.

🔗 **Live Website:** https://darshan-ease-gray.vercel.app/

---

## 📌 Project Overview

In many temples, devotees often face **long waiting lines and crowd mismanagement** during darshan. DarshanEase solves this problem by providing an online system where devotees can:

* Book darshan slots in advance
* Check real-time crowd status
* Avoid long waiting times
* Experience a smoother temple visit

The platform also provides **administrative tools** for temple management to monitor bookings and control crowd flow efficiently.

---

## ✨ Features

### 👤 Devotee Features

* Create an account and log in
* View available darshan slots
* Book darshan slots online
* Check live crowd status
* Manage bookings

### 🛕 Admin Features

* Secure admin login
* Manage darshan slots
* Monitor bookings
* Update crowd status
* Improve crowd management

### ⚡ System Features

* Slot-based darshan scheduling
* Real-time crowd updates
* Secure authentication
* Responsive UI for all devices

---

## 🏗️ Tech Stack

### Frontend

* **React (Vite)**
* **TailwindCSS**
* Axios
* React Router

### Backend

* **Node.js**
* **Express.js**
* JWT Authentication
* REST APIs

### Database

* **MongoDB Atlas**

### Deployment

* Frontend hosted on **Vercel**
* Backend hosted on **Render**

---

## 🧩 Project Architecture

```
User
  │
  ▼
Frontend (React + Vite)
  │
  ▼
Backend API (Node.js + Express)
  │
  ▼
MongoDB Atlas Database
```

---

## 📂 Project Structure

```
darshan-ease
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── scripts
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/srishti_sanodiya/darshan-ease.git
cd darshan-ease
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🌍 Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas


## 🎯 Future Improvements

* Temple selection system
* QR code based entry verification
* Real-time analytics dashboard
* Mobile app integration
* Notification system for devotees

---


## 📜 License

This project is created for **educational and demonstration purposes**.

---

## 👨‍💻 Author

Developed by **Srishti Sanodiya**

---

⭐ If you found this project useful, consider **starring the repository**!
