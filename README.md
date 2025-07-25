# Habit Tracker MVP

A web application built with Next.js that enables users to create, manage, and track daily habits with user authentication, CRUD operations, multi-day tracking, and progress visualization. Styled with CSS modules, the app provides a responsive and user-friendly experience. This project was developed as a group effort for Phase 2 of our coding bootcamp, demonstrating collaborative development and Git-based workflows.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Team Contributions](#team-contributions)
- [Branch Management](#branch-management)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features
- **User Authentication**:
  - Login with predefined credentials (e.g., `user1`/`password123`, `user2`/`password456`).
  - Logout functionality with session management.
  - Unauthenticated users are redirected to the login page.
- **Habit Management**:
  - Create, read, update, and delete (CRUD) habits.
  - Edit habit names and mark habits as complete for the current day.
  - Reset habit progress to start fresh.
- **Multi-Day Tracking**:
  - Track habit completion over multiple days with a 7-day calendar grid.
- **Progress Visualization**:
  - View habit streaks, total completions, and weekly completion percentages via progress bars.
- **Responsive Design**:
  - Mobile-friendly UI using CSS modules for scoped styling.
- **User Experience**:
  - Loading spinners during data fetching.
  - Error messages for failed actions (e.g., invalid login, API errors).

## Tech Stack
- **Frontend**: Next.js 14.2.5, React 18, CSS Modules
- **Backend**: Next.js API routes
- **State Management**: React Context (`AuthContext`)
- **Data Storage**: JSON files (`data/users.json`, `data/habits.json`)
- **Utilities**: Custom API client (`utils/api.js`), date helpers (`utils/dateHelpers.js`)
- **Development**: Node.js (v18+ recommended), npm (v8+)
- **Version Control**: Git, with branches `development` and `shelton/editable-habits`

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd phase-2-final-project-habit-tracker
   ```
2. **Switch to the `development` Branch**:
   ```bash
   git checkout development
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Set Up Data Files**:
   Ensure `data/users.json` and `data/habits.json` exist:
   ```bash
   mkdir -p data
   echo '[{"id":"1","username":"user1","password":"password123"},{"id":"2","username":"user2","password":"password456"}]' > data/users.json
   echo '[]' > data/habits.json
   ```
5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Usage
1. **Access the App**:
   Open `http://localhost:3000` in a browser (Firefox or Chrome recommended).
2. **Log In**:
   - Use credentials: `user1`/`password123` or `user2`/`password456`.
   - Invalid credentials display an error message.
3. **Manage Habits**:
   - **Create**: Enter a habit name in the form and submit.
   - **Edit**: Update habit names or mark as complete for the day.
   - **Delete**: Remove unwanted habits.
   - **Reset**: Clear progress for a habit.
4. **Track Progress**:
   - View a 7-day completion grid and progress bars showing streaks and weekly percentages.
5. **Log Out**:
   Click “Logout” in the navigation bar to return to the login page.

## Project Structure
```
├── components/            # React components
│   ├── HabitForm.jsx      # Form for creating/editing habits
│   ├── HabitList.jsx      # List of habits with CRUD actions
│   ├── NavBar.jsx         # Navigation bar with login/logout
│   ├── CalendarGrid.jsx   # 7-day completion grid
│   ├── ProgressBar.jsx    # Progress visualization
│   ├── LoadingSpinner.jsx # Loading indicator
│   ├── ErrorMessage.jsx   # Error display
├── context/               # React Context
│   ├── AuthContext.js     # User session management
├── data/                  # JSON data storage
│   ├── habits.json        # Habit data
│   ├── users.json         # User credentials
├── pages/                 # Next.js pages and API routes
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js   # Login endpoint
│   │   ├── habits.js      # Habit CRUD endpoint
│   │   ├── progress.js    # Progress analytics endpoint
│   ├── index.js           # Home page
│   ├── login.js           # Login page
│   ├── _app.js            # App wrapper
│   ├── _document.js       # HTML template
├── styles/                # CSS modules
│   ├── globals.css        # Global styles
│   ├── Home.module.css    # Home page styles
│   ├── HabitForm.module.css
│   ├── HabitList.module.css
│   ├── NavBar.module.css
│   ├── Login.module.css
│   ├── CalendarGrid.module.css
│   ├── ProgressBar.module.css
├── utils/                 # Utility functions
│   ├── api.js             # API client
│   ├── dateHelpers.js     # Date calculations
├── package.json           # Dependencies and scripts
```

## Team Contributions
The project was developed collaboratively by a team including:

- **Shamolah**:
  - **Role**: Lead developer, merge manager, debugger.
  - **Contributions**:
    - Built initial app structure in `development` branch, including `pages/index.js`, `components/HabitForm.jsx`, and `components/HabitList.jsx` for basic CRUD.
    - Implemented `utils/api.js` and `data/habits.json` for data management.
    - Merged `shelton/editable-habits` into `development` on July 24, 2025, resolving conflicts in `components/HabitForm.jsx`, `components/HabitList.jsx`, `components/NavBar.jsx`, `pages/index.js`, `styles/HabitForm.module.css`, `styles/HabitList.module.css`, `styles/Home.module.css`, and `styles/globals.css`.
    - Fixed syntax error in `components/HabitList.jsx` (CSS content issue).
    - Debugged server termination and proxy errors on Sylvia’s PC.
- **Sylvia Wahome**:
  - **Role**: Developer, authentication and UI specialist.
  - **Contributions**:
    - Developed `shelton/editable-habits` branch, adding authentication (`pages/login.js`, `context/AuthContext.js`, `pages/api/auth/login.js`, `data/users.json`).
    - Implemented editable habits and progress tracking (`components/CalendarGrid.jsx`, `components/ProgressBar.jsx`, `pages/api/progress.js`).
    - Styled components with CSS modules (`styles/Login.module.css`, `styles/HabitList.module.css`, etc.).
    - Tested on her Ubuntu PC (`shee001@shee001`), reporting issues on July 24, 2025.
- **Other Members** (assumed):
  - Contributed to initial setup, additional components (e.g., `LoadingSpinner.jsx`), or testing in `development` branch.

## Branch Management
- **development**: Main integration branch for testing and deployment. Contains the merged app with all features.
- **shelton/editable-habits**: Feature branch by Sylvia, introducing authentication, editable habits, and progress visualization. Merged into `development` on July 24, 2025.
- **Merge Workflow**:
  - Conflicts resolved by prioritizing `shelton/editable-habits` for authentication and UI.
  - Commands:
    ```bash
    git checkout development
    git merge shelton/editable-habits
    git add .
    git commit -m "Merge shelton/editable-habits into development"
    git push origin development
    ```
  - Push rejections resolved with `git pull origin development --no-rebase`.

## Troubleshooting
- **Server Terminates Immediately**:
  - **Check Node.js Version**:
    ```bash
    node --version
    ```
    Install v18+ if needed:
    ```bash
    sudo npm install -g n
    sudo n lts
    ```
  - **Reinstall Dependencies**:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
  - **Check Port 3000**:
    ```bash
    lsof -i :3000
    kill -9 <pid>
    ```
    Or use another port:
    ```bash
    npm run dev -- --port 3001
    ```
  - **Debug**:
    ```bash
    NODE_DEBUG=next npm run dev
    ```
- **“Check Proxy” Browser Error**:
  - **Disable System Proxy** (Ubuntu):
    ```bash
    gsettings set org.gnome.system.proxy mode 'none'
    ```
  - **Allow Port 3000**:
    ```bash
    sudo ufw allow 3000
    ```
  - **Verify Localhost**:
    ```bash
    ping localhost
    ```
    Ensure `127.0.0.1 localhost` in `/etc/hosts`.
  - Test with `curl http://localhost:3000`.
- **File Errors**:
  - Verify case-sensitive paths (e.g., `HabitList.jsx`).
  - Recreate missing files (e.g., `data/users.json`).
- **Debugging Tools**:
  - Install React DevTools: [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).
  - Check browser console (F12) and network tab.

## Future Improvements
- Replace JSON files with a database (e.g., MongoDB).
- Add unit tests with Jest.
- Implement JWT for secure authentication.
- Optimize performance with Next.js fetch logging.
- Enhance UI with animations or charts.

## License
This project is licensed under the MIT License.
