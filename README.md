# 🎁 Delibird Mart — Lumiose City Sanctuary

<div align="center">

<svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="48" fill="#0A0A0C" stroke="#EE1515" stroke-width="2"/>
  <path d="M 2,50 A 48,48 0 0,1 98,50 Z" fill="url(#pokeball-red)"/>
  <defs>
    <linearGradient id="pokeball-red" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EE1515"/>
      <stop offset="100%" stop-color="#C40D0D"/>
    </linearGradient>
  </defs>
  <path d="M 2,50 A 48,48 0 0,0 98,50 Z" fill="#F8FAFC"/>
  <line x1="2" y1="50" x2="98" y2="50" stroke="#0A0A0C" stroke-width="8"/>
  <circle cx="50" cy="50" r="14" fill="#0A0A0C"/>
  <circle cx="50" cy="50" r="9" fill="#FFFFFF" stroke="#0A0A0C" stroke-width="2"/>
  <circle cx="50" cy="50" r="4" fill="#EE1515"/>
</svg>

### **Find Your Perfect Pokémon Companion.**

*The official editorial Pokémon adoption marketplace for the Kalos Region (Lumiose City).*

[![Status](https://img.shields.io/badge/Status-Phase%202%20Completed-brightgreen?style=for-the-badge&logo=github)](#)
[![Version](https://img.shields.io/badge/Version-v2.0.0-blue?style=for-the-badge)](#)
[![Color Schemes](https://img.shields.io/badge/Color%20Schemes-Red%20%7C%20Blue%20%7C%20Cyan%20%7C%20Yellow%20%7C%20Emerald%20%7C%20Purple-red?style=for-the-badge)](#)
[![Dual Theme](https://img.shields.io/badge/Theme-Dual%20Light%20%2F%20Dark%20System-0A0A0C?style=for-the-badge)](#)
[![Stack](https://img.shields.io/badge/Stack-MERN%20%7C%20Vite%208%20%7C%20React%2019-purple?style=for-the-badge&logo=react)](#)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-darkgreen?style=for-the-badge&logo=mongodb)](#)
[![Company](https://img.shields.io/badge/Company-CWAN-blue?style=for-the-badge)](#)
[![Creator](https://img.shields.io/badge/Creator-ErrorGeko%20(Ayushman%20Panda)-orange?style=for-the-badge)](#)

</div>

---

## 📖 Overview

**Delibird Mart** is a high-editorial, high-performance Pokémon adoption platform set in the fictional **Kalos Region (Lumiose City)**. Inspired by modern web design aesthetics and *Pokémon Legends: Z-A*, Delibird Mart offers a full MERN-stack e-commerce experience complete with live dynamic brand theme customization, profile picture presets, native authentication, holographic Trainer Pass IDs, and an extensive PokéDex adoption catalog.

---

## 🎨 Theme & Design System

Delibird Mart features a custom dual light/dark mode design system with full dynamic brand scheme customization:

### 🔴 Primary Brand Color Schemes
Trainers can switch color themes anytime in **App Settings**, which dynamically updates every red/accent element across the entire UI (headers, text gradients, buttons, cards, borders, glows, badges, scrollbars):

- 🔴 **Electric Red**: `#EE1515` (Classic Poké Ball Palette)
- 🔵 **Royal Blue**: `#2563EB` (Cobalt Sanctuary Blue)
- 🔷 **Neon Cyan**: `#06B6D4` (High-Energy Luminous Cyan)
- ⚡ **Thunder Yellow**: `#EAB308` (Electric Spike Yellow)
- 🌿 **Emerald Grass**: `#10B981` (Kalos Meadow Green)
- 🔮 **Psychic Purple**: `#A855F7` (Cosmic Psychic Aura)

### 🌓 Dual Display Modes
- **Pitch Obsidian Dark**: `#0A0A0C` background, `#141418` cards, high-visibility contrast white text `#FFFFFF`.
- **Snow Pearl Light**: `#F8FAFC` background, pure white `#FFFFFF` cards, deep navy `#0F172A` text.

### ✍️ Typography Architecture
- **Headings**: `Poppins` (Clean, bold, athletic display sans)
- **Body**: `Inter` (Legible, modern interface typography)
- **Numbers / PokéCoins**: `Space Grotesk` (Monospaced tech numerical styling)

---

## ✨ Features (Phase 2 Completed)

### 1. ⚙️ System & Trainer Preferences Modal
- **Profile Details**: Live edit trainer handle, profession, home region, and age.
- **Profile Logo Presets**: Choose from pixel art avatars (Trainer, Red, Ash, Serena, Cynthia, Pikachu, Lucario, Delibird) or input a custom avatar image URL with instant global state synchronization across the Navbar, Trainer Card, and Settings.
- **Dynamic Color Schemes**: One-click switching between Red, Blue, Cyan, Yellow, Emerald, and Purple.
- **Light / Dark Mode**: Toggle day and night display modes on demand.

### 2. 🔐 Native REST JWT Auth & Password Reset
- **Auth Modals**: Sign in, register a new Trainer Pass, or reset forgotten passwords (`POST /api/v1/auth/reset-password`).
- **Token Verification**: 30-day JWT persistent session with seamless loading check protection.
- **Route Guarding**: Mandatory sign-in protection for marketplace access, cart adoptions, and trainer pass details.

### 3. 🪪 Holographic Trainer Pass ID
- View official Lumiose Sanctuary Trainer credentials, badge tier, home region, join date, and saved adopted companions history.
- Directly persist updates to **MongoDB Atlas**.

### 4. 🛍️ Pokémon Marketplace & Search Directory
- **Infinite Catalog**: Browse hundreds of Pokémon fetched via PokéAPI with lazy-loading 20-card chunks.
- **Filter Directory**: Filter by Type, Evolution Stage, Rarity Tier, Region, and Max Adoption Fee slider (`₽`).
- **Sorting**: Sort by Featured, Price (Low/High), Rating, and Strongest (BST).

### 5. 🔊 Web Audio API Sound System
- Synthesized audio feedback for UI clicks, pops, category filtering, theme switching, and adoption checkout success.

### 6. 📜 World Disclaimer & Interactive User Guide
- Step-by-step modal explaining the fictional Kalos region setting and user navigation tips.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Core** | React 19, React Router DOM 7, Vite 8 |
| **Styling & Theme** | Tailwind CSS v4, Custom CSS Variables, Glassmorphism, Responsive Grid |
| **Animations & FX** | Framer Motion (3D spring card tilt & page transitions), Web Audio API |
| **Icons & UI** | Lucide React, React Hot Toast |
| **Backend API** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken), bcryptjs password hashing |

---

## 🚀 Getting Started Locally

### 1. Clone Repository
```bash
git clone https://github.com/AMpanda07/DelibirdMart.git
cd DelibirdMart
```

### 2. Environment Configuration

**Backend (`Backend/.env`)**:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@mart.om38tez.mongodb.net/?appName=Mart
JWT_SECRET=your_jwt_secret_key
```

**Frontend (`Frontend/.env`)**:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 3. Install & Start

```bash
# Start Backend
cd Backend
npm install
npm start

# Start Frontend (in a new terminal)
cd Frontend
npm install
npm run dev
```

- **Frontend App**: `http://localhost:5173/`
- **Backend API**: `http://localhost:5000/api/v1`

---

## 👤 Company & Creator Credits

| Role | Details |
|---|---|
| **Company** | **CWAN** (Creative Web & Application Network) |
| **Creator** | **ErrorGeko (Ayushman Panda)** |
| **GitHub** | [@AMpanda07](https://github.com/AMpanda07) |
| **Instagram** | [@curiodynam](https://www.instagram.com/curiodynam) |
| **X (Twitter)** | [@errorgeko](https://x.com/errorgeko) |

---

## ⚠️ Disclaimer

This is a fan-made portfolio project created for educational purposes. **Pokémon**, **Delibird**, **Poké Ball**, **Kalos Region**, and all related names and character designs belong to **Nintendo**, **GAME FREAK**, and **The Pokémon Company**.

---

<div align="center">

### **Delibird Mart**
*Built with ❤️ by ErrorGeko (Ayushman Panda) · CWAN © 2026*

</div>