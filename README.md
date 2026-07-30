# 🎁 Delibird Mart

<div align="center">

![Status](https://img.shields.io/badge/Status-Completed%20v1.0-brightgreen)
![Theme](https://img.shields.io/badge/Theme-Pokémon%20Red%2C%20Obsidian%20%26%20Snow%20White-red)
![Mode](https://img.shields.io/badge/Mode-Dual%20Light%20%2F%20Dark%20System-blue)
![MERN](https://img.shields.io/badge/Stack-React%2019%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-purple)
![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-darkgreen)
![Company](https://img.shields.io/badge/Company-CWAN-blue)
![Creator](https://img.shields.io/badge/Creator-ErrorGeko%20%28Ayushman%20Panda%29-orange)

### **Find Your Perfect Pokémon Companion.**

*The official editorial Pokémon adoption marketplace for the Kalos Region.*

</div>

---

# 📖 About Delibird Mart

**Delibird Mart** is an editorial, high-performance Pokémon adoption platform set in the **Kalos Region** (inspired by *Pokémon Legends: Z-A*).

Built by **CWAN** and created by **ErrorGeko (Ayushman Panda)**, the marketplace features an official **Pokémon Red, Pitch Obsidian Black, and Snow White** aesthetic, dual **Light & Dark Mode** system, vector Poké Ball branding, Web Audio sound feedback, native JWT authentication with Password Reset, and interactive Trainer Pass Cards backed by **MongoDB Atlas**.

---

# 🎨 Brand & Design System

- **Official Poké Ball Vector Emblem**: HD vector SVG Poké Ball with red shell, gloss reflection, black center band, and glowing core button.
- **Dual Light / Dark Theme Palette**:
  - **Electric Red**: `#EE1515` / `#DC2626`
  - **Dark Mode**: Pitch Obsidian (`#0A0A0C`), Charcoal (`#141418`), Pure White Text (`#FFFFFF`)
  - **Light Mode**: Snow Pearl (`#F8FAFC`), Pure White Cards (`#FFFFFF`), Deep Navy Text (`#0F172A`)
- **Typography**: `Poppins` (Headings), `Inter` (Body text), and `Space Grotesk` (Numerical values).
- **Web Audio API**: Synthesized futuristic UI clicks, pops, quest chiming, and adoption sound effects.

---

# ✨ Core Completed Features

### 1. 🔐 Native JWT Auth & Password Reset System
- **Dedicated Sign In, Registration & Forgot Password**: Sign in, create a Trainer Pass, or reset forgotten passwords via email/username.
- **Backend Hashing & Reset**: Built using `bcryptjs` for password hashing, signed 30-day `jsonwebtoken` (JWT) session management, and `POST /api/v1/auth/reset-password` endpoint.
- **Mandatory Protection**: Accessing `/marketplace`, adopting companions, or viewing trainer options requires an authenticated Trainer Pass.

### 2. 🪪 Holographic Trainer Pass Card
- Digital Trainer Pass displaying avatar, handle, profession, home region, member join date, and adoption counter.
- Live edit mode allowing trainers to update profile attributes persisted directly to MongoDB Atlas via `PUT /api/v1/auth/profile`.

### 3. 🛍️ Pokémon Adoption Marketplace
- **Infinite Scroll & Pagination**: Browse through hundreds of PokéDex entries via PokéAPI integration.
- **Filter Directory**: Filter by Elemental Type, Evolution Stage (Stage 1, 2, 3), Rarity Tier (Common, Uncommon, Rare, Epic, Legendary), Region, and Price Slider.
- **Search & Sort**: Real-time search by name/type and price/BST sorting.

### 4. 📢 Rolling Text Marquee Advertisement Banner
- Continuous rolling marquee text banner on the homepage showcasing sanctuary adoption news, health checks, and holographic pass persistence.

### 5. ⚙️ Responsive Navbar & User Popover Menu
- Sub-navigation bar (`Home`, `Marketplace`, `About`) with an interactive User Settings Icon trigger placed directly beside the `About` button.
- Dropdown popover menu allows switching between Light/Dark mode, viewing Holographic Passes, or Signing In / Out.

### 6. 👥 About CWAN & Creator Directory
- Dedicated `/about` page highlighting company **CWAN** and creator **ErrorGeko (Ayushman Panda)** with custom pixel art avatar and official contact links.

---

# 👤 Creator & Company Credits

| Role | Details |
|---|---|
| **Company** | **CWAN** (Creative Web & Application Network) |
| **Creator** | **ErrorGeko (Ayushman Panda)** |
| **Profile** | Pixel Art Trainer Avatar |

### 🌐 Official Contact Channels
- 📸 **Instagram**: [@lnpcwan](https://www.instagram.com/lnpcwan?utm_source=qr&igsh=MXJzcWlmcGJqcTZseg==)
- 🐦 **X (Twitter)**: [@errorgeko](https://x.com/errorgeko)
- 🐙 **GitHub**: [AMpanda07](https://github.com/AMpanda07)

---

# 🛠️ Tech Stack

### Frontend
- **React 19** & **React Router DOM 7**
- **Vite 8**
- **Tailwind CSS** (Custom Dual-Theme Design System)
- **Framer Motion** (3D card tilt & page transitions)
- **Lucide React** (Vector UI icons)
- **React Hot Toast** (Notification feedback)
- **Axios** (REST Client)

### Backend
- **Node.js** & **Express.js**
- **MongoDB Atlas** & **Mongoose ODM**
- **JWT (JsonWebToken)**
- **bcryptjs** (Password hashing)
- **CORS & dotenv**

---

# 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/AMpanda07/DelibirdMart.git
cd DelibirdMart
```

### 2. Environment Setup

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

### 3. Run Locally

```bash
# Install dependencies & run Backend & Frontend concurrently
npm install
npm run dev
```

- **Frontend App**: `http://localhost:5174/`
- **Backend API**: `http://localhost:5000/`

---

# ⚠ Disclaimer

This is a fan-made portfolio project created for educational purposes. **Pokémon**, **Delibird**, **Poké Ball**, and all related names and character designs belong to **Nintendo**, **GAME FREAK**, and **The Pokémon Company**.

---

<div align="center">

### **Delibird Mart**
*Built with ❤️ by ErrorGeko (Ayushman Panda) · CWAN © 2026*

</div>