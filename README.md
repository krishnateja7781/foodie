<h1 align="center">
  <br>
  🍔 Foodie
  <br>
</h1>

<h4 align="center">A full-stack food delivery web application with a real-time admin dashboard, Supabase backend, and a modern glassmorphism UI.</h4>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Database%20%26%20Storage-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [License](#license)

---

## 🌟 Overview

**Foodie** is a production-ready food delivery platform built with a modern, three-tier architecture:

| Tier | Technology | Port |
|------|-----------|------|
| Customer App | React + Vite | `5173` |
| Admin Panel | React + Vite | `5174` |
| Backend API | Node.js + Express | `4000` |
| Database & Storage | Supabase (PostgreSQL) | Cloud |

Customers can browse the menu, add items to their cart, place orders, and track delivery status in real-time. Administrators have a dedicated glassmorphism dashboard to manage the menu, monitor statistics, and update order statuses — all synchronized through one Supabase backend.

---

## ✨ Features

### 🛒 Customer App
- Browse full food menu with live search and category filters
- Add / remove items from a persistent cart
- User registration and login (Supabase Auth — session persists on refresh)
- Checkout with delivery address form
- **My Orders** page with a visual order tracking timeline
- Responsive dark UI with glassmorphism styling

### 🖥️ Admin Panel
- **Live Dashboard** — Total revenue, order count, menu items, and pending orders stats
- Order status breakdown with animated progress bars
- **Food List** — Product card grid with image zoom, search, category filter, and remove action
- **Add Item** — Upload product image directly to Supabase Storage with a styled form
- **Order Management** — Update delivery status with instant toast feedback
- Sticky glassmorphism top navbar with live time display

### ⚙️ Backend API
- RESTful API for food, cart, orders, and user management
- Image uploads streamed to Supabase Storage (`food` bucket) via Multer
- JWT-based authentication middleware
- Supabase service role key used for all DB writes (bypasses RLS safely)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18, Vite 5 |
| Styling | Tailwind CSS v4, Custom CSS (Glassmorphism) |
| State Management | React Context API |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| File Storage | Supabase Storage (`food` bucket) |
| Authentication | Supabase Auth |
| HTTP Client | Axios |
| Notifications | React Toastify |
| File Upload | Multer (disk storage) |
| Font | Google Fonts — Outfit |

---

## 📁 Project Structure

```
foodie/
├── backend/                  # Express.js API server
│   ├── config/
│   │   └── supabase.js       # Supabase client (service role)
│   ├── controllers/
│   │   ├── foodController.js # Food CRUD + image upload
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   ├── routes/
│   │   ├── foodRoute.js      # /api/food
│   │   ├── cartRoute.js      # /api/cart
│   │   ├── orderRoute.js     # /api/order
│   │   └── userRoute.js      # /api/user
│   ├── .env                  # ⚠️ Not committed — see below
│   └── server.js
│
├── frontend/                 # Customer-facing React app (port 5173)
│   ├── src/
│   │   ├── components/       # Navbar, Footer, FoodItem, Cart, etc.
│   │   ├── context/
│   │   │   └── StoreContext.jsx
│   │   ├── lib/
│   │   │   └── supabase.js   # Supabase anon client
│   │   └── pages/            # Home, Menu, Cart, PlaceOrder, MyOrders
│   └── .env                  # VITE_BACKEND_URL
│
├── admin/                    # Admin dashboard React app (port 5174)
│   ├── src/
│   │   ├── components/       # Navbar (top horizontal)
│   │   └── pages/            # Dashboard, Add, List, Orders
│   └── .env                  # VITE_BACKEND_URL (if needed)
│
└── supabase/
    └── schema.sql            # Full DB schema + RLS policies + storage setup
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [Supabase](https://supabase.com/) account and project

---

## 🔑 Environment Variables

You must create `.env` files for the backend and frontend manually (they are gitignored for security).

### `backend/.env`
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-secret-key
JWT_SECRET=your_jwt_secret_key
```

### `frontend/.env`
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_BACKEND_URL=http://localhost:4000
```

> ⚠️ **Important:** Use the **service role** key (`SUPABASE_SERVICE_KEY`) in the backend only — never expose it in the frontend. Use the **anon** public key in the frontend.

---

## 🗄️ Database Setup

1. Open your [Supabase Dashboard](https://app.supabase.com/)
2. Navigate to **SQL Editor**
3. Copy the full contents of [`supabase/schema.sql`](./supabase/schema.sql)
4. Paste it into the editor and click **Run**

This will automatically:
- Create all required tables (`profiles`, `products`, `cart`, `orders`)
- Apply Row Level Security (RLS) policies
- Create the `food` public storage bucket
- Set up storage object access policies

---

## ▶️ Running the Application

Open **3 separate terminal windows** from the project root and run one command in each:

### Terminal 1 — Backend API
```bash
cd backend
npm install
npm run server
```
> Runs on `http://localhost:4000`

### Terminal 2 — Admin Panel
```bash
cd admin
npm install
npm run dev
```
> Opens at `http://localhost:5174`

### Terminal 3 — Customer App
```bash
cd frontend
npm install
npm run dev
```
> Opens at `http://localhost:5173`

---

## 🔄 How It Works

```
Customer App (5173) ──┐
                      ├──► Backend API (4000) ──► Supabase DB + Storage
Admin Panel  (5174) ──┘
```

- The **Admin Panel** adds food items → uploaded to Supabase Storage + inserted into `products` table
- The **Customer App** reads from the same `products` table via the backend API
- Both panels share the same Supabase database — changes are instantly reflected across both

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ by <a href="https://github.com/krishnateja7781">Krishna Teja</a></p>
