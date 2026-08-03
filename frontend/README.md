<div align="center">

# 📔 Inkwell — Journal App Frontend

**A React (Vite) frontend for the Inkwell journaling app — sign up, log in, and write private journal entries with mood tracking.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Educational-blue)](#license)

[Backend Repository](https://github.com/muskan940/journalApp) · [Report an Issue](https://github.com/muskan940/journal-frontend-react/issues)

</div>

---

## Overview

Inkwell is a private, dark-themed journaling app. This repo contains the React frontend, which connects to the [Inkwell Spring Boot backend](https://github.com/muskan940/journalApp) for authentication and journal data.

## ✨ Features

- **🔐 Sign up & Login** — JWT-based authentication against the backend API
- **📝 Journal Entries** — create, edit, and delete personal entries
- **🎭 Mood Tracking** — entries are color-coded by sentiment (Happy, Sad, Angry, Anxious), with a recent-mood arc in the sidebar
- **🔍 Search** — filter entries by title or content
- **🔔 Toast Notifications** — lightweight in-app feedback instead of browser alerts
- **🌙 Dark, distraction-free design** — a calm, paper-and-ink inspired interface

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Library | React 18 |
| Build Tool | Vite 5 |
| Styling | Plain CSS (custom design system) |
| API Layer | Fetch API |

## 📁 Project Structure

```
src/
├── main.jsx           React entry point
├── App.jsx             Top-level state and screen switching
├── api.js               Backend API helper
├── constants.js          Mood color definitions
├── index.css              Global styling
└── components/
    ├── AuthScreen.jsx    Login and signup
    ├── Sidebar.jsx       Greeting, search, entries list
    ├── Editor.jsx        Entry viewing/writing
    └── Toast.jsx         Notification popups
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+ and npm
- The [Inkwell backend](https://github.com/muskan940/journalApp) running locally (or deployed)

### 1. Clone the repository
```bash
git clone https://github.com/muskan940/journal-frontend-react.git
cd journal-frontend-react
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the backend URL
By default the app expects the backend at `http://localhost:8080/journal`. To point elsewhere, copy `.env.example` to `.env` and update it:
```bash
cp .env.example .env
```
```env
VITE_API_BASE=http://localhost:8080/journal
```

### 4. Run the development server
```bash
npm run dev
```
The app will be available at **`http://localhost:5173`**.

### 5. Build for production
```bash
npm run build
```
Outputs an optimized build to the `dist/` folder, ready for static hosting (Netlify, Vercel, GitHub Pages, etc.).

## 🔒 Notes

- Authentication tokens are kept in memory only (no `localStorage`) — refreshing the page signs you out by design.
- `node_modules/`, `dist/`, and `.env` are excluded from version control via `.gitignore`.

## 📄 License

This project is for personal and educational use.

## 👩‍💻 Author

**Muskan Gupta**

- GitHub: [@muskan940](https://github.com/muskan940)
- LinkedIn: [Muskan Gupta](https://www.linkedin.com/in/muskan-gupta-699817304)
- LeetCode: [MuskanGupta_2005](https://leetcode.com/u/MuskanGupta_2005/)

---

<div align="center">
Built with ☕ and React
</div>
