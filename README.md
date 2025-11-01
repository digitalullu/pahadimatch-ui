# PahadiMatch - Matrimonial Platform for Uttarakhand & Himachal Pradesh

A beautiful, culturally-authentic matrimonial platform designed specifically for the Pahadi community, featuring Aipan art-inspired design and Himalayan themes.

## 🏔️ Features

- **Phone/OTP Authentication** - Secure login without passwords
- **Bilingual Interface** - Hindi (Devanagari) + English
- **Profile Browsing** - Swipe-style profile discovery with real images
- **4-Step Profile Creation** - Comprehensive profile setup
- **Real-time Chat** - Messaging between matched profiles
- **Interest System** - Send/receive interests with acceptance flow
- **Notifications** - Stay updated on profile views and interests
- **Aipan Art Theme** - Traditional Kumaoni folk art inspired design
- **Himalayan Aesthetics** - Mountain backgrounds and cultural elements

## 📁 Project Structure

```
pahadimatch/
├── backend/                    # FastAPI Backend
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
└── frontend/                  # React TypeScript Frontend
    ├── src/
    │   ├── pages/             # All page components
    │   ├── components/        # Reusable components
    │   ├── api/              # API integration
    │   ├── store/            # Zustand state management
    │   └── types/            # TypeScript definitions
    ├── package.json          # ← IMPORTANT: This is what you need!
    └── .env                  # Environment variables
```

## 🚀 Local Setup Instructions

### Step 1: Navigate to Frontend Directory

The `package.json` is in the **frontend** folder, not at the root!

```bash
# On Windows
cd C:\Users\sagar\codebase\pahadimatch-ui\frontend

# Check if you're in the right place
dir package.json     # Should show the file
```

### Step 2: Install Dependencies

```bash
# Use yarn (preferred)
yarn install

# OR use npm
npm install
```

### Step 3: Create .env File

Create `frontend/.env` with:

```env
REACT_APP_BACKEND_URL=https://api.dev.pahadimatch.com/v1
PORT=3000
```

### Step 4: Start Development Server

```bash
yarn start
# OR
npm start
```

Frontend runs on: http://localhost:3000

## 🎨 Tech Stack

- **React 19** + **TypeScript**
- **Zustand** (State Management)
- **TanStack Query** (API Layer)
- **Tailwind CSS** + **Shadcn/ui**
- **FastAPI** (Backend)
- **MongoDB** (Database)

## 📝 License

MIT License

---

**Made with ❤️ for the Pahadi community**

**पहाड़ी दिलों का मिलन • Where Mountain Hearts Unite**
