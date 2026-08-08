# Zimamoto Management System Project Plan

## Overview
A management system for Tanzania Fire and Rescue Services designed for government operations. It includes user roles, station management, task workflows, incident logging, vehicle management, inventory, shift schedules, notifications, and analytics.

## Project Phases
1. Project Setup
2. Authentication and User Roles
3. Dashboard
4. Station Management
5. Task Management
6. Incident Management
7. Vehicle Management
8. Equipment and Inventory
9. Training Management
10. Shift Management
11. Feedback System
12. Notifications
13. Reports and Analytics
14. System Settings
15. Testing
16. Deployment

## User Roles and Permissions
- Kamanda wa Mkoa: Full access, manage stations, tasks, incidents, vehicles, reports.
- Kamanda wa Kituo: Manage station tasks, station personnel, view local incidents and assets.
- Mkuu wa Zamu: Oversee shift schedules, review tasks and incident responses, provide feedback.
- Askari Zimamoto: View assigned tasks, shift schedules, incident details, submit feedback.
- Fundi Magari: Manage vehicle checks, repairs, maintenance schedules, vehicle assignment.
- Afisa wa Vifaa: Track equipment status, log damaged items, request replacements.
- Viewer / Read-only: View dashboards, reports, and station resources.

## Dashboard Requirements
- Summary cards for users, stations, tasks, completed tasks, in-progress tasks, delayed tasks.
- Vehicle status overview: active vs maintenance.
- Inventory health: damaged equipment count.
- Incident reports and notifications summary.
- Shift schedule snapshot.

## Database Design
### Entities
- users
- roles
- stations
- tasks
- incidents
- vehicles
- equipment
- notifications
- shifts
- feedback
- audit_logs

### ERD Explanation
- users belong to roles.
- tasks assigned to stations and/or officers.
- incidents link to vehicles, equipment, and officers.
- vehicles and equipment belong to stations.
- shifts assigned to officers and stations.
- feedback linked to users and tasks.
- audit_logs track user activity.

## Tables and SQL Schema
- roles(id, code, label)
- users(id, name, email, password_hash, role_id, station_id, active)
- stations(id, name, location, commander, status)
- tasks(id, title, assigned_station_id, status, deadline, priority, conditions, created_by, updated_at)
- task_assignments(id, task_id, user_id, station_id)
- incidents(id, type, location, date, report, created_by)
- incident_vehicles(id, incident_id, vehicle_id)
- incident_equipment(id, incident_id, equipment_id)
- vehicles(id, plate, chassis, engine, model, capacity, fuel, insurance, status, station_id)
- equipment(id, name, status, station_id, replacement_needed)
- notifications(id, title, message, type, date, active)
- shifts(id, user_id, station_id, shift_type, date)
- feedback(id, source, message, created_at)
- audit_logs(id, user_id, action, table_name, record_id, details, created_at)

## Laravel Migration Plan
- Create roles, users, stations, tasks, incidents, vehicles, equipment, notifications, shifts, feedback, audit_log tables.
- Add foreign keys for relational integrity.
- Seed roles and example stations.

## REST API Endpoints
- GET /api/roles
- GET /api/dashboard
- GET /api/stations
- POST /api/stations
- PUT /api/stations/:id
- DELETE /api/stations/:id
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- GET /api/incidents
- POST /api/incidents
- GET /api/vehicles
- POST /api/vehicles
- GET /api/equipment
- GET /api/notifications
- GET /api/shifts
- POST /api/feedback
- POST /api/auth/login
- POST /api/auth/logout

## Authentication and Security
- Role-based access control.
- Secure password hashing.
- HTTPS for production.
- Input validation and sanitization.
- Audit logging for station, task, incident, vehicle changes.

## UI Pages
- Login
- Dashboard
- Stations
- Tasks
- Incidents
- Vehicles
- Equipment
- Shifts
- Feedback
- Reports
- Settings

## Folder Structure
- public/
  - index.html
  - styles.css
  - app.js
- server.js
- package.json
- README.md
- docs/project_plan.md

## Development Roadmap
- MVP: frontend, REST API, sample data.
- Phase 2: authentication, persistence, file uploads.
- Phase 3: advanced reports, analytics, real-time notifications.

## Testing Plan
- Unit test API endpoints.
- E2E test flows for role dashboards.
- Accessibility and mobile responsiveness.

## Deployment Guide
- Install Node.js.
- Run `npm install`.
- Start with `npm start`.
- Configure environment variables for production.
- Use a process manager like PM2.

## Big Task List for Coding Assistant
- Scaffold backend data and routes.
- Build frontend dashboard UI.
- Add station CRUD.
- Add task management and assignment.
- Add incident logging UI.
- Add vehicle registration form.
- Add equipment status dashboard.
- Add shift roster.
- Add role-based view restrictions.
- Add language switcher.
- Add report summary cards.
- Add feedback submission.
- Add auth and user sessions.
- Add database persistence.
- Add audit logging.
- Add file uploads for incident media.
- Add real-time notifications.
