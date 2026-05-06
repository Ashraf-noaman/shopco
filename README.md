# SHOP.CO — E-Commerce Store

A modern e-commerce storefront built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

---

## ✅ Prerequisites

Make sure you have these installed on your machine before you start:

- **Node.js** version 18 or higher → https://nodejs.org
- **npm** (comes with Node.js) or **yarn**

To check if you already have them, run:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1. Extract the project

Unzip the downloaded file and open the `shop` folder.

### 2. Open a terminal inside the project folder

```bash
cd shop
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in your browser

Go to → **http://localhost:3000**

The page will automatically reload whenever you save a file.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build the app for production |
| `npm run start` | Run the production build locally |
| `npm run lint` | Check for code errors |

---

## 🗂️ Project Structure

```
shop/
├── app/                  # Pages (Next.js App Router)
│   ├── page.tsx          # Home page
│   ├── casual/           # Casual shop page
│   ├── cart/             # Cart page
│   ├── orders/           # Orders page
│   ├── product/[id]/     # Product detail page
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/           # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── contexts/
│   └── AppContext.tsx     # Global state (cart, orders, theme, language)
├── data/
│   ├── index.ts          # Products data
│   └── translations.ts   # English & Arabic translations
└── public/               # Static assets
```

---

## 🛒 Features

- **Add to Cart** — Click any product to add it to your cart
- **Cart Page** — Update quantities, delete items, apply promo code (`SAVE20`)
- **Checkout** — Places your order and moves it to the Orders page
- **Orders Page** — View all your past orders with status badges
- **Dark / Light Mode** — Toggle from the navbar
- **Arabic / English** — Full RTL support, toggle from the navbar
- **Persistent State** — Cart and orders are saved in `localStorage` and survive page refresh

---

## 🔧 Tech Stack

| Tool | Version |
|---|---|
| Next.js | 16.2.4 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Lucide Icons | latest |

---

## 💡 Common Issues

**Port 3000 already in use?**
```bash
npm run dev -- -p 3000
```
Then open http://localhost:3001

**Modules not found after unzipping?**
```bash
npm install
```
Always run this first if you see import errors.

**Changes not showing?**
Hard refresh your browser: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
