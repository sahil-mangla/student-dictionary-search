# Student Search Application

A Single Page Application (SPA) built with React.js and Express.js that allows users to search for student records with lazy loading and highlighted results.

## Features
- **Search with Lazy Loading:** The search triggers only after typing at least 3 characters.
- **Debounced Input:** Implemented a custom `useDebounce` hook (300ms) to optimize API calls.
- **Case-Insensitive search & Edge Cases:** Escapes regex special characters and performs substring searches.
- **Dynamic Dropdown:** Displays up to 5 matching result sets, dynamically updating as you type.
- **Highlight Matching Text:** Matching characters are visually highlighted in the dropdown list.
- **Student Profile View:** Clicking on a dropdown item renders the target student's full info cleanly underneath the search bar.
- **Responsive & Modern UI:** Simple, rich aesthetics with glass-like components and animated elements.

## Tech Stack
- **Frontend:** React.js (Vite), Vanilla CSS, Lucide React (Icons).
- **Backend:** Node.js, Express.js, CORS.
- **Database:** Local JSON File (`students.json`).

## Project Structure
```text
student-search-app/
├── backend/
│   ├── students.json      # Mock dataset (50+ students)
│   ├── server.js          # Express RESTful API
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/    # SearchBar, DropdownList
    │   ├── hooks/         # useDebounce hook
    │   ├── App.jsx        # Main application
    │   └── App.css        # Vanilla CSS Custom styling
    ├── index.html         # Entry point HTML with fonts
    └── package.json
```

## Setup Instructions

### 1. Start the Backend API
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd student-search-app/backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   *The server will run on `http://localhost:5001`.*

### 2. Start the Frontend App
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd student-search-app/frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   *The application will open on `http://localhost:5173` (or the port specified by Vite).*

## Design Choices
- **No NoSQL Database:** Used the local `students.json` directly read by the Node server using `fs` to serve the API dataset, as explicitly stated in the requirements.
- **Vanilla CSS:** Maintained optimal flexibility implementing a modern visually pleasing design manually.
- **Client/Server separation:** Kept concerns strictly separate ensuring full REST principles applied effectively.
