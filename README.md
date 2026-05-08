<div align="center">

# NOVA Agency — landing page

A production-grade marketing site for a fictional product studio.
Multilingual, animated, accessible, and built to feel like the real thing.

`Next.js 14` · `Tailwind CSS` · `Framer Motion` · `next-intl` · `Radix UI`

[![CI](https://github.com/timur123-star/Landing-page-for-an-agency/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/timur123-star/Landing-page-for-an-agency/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Playwright](https://img.shields.io/badge/E2E-Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![License](https://img.shields.io/badge/license-All%20rights%20reserved-c4302b.svg)](./LICENSE)

[Live (Railway)](https://landing-page-for-an-agency-production.up.railway.app) · [Source](https://github.com/timur123-star/Landing-page-for-an-agency)

</div>

---

## About this project

NOVA Agency is a portfolio piece — a single-page studio website with case studies, a
journal, a contact form, and the kind of polish you would expect from a real product
agency: smooth scroll, animated hero, scroll-spy navigation, command palette, dynamic OG
images, four locales, dark and light themes, and end-to-end accessibility.

The whole site is hand-crafted: no CMS, no boilerplate template, no design system bought off
the shelf. Every section, animation, illustration, and translation lives in this repo.

> **Disclaimer.** NOVA Agency is not a real company — the brand, copy, case studies, and
> testimonials are fictional, written for portfolio purposes only.
> Designed and built by **Тимур Валерьевич**.

---

## What is inside

### Pages

- **`/`** — landing page with 11 sections (hero → logos → problem/solution → services →
  process → cases → stats → testimonials → pricing → FAQ → contact).
- **`/work`** — index of case studies with filterable categories.
- **`/work/[slug]`** — individual case study with context, approach, results, gallery, and
  reading-progress bar.
- **`/journal`** — articles from the studio.
- **`/journal/[slug]`** — long-form post with sticky table of contents, transliterated
  anchor IDs, and a reading-progress bar.
- **`/404`** — branded not-found with glitch animation.

### Localisation

Four locales served from one codebase via `next-intl`:

| Code | Language | Path |
| --- | --- | --- |
| `ru` | Русский | `/` *(default, no prefix)* |
| `en` | English | `/en` |
| `uk` | Українська | `/uk` |
| `es` | Español | `/es` |

Each locale has its own `<html lang>`, metadata, OG image, sitemap entries, and
translated copy across every section, page, case study, and journal post.

### Animations & micro-interactions

Every animation honours `prefers-reduced-motion`.

- Lenis smooth scroll with custom easing.
- Word-by-word stagger reveal on every heading (`AnimatedText`).
- Scroll-spy in the header — animated pill highlights the active section.
- Magnetic CTAs with spring physics.
- Custom blend-mode cursor that grows on interactive elements.
- Intro splash on first visit (gated by `sessionStorage`).
- Theme switch with View Transitions API and radial clip-path reveal.
- 3D parallax tilt on the hero product mockup.
- Card-spotlight effect (radial gradient that follows the cursor).
- Marquee carousels for logos and testimonials with pause-on-hover.
- Animated counters and progress bars triggered on scroll.
- Hover shine sweep on every primary button.
- Animated SVG connector linking the four steps in the process section.

### UX details

- `⌘ K` / `Ctrl+K` command palette (layout-independent — works with Russian keyboards too).
- Section indicator on the right edge of the viewport (lg+).
- Reading-progress bar on long pages.
- Sticky table of contents in the journal with auto-generated anchors.
- Skip-to-content link, global focus-visible rings, ARIA-correct disclosure widgets.
- Back-to-top button after 600px of scroll.
- Click-to-copy email with toast confirmation.

### SEO & analytics

- Locale-aware `metadata`, OpenGraph, Twitter cards.
- JSON-LD: `Organization`, `WebSite`, `FAQPage`, `CollectionPage`, `Blog`, `BlogPosting`.
- Per-page dynamic OG images (1200×630) generated at the edge via `next/og`.
- Sitemap with locale alternates, `robots.txt`, web manifest, full icon set.
- Live Lighthouse badge in the footer powered by the PageSpeed Insights API.
- Vercel Analytics ready (no cookie banner required).

### Forms

- Contact form built on `react-hook-form` + `zod` with character counter, response-time
  badge, and a three-step "what happens next" timeline.
- `POST /api/contact` validates the payload and dispatches via Resend; without
  `RESEND_API_KEY` it gracefully falls back to a logged response so previews never break.

---

## Stack

| Layer | Tooling |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org) (App Router, RSC, Edge OG) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + HSL CSS variables |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Primitives | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) |
| Icons | [Lucide](https://lucide.dev) |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Email | [Resend](https://resend.com) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) + View Transitions API |
| Command palette | [cmdk](https://cmdk.paco.me) |
| Analytics | [Vercel Analytics](https://vercel.com/docs/analytics) |
| Hosting | [Railway](https://railway.com) / [Vercel](https://vercel.com) |

---

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Then open <http://localhost:3000>.

### Scripts

```bash
pnpm dev               # development server
pnpm build             # production build
pnpm start             # serve the production build
pnpm lint              # ESLint with the Next.js config
pnpm test:e2e:install  # install the Playwright browsers (one-off)
pnpm test:e2e          # run the Playwright smoke tests
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. If unset, the form silently logs and returns `{ ok: true, delivered: false }`. |
| `CONTACT_INBOX` | Inbox that receives form submissions. Defaults to `hello@nova-agency.studio`. |
| `RESEND_FROM` | Verified Resend sender (e.g. `NOVA Studio <hello@your-domain.com>`). |

---

## Project layout

```
src/
├── app/
│   ├── [locale]/             # i18n root layout + page
│   │   ├── work/             # /work and /work/[slug]
│   │   ├── journal/          # /journal and /journal/[slug]
│   │   └── not-found.tsx     # 404 with glitch animation
│   ├── api/
│   │   ├── contact/          # POST /api/contact (Zod + Resend)
│   │   └── lighthouse/       # GET /api/lighthouse (PageSpeed Insights proxy)
│   ├── globals.css
│   └── opengraph-image.tsx   # default OG image
├── components/
│   ├── layout/               # Header, Footer, Logo, LocaleSwitcher, …
│   ├── motion/               # Reveal, AnimatedText, Counter, Marquee, Magnetic, …
│   ├── sections/             # All landing-page sections
│   ├── seo/                  # JSON-LD components
│   ├── ui/                   # button, input, textarea, badge, card, …
│   ├── command-palette.tsx
│   ├── section-indicator.tsx
│   └── back-to-top.tsx
├── data/                     # typed content (services, cases, journal, …)
├── i18n/                     # routing, navigation, request config
├── messages/                 # {ru,en,uk,es}.json — full translations
└── lib/
    ├── contact.ts            # Zod schema for the contact form
    ├── site.ts               # brand, navigation, contacts
    └── utils.ts              # cn() — clsx + tailwind-merge
```

---

## Theming

Themes are driven by HSL CSS variables in `globals.css` and orchestrated by `next-themes`
with `attribute="class"`. The theme switch uses the View Transitions API with a radial
`clip-path` reveal and falls back to a CSS-only crossfade. Dark is the default.

## Contact API

`POST /api/contact` accepts a JSON body, validates it with Zod, and forwards it to Resend:

```ts
{
  name: string;        // 2..80 chars
  email: string;       // RFC 5322 valid
  company?: string;    // 0..100 chars
  budget?: string;     // one of the UI options
  message: string;     // 20..2000 chars
}
```

The endpoint always returns 200 with `{ ok, delivered }` so previews never error out, even
without a `RESEND_API_KEY`.

---

## Quality bar

- `pnpm lint` — clean, zero warnings.
- `pnpm build` — strict TypeScript, production build passes.
- `pnpm test:e2e` — Playwright smoke tests cover the home page, locale switch,
  the contact API, and the `/work` and `/journal` index pages.
- GitHub Actions runs lint, build, and the Playwright suite on every push and pull request.
- Lighthouse 95+ on the deployed build (live badge in the footer).
- All animations honour `prefers-reduced-motion`.
- WCAG AA contrast on dark and light themes.
- Keyboard-accessible: every interactive element is reachable, every focus state is visible.

## Continuous integration

The [`CI`](.github/workflows/ci.yml) workflow runs on every push and pull request:

1. **Lint & build** — `pnpm install`, `pnpm lint`, `pnpm build`.
2. **End-to-end** — installs the Chromium browser, builds the app, and runs the Playwright
   smoke suite against the production build. The HTML report is uploaded as an artifact.

---

## Credits

Designed and built by **Тимур Валерьевич** as a portfolio piece. NOVA Agency is fictional —
the brand, the case studies, the testimonials, and the metrics are all invented.

## License

**All rights reserved.** Copyright © 2026 Тимур Валерьевич.

This repository is published as a portfolio piece. You may view the source for
reference and personal study, but you may not copy, fork, mirror, redeploy, or
reuse the code, design, copy, or illustrations — in whole or in part — for any
other website, product, or commercial work without prior written permission.
See [`LICENSE`](./LICENSE) for the full terms.
