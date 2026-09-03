# Funded Store — easiest local setup

This project has been prepared so you can run the **frontend + backend + PostgreSQL database together with Docker**.

## Requirements

Install only:
- Docker Desktop (Windows/macOS) or Docker Engine + Compose (Linux)

You do **not** need to install PostgreSQL, Vite, Express, pnpm, or Node.js on your host machine.

## Start everything

### Windows
Double-click `start.bat`, or run:

```powershell
docker compose up --build
```

### macOS / Linux

```bash
chmod +x start.sh
./start.sh
```

Or:

```bash
docker compose up --build
```

Then open:

**http://localhost:3000**

The API is also available at **http://localhost:5000/api**.

## Stop

Press `Ctrl+C`.

To stop and remove containers:

```bash
docker compose down
```

## Reset the database

If you want a completely fresh database:

```bash
docker compose down -v
docker compose up --build
```

The demo products are loaded automatically on the first database startup.

## What is running?

- Frontend: React + Vite build served by Nginx → `localhost:3000`
- Backend: Node.js + Express → `localhost:5000`
- Database: PostgreSQL → internal Docker network (no database installation/configuration required)

Nginx forwards `/api/*` from the frontend to the backend, so the browser uses one simple URL.

## Important

The original Replit-specific setup and host PostgreSQL requirement are no longer necessary for the normal local run. The Docker setup is the recommended way to run this project locally.

If Docker Desktop is already installed, the normal workflow is simply:

```bash
docker compose up --build
```
