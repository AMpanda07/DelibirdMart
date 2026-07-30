# 🎁 Delibird Mart

<div align="center">

![Status](https://img.shields.io/badge/Status-Completed%20v1.0-brightgreen)
![Theme](https://img.shields.io/badge/Theme-Pokémon%20Red%2C%20Black%20%26%20White-red)
![MERN](https://img.shields.io/badge/Stack-React%2019%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-blue)
![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-darkgreen)
![Company](https://img.shields.io/badge/Company-CWAN-purple)
![Creator](https://img.shields.io/badge/Creator-ErrorGeko%20%28Ayushman%20Panda%29-orange)

### **Find Your Perfect Pokémon Companion.**

*The official editorial Pokémon adoption marketplace for the Kalos Region.*

</div>

---

# 📖 About Delibird Mart

**Delibird Mart** is an editorial, high-performance Pokémon adoption platform set in the **Kalos Region** (inspired by *Pokémon Legends: Z-A*).

Built by **CWAN** and created by **ErrorGeko (Ayushman Panda)**, the marketplace features an official **Pokémon Red, Pitch Obsidian Black, and Snow White** aesthetic, custom vector Poké Ball branding, Web Audio sound feedback, native JWT authentication, and interactive Trainer Pass Cards backed by **MongoDB Atlas**.

---

# 🎨 Brand & Design System

- **Official Poké Ball Vector Emblem**: HD vector SVG Poké Ball with red shell, gloss reflection, black center band, and glowing core button.
- **Theme Palette**:
  - **Electric Pokémon Red**: `#EE1515` / `#DC2626`
  - **Pitch Obsidian Black**: `#0A0A0C` / `#121216`
  - **Pure Snow White**: `#FFFFFF` & `#F8FAFC`
- **Typography**: `Poppins` (Headings), `Inter` (Body text), and `Space Grotesk` (Numerical values).
- **Web Audio API**: Synthesized futuristic UI clicks, pops, quest chiming, and adoption sound effects.

---

# ✨ Core Completed Features

### 1. 🔐 Native JWT Authentication System
- **Dedicated Sign In & Registration Modal**: Sign in or create a Trainer Pass with Username, Email, Password, Profession, Region, and Age.
- **Backend Hashing**: Built using `bcryptjs` for password hashing and signed 30-day `jsonwebtoken` (JWT) session management.
- **Persistent Sessions**: Validates JWT on launch via `GET /api/v1/auth/me` and stores verified user profiles in MongoDB Atlas.

### 2. 🪪 Holographic Trainer Pass Card
- Digital Trainer Pass displaying avatar, handle, profession, home region, member join date, and adoption counter.
- Live edit mode allowing trainers to update profile attributes persisted directly to MongoDB Atlas via `PUT /api/v1/auth/profile`.

### 3. 🛍️ Pokémon Adoption Marketplace
- **Infinite Scroll & Pagination**: Browse through hundreds of PokéDex entries via PokéAPI integration.
- **Filter Directory**: Filter by Elemental Type, Evolution Stage (Stage 1, 2, 3), Rarity Tier (Common, Uncommon, Rare, Epic, Legendary), Region, and Price Slider.
- **Search & Sort**: Real-time search by name/type and price/BST sorting.

### 4. 🛒 Interactive Cart Drawer & Adoption Bag
- Slide-over adoption bag drawer with item quantity controls, fee calculation, and animated checkout transfer.

### 5. 👥 About CWAN & Creator Directory
- Dedicated `/about` page highlighting company **CWAN** and creator **ErrorGeko (Ayushman Panda)** with pixel art avatar and official contact links.

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
- **Tailwind CSS** (Custom Pokémon Design System)
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

# 📂 Project Structure

```text
DelibirdMart/
├── Frontend/
│   ├── src/
│   │   ├── api/            # Axios API Client
│   │   ├── components/     # PokéBallLogo, Navbar, Footer, PokemonCard, TrainerCardModal, AuthModal, CartDrawerNew
│   │   ├── context/        # AuthContext (JWT REST Auth), CartContext
│   │   ├── pages/          # Home (Redesigned Selection Options), Marketplace, About (CWAN & ErrorGeko)
│   │   ├── services/       # PokéAPI Service
│   │   ├── utils/          # Web Audio Synthesizer (audio.js, sound.js)
│   │   ├── App.jsx         # Root router & Toaster
│   │   └── main.jsx
│   ├── index.css           # Pokémon Red, Black & White Design System
│   └── vite.config.js
│
├── Backend/
│   ├── config/             # MongoDB Atlas connection (db.js)
│   ├── controllers/        # Native auth.controller.js (register, login, me, profile)
│   ├── models/             # User.js schema with bcrypt hooks
│   ├── routes/             # auth.routes.js
│   ├── server.js           # Express app setup
│   └── package.json
│
├── PROJECT_STRUCTURE.md    # Architecture documentation
└── README.md               # Project documentation
```

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

Install root and workspace dependencies:
```bash
# Install root dependencies
npm install

# Run Backend & Frontend concurrently
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