# Linked Med

Linked Med — a LinkedIn-like professional platform for medical professionals and employers. Build a professional profile, showcase your background and education, connect with employers, and explore medical services, e-learning and the blog.

**Live demo:** https://linked-med.vercel.app

> This repository contains the frontend only; it loads its content from the project's backend API through Axios (`src/libs/axios.ts`).

## Features

- **Auth and email verification** — sign-up, sign-in and email verification, with an employer registration flow (`src/app/[locale]/register-panel`, `src/components/EmailVerificationModal.tsx`).
- **User profiles** — professional profiles with a professional background and education / certifications tabs (`src/app/[locale]/myprofile`, `src/components/myprofile/EducationCertificationsTab.tsx`).
- **Employer registration** — employers can register and present their organisation (`register-panel`).
- **Refer a friend** — invite colleagues to the platform (`src/app/[locale]/refer-a-friend`).
- **Blog** — articles with detail pages (`src/app/[locale]/blogs`, `blogs/[id]`).
- **Medical services** — a services section (`src/app/[locale]/services`).
- **E-learning** — learning content (`src/app/[locale]/e-learning`).
- **Onboarding journeys** — “make a move” and “seamless processing” flows (`make-move`, `seamless-processing`).
- **Internationalisation** — localised routes under `src/app/[locale]`, with translations in `messages/` (via `next-intl`).
- **About the platform** — our story, our values, about and contact pages.

## Tech Stack

- Next.js 15.2.6 (App Router) — `next`
- React 19.0.0 — `react`, `react-dom`
- TypeScript — `typescript`
- Tailwind CSS 4 — `tailwindcss`, `@tailwindcss/postcss`
- Internationalisation — `next-intl` 3.26.5
- Data fetching — Axios 1.6.7 (`src/libs/axios.ts`)
- Animation — framer-motion 12.4.7, AOS 2.3.4
- Maps — `@react-google-maps/api` 2.20.6
- UI — `lucide-react` 0.475.0, `react-hot-toast` 2.5.2, `js-cookie` 3.0.5

## Project Structure

```
src/
  app/[locale]/   # Localised routes: about, blogs, e-learning, employers, myprofile, services, ...
  components/     # Shared components and page sections (home, profile, ...)
  libs/           # API client (axios), i18n helpers
  messages/       # Translations
```

## Getting Started

### Prerequisites

- Node.js and npm

### Install and run

```bash
git clone https://github.com/ibrahim-mohamed-rezk/linked_med.git
cd linked_med
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build   # Production build (next build)
npm start       # Start the production server (next start)
npm run lint    # Lint (next lint)
```
