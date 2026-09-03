# Funded Store

A full-stack e-commerce and EMI financing application built with a React frontend, Node.js/Express backend API, and PostgreSQL database. The complete application is containerized using Docker Compose for easy local setup and execution.

## Demo

- **Local Demo:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Deployed Demo:** _Add deployed URL here_
- **Demo Video:** _Add Google Drive/YouTube link here_

> For the demo video, make sure the sharing permission is set to **Anyone with the link can view**.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Wouter
- Zod

### Backend
- Node.js
- TypeScript
- Express.js
- CORS
- Pino HTTP
- Zod

### Database
- PostgreSQL 17
- Drizzle ORM
- Drizzle-Zod

### DevOps
- Docker
- Docker Compose
- Nginx
- pnpm Workspaces

---

## Architecture

```text
                    USER
                     |
                     v
            +----------------+
            |    Frontend    |
            | React + Vite   |
            |    Port 3000   |
            +-------+--------+
                    |
                    | HTTP / API
                    v
            +----------------+
            |    Backend     |
            | Node + Express |
            |    Port 5000   |
            +-------+--------+
                    |
                    | Drizzle ORM
                    v
            +----------------+
            |   PostgreSQL   |
            |    Database    |
            |     :5432      |
            +----------------+
