# Blanksect — Phase 1 (Brand Hub)

A single landing page: hero, manifesto, origin, first-drop teaser with email capture,
social links, footer. Built with Next.js (app router), no Tailwind — plain CSS using
design tokens in `app/globals.css`.

## Stack
- **Frontend**: Next.js 14, deployed on **Vercel**
- **Email storage**: Postgres on **Railway** (same pattern as Abyss)

## Local dev

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Without `DATABASE_URL` set, the email form will show a
friendly "not connected yet" message instead of crashing — useful for previewing the
design before the DB is wired up.

## Deploying

1. **Spin up Postgres on Railway** (new project → Add Postgres, or reuse your Abyss
   Railway project with a new service).
2. Run `schema.sql` against that database to create the `subscribers` table:
   ```bash
   psql "$DATABASE_URL" -f schema.sql
   ```
3. **Deploy to Vercel**: push this repo to GitHub, import it in Vercel, and add an
   environment variable:
   - `DATABASE_URL` → your Railway Postgres connection string
4. Point your domain at the Vercel project (Vercel → Settings → Domains).

## What's next (Phase 2 / 3)

- Phase 2: merch store (Razorpay checkout) for the "I AM." drop
- Phase 3: gated membership content

## Notes

- All copy lives directly in `app/page.js` — easy to tweak without touching layout code.
- The delta motif (`app/components/DeltaMotif.js`) draws itself in further at each
  section as you scroll, fully resolving at the drop section.
- Social links in `page.js` are placeholders (`instagram.com`, `youtube.com`) — swap in
  your actual handles before launch.
