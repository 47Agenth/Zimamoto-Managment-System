# Zimamoto Management System

A Tanzania Fire and Rescue management prototype with role-based dashboards, station operations, incident logging, vehicle management, and multilingual support.

## Features
- Government-style login page inspired by e-Utendaji dashboards.
- Simulated authentication using checknumber and password.
- Role-based dashboard content for Kamanda wa Mkoa, Kamanda wa Kituo, Mkuu wa Zamu, Askari Zimamoto, Fundi Magari, Afisa wa Vifaa.
- Dashboard summary of stations, tasks, incidents, vehicles, equipment, shifts, and notifications.
- Station CRUD operations and detailed station lists.
- Task management with assignment, deadlines, priorities, and statuses.
- Incident logging and vehicle inventory.
- Shift management and feedback submission.
- English/Kiswahili language toggle.

## Setup
1. Open the workspace in VS Code.
2. Install dependencies:

```bash
cd /Users/maxpro/Desktop/Zimamoto\ Managment\ System
npm install --cache ./npm-cache --no-audit --no-fund
```

3. Start the server:

```bash
npm start
```

4. Open your browser to `http://localhost:3000`.

## Sample login credentials
- `KAMANDA001` / `admin123`
- `KAMANDA002` / `station123`
- `ZAMU001` / `shift123`
- `ASKARI001` / `askari123`
- `FUNDIA001` / `mechanic123`
- `VIFAA001` / `equipment123`

## Notes
- This is a frontend/backend prototype using in-memory data.
- For production, add persistent storage, authorization, and real authentication.
# Zimamoto-Managment-System
# Zimamoto-Managment-System
