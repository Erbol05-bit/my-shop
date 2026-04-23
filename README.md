# 🛍️ MyShop — React E-Commerce App

A modern e-commerce web application built with React.

## 🛠️ Tech Stack
- React 18
- React Router v6
- CSS (vanilla)
- DummyJSON API
- LocalStorage

## 📄 Pages
| Page | Route | Access |
|------|-------|--------|
| Home | `/` | Public |
| Products | `/list` | Public |
| Product Details | `/details/:id` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Dashboard | `/dashboard` | User |
| My Products | `/my-items` | User |
| Favorites | `/favorites` | User |
| Add Product | `/items/create` | User |
| Edit Product | `/items/:id/edit` | User |
| Profile | `/profile` | User |
| Admin Panel | `/admin` | Admin |
| 404 | `*` | Public |

## 🔐 Auth
- Register and login with email/password
- Data stored in localStorage
- Admin access: `admin@admin.com`

## ✨ Features
- Full CRUD for products
- Search, filter, sort
- Favorites system
- Role-based access (admin / user)
- Responsive design
- Protected routes

## 📁 Project Structure
src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── utils/
├── context/
└── App.jsx

## ⚡ Getting Started
```bash
npm install
npm run dev
```
