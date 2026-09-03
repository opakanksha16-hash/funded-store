# Funded Store

A full-stack e-commerce and EMI financing application built with a React frontend, Node.js/Express backend API, and PostgreSQL database. The complete application is containerized using Docker Compose for easy local setup and execution.

---

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
The frontend communicates with the backend through REST APIs.

The backend contains the application logic and communicates with PostgreSQL using Drizzle ORM.

Project Structure

funded-store/
│
├── artifacts/
│   ├── funded-store/              # Frontend application
│   └── api-server/                # Backend API
│
├── lib/
│   ├── db/                        # Database schema and utilities
│   ├── api-zod/                   # API validation schemas
│   ├── api-client-react/          # React API client
│   └── api-spec/                  # API specification
│
├── docker/
│   ├── frontend.Dockerfile        # Frontend Docker image
│   ├── api.Dockerfile             # Backend Docker image
│   └── postgres/
│       └── init.sql               # Database schema and seed data
│
├── docker-compose.yml             # Runs all services
├── start.bat                      # Windows startup script
├── start.sh                       # macOS/Linux startup script
├── package.json                   # Project configuration
├── pnpm-workspace.yaml            # pnpm workspace configuration
└── README.md                      # Project documentation

Main Components
| Component            | Location                   | Purpose                         |
| -------------------- | -------------------------- | ------------------------------- |
| Frontend             | `artifacts/funded-store/`  | React user interface            |
| Backend              | `artifacts/api-server/`    | Node.js/Express REST API        |
| Database             | PostgreSQL                 | Stores application data         |
| Database Schema      | `lib/db/`                  | Database structure              |
| Seed Data            | `docker/postgres/init.sql` | Initial database data           |
| Docker Configuration | `docker-compose.yml`       | Connects all services           |
| Windows Startup      | `start.bat`                | Starts the complete application |

Setup & Run Instructions
Prerequisites

The easiest way to run the complete application is using Docker.

Install:

Docker Desktop
Git

When using Docker, you do not need to install PostgreSQL, Node.js, Express, or pnpm separately.

Clone the Repository
git clone https://github.com/opakanksha16-hash/funded-store.git
cd funded-store
Run on Windows
Option 1 — Using start.bat

From the project folder, run:

start.bat

Option 2 — Using Docker Compose

Run:

docker compose up --build

After the containers start successfully, open:

Run on macOS/Linux

Make the startup script executable:

chmod +x start.sh

Then run:

./start.sh

Or start Docker Compose directly:

docker compose up --build

Open:

http://localhost:3000
Stop the Application
docker compose down
Reset Database

To remove the database volume and initialize the database again:

docker compose down -v
docker compose up --build

Resetting the database removes the existing Docker database volume and recreates the database using the initialization script.
Services and Ports
| Service     | Technology           | Port | Purpose          |
| ----------- | -------------------- | ---: | ---------------- |
| Frontend    | React + Vite + Nginx | 3000 | User interface   |
| Backend API | Node.js + Express    | 5000 | REST API         |
| Database    | PostgreSQL 17        | 5432 | Application data |
API Endpoints

The backend API is available through:

http://localhost:5000/api
Health Check
GET /api/healthz

Checks whether the backend API is running.

Example:

curl http://localhost:5000/api/healthz

Example response:

{
  "status": "ok"
}
List Products
GET /api/products

Returns the available products.

Example:

curl http://localhost:5000/api/products

The endpoint returns product information such as product ID, name, price, brand, image and other product details.

Product Details
GET /api/products/:slug

Returns detailed information for a specific product.

The response can include:

Product information
Product variants
EMI plans

Example:

curl http://localhost:5000/api/products/product-slug
Database

The application uses PostgreSQL 17 as its database.

Drizzle ORM is used for database access and schema management.

Database Schema

Database-related files are located under:

lib/db/

The PostgreSQL initialization script is:

docker/postgres/init.sql

This initialization script creates the required tables and inserts the initial seed data.

Database Tables
products

Stores the main product information.
| Column      | Type    | Description            |
| ----------- | ------- | ---------------------- |
| id          | SERIAL  | Primary key            |
| slug        | TEXT    | Unique product slug    |
| brand       | TEXT    | Product brand          |
| name        | TEXT    | Product name           |
| tagline     | TEXT    | Product tagline        |
| description | TEXT    | Product description    |
| mrp         | INTEGER | Maximum retail price   |
| price       | INTEGER | Current price          |
| image_url   | TEXT    | Product image          |
| badge       | TEXT    | Optional product badge |
product_variants

Stores different variants of products.
| Column           | Type    | Description                 |
| ---------------- | ------- | --------------------------- |
| id               | SERIAL  | Primary key                 |
| product_id       | INTEGER | Foreign key to products     |
| name             | TEXT    | Variant category            |
| value            | TEXT    | Variant value               |
| color            | TEXT    | Display color               |
| price_adjustment | INTEGER | Additional price adjustment |
| image_url        | TEXT    | Variant image               |

Relationship:

products 1 ─────── * product_variants

One product can have multiple variants.
emi_plans

Stores EMI financing options for products.
| Column          | Type    | Description             |
| --------------- | ------- | ----------------------- |
| id              | SERIAL  | Primary key             |
| product_id      | INTEGER | Foreign key to products |
| tenure_months   | INTEGER | EMI duration            |
| monthly_payment | INTEGER | Monthly payment         |
| interest_rate   | NUMERIC | Interest rate           |
| cashback        | INTEGER | Cashback amount         |
| is_popular      | BOOLEAN | Popular plan indicator  |
| total_payable   | INTEGER | Total payable amount    |
Relationship:

products 1 ─────── * emi_plans

One product can have multiple EMI plans.

Database Seed Data

The database is initialized automatically using:

docker/postgres/init.sql

The seed data contains:

3 products
9 product variants
19 EMI plans

The seed data is automatically inserted when the PostgreSQL database is initialized.

Docker Setup

Docker Compose manages the complete application.

The main services are:

funded-store-frontend
funded-store-api
funded-store-db
Frontend Container

The frontend is served using Nginx.

Frontend → Port 3000
Backend Container

The backend runs the Node.js/Express API.

Backend API → Port 5000
Database Container

The database runs PostgreSQL.

PostgreSQL → Port 5432

Docker Compose connects all three services so that they can communicate with each other.

Environment Variables

The database connection is configured for the Docker environment through Docker Compose.

Example:

DATABASE_URL=postgresql://postgres:funded_store@db:5432/funded_store

Do not commit real production passwords, API keys, tokens, or other secrets to the repository.

Local Verification

After running:

docker compose up --build

Docker Desktop should show:

funded-store-frontend
funded-store-api
funded-store-db

Expected status:

Frontend → Running
Backend  → Running
Database → Healthy
Verify Frontend

Open:

http://localhost:3000

The Funded Store frontend should load in the browser.

Verify Backend

Open:

http://localhost:5000/api/healthz

Expected response:

{
  "status": "ok"
}
Verify Database

The PostgreSQL container should show a healthy status in Docker Desktop.

The database runs on:

localhost:5432

Inside Docker Compose, backend services communicate with the database using the Docker service name.

Deployment

The application can be deployed using services such as Vercel, Render, or another suitable cloud platform.

A possible deployment architecture is:

                    INTERNET
                       |
                       v
              +-------------------+
              | Frontend / Vercel |
              +---------+---------+
                        |
                        | API Requests
                        v
              +-------------------+
              | Backend / Render  |
              +---------+---------+
                        |
                        | Database Connection
                        v
              +-------------------+
              | Managed PostgreSQL|
              +-------------------+


http://localhost:3000

Demo Video

A 2–5 minute demonstration video will cover:

Opening the Funded Store frontend.
Demonstrating the main user interface.
Showing the project structure in VS Code.
Showing the frontend files.
Showing the backend/API files.
Showing the database schema and seed data.
Showing Docker Desktop with the frontend, backend and database containers running.
Demonstrating the backend health endpoint.
Showing the database running successfully.

The final Google Drive or YouTube link will be added to the Demo section.

Assignment Checklist
 Frontend included
 Backend/API included
 Database included
 Database schema documented
 Database seed data documented
 README.md included
 Setup and run instructions included
 API endpoints documented
 Example API response included
 Tech stack documented
 Project structure documented
 Docker setup documented
 Local verification instructions included
 2–5 minute demo video
 Public deployed demo link
