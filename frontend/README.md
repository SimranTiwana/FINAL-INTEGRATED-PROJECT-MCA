# Quantity Measurement — React Frontend

A clean, modern React + Vite frontend for the **Quantity Measurement App** Spring Boot backend.

## ✨ Features

| Module | Use Cases |
|---|---|
| Length Converter | UC1, UC2, UC3, UC4, UC5 |
| Weight Converter | UC9 |
| Temperature | UC14 |
| Volume | UC11 |
| Arithmetic (Add/Sub/Div) | UC6, UC7, UC12, UC13 |
| Generic Quantity | UC10 |
| Equality Check | UC1, UC2 |

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set VITE_API_BASE_URL to your Spring Boot base URL
# Default: http://localhost:8080/api
```

### 3. Run development server
```bash
npm run dev
# App opens at http://localhost:5173
```

### 4. Build for production
```bash
npm run build
# Output in /dist — deploy to Netlify, Vercel, or serve via Spring Boot's /static
```

---

## 📁 Folder Structure

```
src/
├── assets/          # Static images, icons
├── components/      # Reusable UI pieces
│   ├── Button.jsx        (primary / secondary / outline / danger variants)
│   ├── Card.jsx          (container with optional hover)
│   ├── EmptyState.jsx    (no-data placeholder)
│   ├── Footer.jsx
│   ├── Loader.jsx        (full-page + inline spinner)
│   ├── Navbar.jsx        (responsive + dark mode toggle)
│   ├── PageHeader.jsx    (consistent page title section)
│   └── ResultCard.jsx    (conversion result display)
├── layouts/
│   └── MainLayout.jsx   (wraps every page with Navbar + Footer)
├── pages/
│   ├── Home.jsx          (hero + feature cards)
│   ├── Converter.jsx     (length/weight unit converter + equality check)
│   ├── Arithmetic.jsx    (add / subtract / divide)
│   ├── Temperature.jsx   (°C / °F / K)
│   ├── Volume.jsx        (L / mL / gal)
│   ├── Generic.jsx       (dynamic — driven by backend)
│   └── NotFound.jsx      (404)
├── routes/
│   └── AppRoutes.jsx    (central React Router config)
├── services/            # Axios API layer
│   ├── api.js            (base axios instance with interceptors)
│   ├── converterService.js
│   ├── arithmeticService.js
│   ├── temperatureService.js
│   ├── volumeService.js
│   └── genericService.js
└── utils/
    ├── units.js          (unit definitions + UNIT_MAP)
    └── helpers.js        (formatNumber, isValidNumber, getErrorMessage…)
```

---

## 🔌 API Endpoints (Spring Boot)

Adjust paths to match your `@RequestMapping` annotations.

| Feature | Method | URL | Body |
|---|---|---|---|
| Convert | POST | `/api/convert` | `{ value, fromUnit, toUnit, type }` |
| Compare | POST | `/api/compare` | `{ value1, unit1, value2, unit2 }` |
| Arithmetic | POST | `/api/arithmetic` | `{ value1, unit1, value2, unit2, operation, targetUnit }` |
| Temperature | POST | `/api/temperature/convert` | `{ value, fromUnit, toUnit }` |
| Volume | POST | `/api/volume/convert` | `{ value, fromUnit, toUnit }` |
| Generic Types | GET | `/api/generic/types` | — |
| Generic Units | GET | `/api/generic/units?type=LENGTH` | — |
| Generic Convert | POST | `/api/generic/convert` | `{ value, fromUnit, toUnit, type }` |

---

## 🎨 Tech Stack

- **React 18** — functional components + hooks only
- **Vite 5** — lightning-fast dev server + HMR
- **Tailwind CSS 3** — utility-first styling with dark mode
- **Axios** — HTTP client with interceptors
- **React Router DOM 6** — client-side routing
- **react-hot-toast** — toast notifications
- **lucide-react** — icon set
- **Google Fonts** — Outfit (display) + DM Mono (numbers)

---

## 🌙 Dark Mode

Click the sun/moon icon in the navbar. Preference is saved to `localStorage` automatically.

---

## 🔧 Extending

**Add a new page:**
1. Create `src/pages/MyPage.jsx`
2. Add a route in `src/routes/AppRoutes.jsx`
3. Add a link to `NAV_LINKS` in `src/components/Navbar.jsx`

**Add new units:**
Edit `src/utils/units.js` — keep values in sync with your Spring Boot `Unit` enum.

**Change API base URL:**
Edit `VITE_API_BASE_URL` in `.env`.
