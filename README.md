# Bharadwaj Reddy Portfolio

A Next.js portfolio with an editorial visual system, GSAP-powered motion, and a server-side contact endpoint.

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

```text
src/
|-- app/                  # Next.js routes, global styles, and API handlers
|-- components/
|   |-- effects/          # Global visual effects and loading states
|   |-- layout/           # Site-wide navigation and footer
|   |-- providers/        # Client wrappers and behavior providers
|   `-- sections/         # Portfolio page sections
|-- data/                 # Portfolio content and legacy content constants
|-- hooks/                # Shared React hooks
`-- lib/                  # Framework integrations and reusable utilities

public/                   # Static images, documents, and legacy assets
archive/
|-- config/               # Superseded configuration kept for reference
`-- prototypes/           # Preserved prototype applications
```

The active page composition lives in `src/app/page.tsx`. Content used by the current design lives in `src/data/portfolio.ts`.

## Commands

```bash
npm run dev
npm run build
npm run start
```

## Environment

The contact API reads its email-service configuration from local environment variables. Environment files are intentionally ignored by Git.

## Feature flags

The opening hexagon preloader is disabled by default. Add the following to `.env.local` and restart the development server when you want it back:

```env
NEXT_PUBLIC_ENABLE_PRELOADER=true
```

Remove the variable or set it to `false` to open directly on the hero section.
