# Smart Clean India 🇮🇳 🧹

An AI-powered civic grievance and road cleanliness tracking platform designed to empower citizens and municipal authorities in maintaining cleaner, smarter cities.

---

## 🌟 Key Features

- **AI Vision Detection**: Automated waste classification (Plastic, Wet Waste, Hazardous, Debris), severity level scoring, and neural confidence calculation.
- **Civic Grievance Reporting**: One-click geo-tagged photo reporting with auto GPS detection and landmark tagging.
- **Interactive Live Map**: Real-time Leaflet map showing reported grievances, resolution status, and zonal distribution across municipal wards.
- **Multi-lingual Support**: Native translations in 7 Indian languages (English, Hindi, Telugu, Tamil, Marathi, Bengali, Kannada).
- **Complaint Tracker**: Live 5-stage grievance resolution tracking (Reported ➔ AI Verified ➔ Assigned ➔ In Progress ➔ Resolved).
- **Municipal Authority Dashboard**: Zonal analytics, severity prioritization, status triage, and CSV export.
- **Node.js & Express Backend**: REST API backend running on port 3000 with a Vite proxy configured for `/api`.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Modern CSS (Glassmorphism + Responsive Design), Vanilla JavaScript (ES6+), Leaflet.js, Chart.js
- **Tooling**: Vite
- **Backend**: Node.js, Express.js, CORS, Dotenv
- **Architecture**: Single Page Application (SPA) with Vite Dev Proxy to Express REST API

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/RikvithReddy07/Smart-clean-india.git
cd Smart-clean-india
```

### 3. Install Dependencies
```bash
# Install frontend tooling dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 4. Running the Application

**Option A: Run Backend & Frontend in Two Terminals**

- **Terminal 1 (Backend - Port 3000):**
  ```bash
  cd backend
  npm start
  ```
- **Terminal 2 (Frontend - Port 5173):**
  ```bash
  npm run dev
  ```

**Option B: Quick Start via Root Scripts**
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/hello` | Health check & connectivity probe |
| `GET` | `/api/status` | Backend status, uptime, and timestamp |
| `GET` | `/api/stats` | Civic metrics (total reports, resolved count, etc.) |
| `GET` | `/api/complaints` | Retrieve all civic complaints (with filters) |
| `POST` | `/api/complaints` | Register a new complaint |
| `GET` | `/api/complaints/:id` | Fetch specific complaint details by ID |

---

## 📱 Cross-Device Access
The Vite server is configured with `host: 0.0.0.0`, allowing other laptops, smartphones, and tablets on the same Wi-Fi network to connect directly via your machine's local IP address or by scanning the in-app QR code.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
