# Employee Management System (EMS) Dashboard

Hey there! This is a responsive Employee Management System dashboard built using **React**, **Tailwind CSS**, and **Lucide Icons**. I designed this with a strong focus on clean code separation, reusability, and a smooth user experience. 

It handles complete employee records management, updates data analytics in real time, and is completely optimized to look great on both desktop monitors and small mobile screens.

## 🚀 Key Features

*   **Global State (Context API):** To avoid messy prop-drilling, the app uses a single data context. Whenever you add, edit, or delete an employee, the metric counters on the dashboard update instantly.
*   **Smart Search (Custom Debounce Hook):** To keep things fast and stop the app from lagging while typing, I built a custom `useDebounce` hook. It waits a split second until you stop typing before filtering the table rows, saving performance.
*   **Smooth UX Loading States:** Instead of boring, blanket loading screens, the app uses targeted loaders. When you first log in, you get a full-page spinner on the Dashboard. But on the Employees tab, the header and search bars stay fully active and interactive while *only* the table content shows a loading spinner.
*   **Full CRUD Operations:** You can add fresh employees, update existing info, or safely delete files with a built-in browser confirmation fallback to prevent accidents.
*   **Mobile-First Design:** On phones, the sidebar tucks away into a smooth animated slide-out menu drawer, and the main table scales with a touch-friendly bottom scrollbar so text never looks cut off or squished.
*   **Decoupled API Layer:** I separated the page layouts from the data-fetching logic inside a clean `services` directory, cleanly simulating how a real production backend would pull data from a database.

## 🛠️ Project Folder Layout

```text
src/
├── assets/          # Mock data files and image assets
├── components/      # Reusable elements (Table, Search bar, Filters, Modals, Loader)
├── context/         # EmployeeContext global state managers
├── hooks/           # Custom performance hooks (useDebounce)
├── pages/           # Primary page views (Dashboard overview & Employees manager)
├── services/        # Mock API backend data action modules (Api.js)
├── index.css        # Typography fonts & global Tailwind styles
└── App.jsx          # App routing definitions and nested layout structures
```

## ⚙️ How to Run It Locally

Want to test it out on your machine? Just run these quick commands in your terminal:

```bash
# 1. Clone this repository
git clone https://github.com

# 2. Open the project folder
cd your-repo-name

# 3. Install all the project packages
npm install

# 4. Start the local development server
npm run dev
```

## 📦 Tech Stack

*   **React** & **Vite** (Core runtime engine)
*   **React Router DOM** (Handles clean webpage switching without reloads)
*   **Tailwind CSS** (Modern utility layout styling grids)
*   **Lucide React** (Vector icons asset system)
*   **React Hot Toast** (Pop-up checkmark alert notifications)
