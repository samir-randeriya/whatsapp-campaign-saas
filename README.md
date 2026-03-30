# WhatsApp Campaign (WA Campaign)

`whatsapp-campaign` is a modern front-end dashboard to manage the full campaign lifecycle for WhatsApp-style communication. It is designed as a clean SaaS-style admin panel where teams can plan campaigns, organize contacts, draft reusable templates, and monitor message operations from one place.

This repository currently focuses on a production-ready UI foundation with reusable components, routing, forms, and page-level flows. It is ideal if you want to quickly launch a campaign platform MVP and connect it to your own backend/API.

## Features

- **Dashboard module** with campaign KPIs and high-level activity tracking
- **Campaign management** for creating and reviewing campaigns
- **Audience management** via contacts pages and segmentation-ready structure
- **Template workflow** with template listing and builder UI
- **Live-style message preview** for better content confidence before sending
- **Messages and settings** screens to support day-to-day operations
- **Authentication screens** (login, signup, forgot/reset password) ready for backend integration

## What this repo provides

- A polished React + TypeScript codebase with scalable folder structure
- UI components based on Tailwind and shadcn/ui patterns
- Routing architecture for auth + dashboard experiences
- Form-based create/edit experiences for campaign and template workflows
- Test setup for both unit testing (Vitest) and browser E2E smoke checks (Playwright)
- Clean starter base to integrate with:
  - WhatsApp Business API providers
  - your CRM/contact service
  - internal campaign analytics services

> **Note:** This UI is suitable as a client for a real WhatsApp Business API integration. Out of the box it uses mock/demo data; connect it to your API when you are ready.

## Requirements

- Node.js 18+ (20+ recommended)
- npm (or pnpm / yarn)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:8080](http://localhost:8080) by default.

If you use **Bun** instead of npm, run `bun install` in this folder to generate a fresh `bun.lock` (the previous sandbox lockfile was removed).

## Typical use flow

1. Log in to the dashboard
2. Create/import contacts (audience)
3. Build or select a template
4. Create a campaign and choose targeting/scheduling options
5. Review message content in preview
6. Track activity from dashboard and messages pages

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start Vite dev server          |
| `npm run build`    | Production build to `dist/`   |
| `npm run preview`  | Preview production build      |
| `npm run lint`     | Run ESLint                     |
| `npm test`         | Run Vitest (unit tests)        |
| `npx playwright test` | E2E tests (`e2e/`; first run may need `npx playwright install`) |

## Project structure

- `src/pages/` — route screens
- `src/components/` — UI components (including `ui/` primitives)
- `src/layouts/` — dashboard and auth layouts
- `src/data/` — mock/starter data used by UI flows
- `public/` — static assets

## Push to your GitHub repository

Use these commands from this project folder:

```bash
git init
git add .
git commit -m "Initial commit: WhatsApp campaign dashboard"
git branch -M main
git remote add origin https://github.com/samir-randeriya/whatsapp-campaign-saas.git
git push -u origin main
```

If `origin` already exists, update it instead of adding again:

```bash
git remote set-url origin https://github.com/samir-randeriya/whatsapp-campaign-saas.git
```

SSH alternative:

```bash
git remote set-url origin git@github.com:samir-randeriya/whatsapp-campaign-saas.git
```

Ensure `node_modules/` and `dist/` are not committed — they are listed in `.gitignore`.

## License

Private / personal use — set the `license` field in `package.json` if you publish the repo publicly.
