# Funded Store — where to run it

This folder is a complete source package for the Funded Store storefront and
its PostgreSQL-backed API.

## Fastest option: Vercel

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel with the project root set to the
   repository root.
3. Vercel will use the included `vercel.json`:
   - Build command: `pnpm --filter @workspace/funded-store run build`
   - Output directory: `artifacts/funded-store/dist/public`
   - API function: `api/[...path].ts`
4. Add `DATABASE_URL` in Vercel Project Settings for the Production and
   Preview environments.
5. Apply the schema and demo catalog to that PostgreSQL database:

   ```bash
   pnpm --filter @workspace/db run push
   psql "$DATABASE_URL" -f lib/db/seed.sql
   ```

The live storefront is served from `/`, and the API is available at
`/api/products`.

## Run in Replit

Upload or open this folder as a Repl, set `DATABASE_URL` in the Secrets or
Database tool, install with `pnpm install`, and start the existing storefront
and API workflows.

## Run locally

Requirements: Node.js 20+ and pnpm.

```bash
pnpm install
pnpm --filter @workspace/db run push
psql "$DATABASE_URL" -f lib/db/seed.sql
```

Start the API:

```bash
PORT=5000 pnpm --filter @workspace/api-server run dev
```

Start the frontend in a second terminal:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/funded-store run dev
```

The API is available at `http://localhost:5000/api`. For a browser session
with the frontend and API on one origin, use Vercel's local development
command or a reverse proxy.

## Database requirement

The storefront needs a reachable PostgreSQL database. The demo catalog is
defined in `lib/db/seed.sql` and includes products, product variants, and EMI
plans. Do not commit a real `.env` file or database credentials.