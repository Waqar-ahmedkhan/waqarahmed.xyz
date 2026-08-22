# Architecture

> Tech stack, folder structure, routing, data flow, and build process. Cross-reference: [DESIGN.md](./DESIGN.md), [COMPONENTS.md](./COMPONENTS.md)

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.1.1 |
| Build Tool | Vite | 7.3.6 |
| Language | TypeScript | 5.8.3 |
| Routing | React Router | 7.8.2 |
| Styling | Plain CSS (no Tailwind, no CSS-in-JS) | — |
| Icons | react-icons | 5.5.0 |
| Analytics | Vercel Web Analytics | 1.5.0 |
| Charts | echarts | 6.1.0 |
| Calendar | react-github-calendar | 4.5.10 |
| Package Manager | pnpm | 9.x |
| Deployment | Vercel | — |

## Folder Structure

```
manixh02-v3/
├── public/
│   ├── audio/              # Click sound effect
│   ├── blog/images/        # Blog post images
│   ├── images/
│   │   ├── decorations/    # Daily rotating decoration PNGs
│   │   ├── misc/           # Misc images (company logos)
│   │   ├── profile/        # Avatar, QR code, banner
│   │   └── projects/       # Project screenshots
│   ├── og/                 # Open Graph preview image
│   ├── resume/             # PDF resume
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── blogs/
│   │   │   ├── components/ # 11 blog content components + index.ts + README.md
│   │   │   └── BlogLayoutContainer.tsx + .css
│   │   ├── calendar/       # GitHub contribution calendar
│   │   ├── contactMe/      # Social links card
│   │   ├── experience/     # Work timeline + cards
│   │   ├── footer/         # Footer with quote, copyright, IST clock
│   │   ├── heroSection/    # Profile hero section
│   │   ├── loading/        # SVG loading animation
│   │   ├── navbar/         # Sticky navigation
│   │   ├── analytics/      # Analytics dashboard + chart (echarts)
│   │   ├── analyticsSection/ # Home page analytics teaser
│   │   ├── projects/       # Project cards + grids
│   │   ├── sectionTitle/   # Decorated section heading
│   │   ├── skillSection/   # Skill/tool marquee
│   │   ├── tooltip/        # Hover tooltip
│   │   ├── uses/           # Uses teaser section
│   │   └── ClickSpark.tsx  # Canvas click particle effect
│   ├── data/
│   │   ├── analytics.ts    # Analytics types + period options
│   │   ├── images.ts       # Image path constants
│   │   ├── projects.ts     # Project data (featured + additional)
│   │   ├── socialLinks.tsx # Social links with icons
│   │   └── uses.ts         # Software + hardware lists
│   ├── hooks/
│   │   └── useAnalytics.ts # Analytics API hook
│   ├── pages/
│   │   ├── home/Home.tsx           # Home page (composes all sections)
│   │   ├── analytics/AnalyticsLayout.tsx # Analytics dashboard page
│   │   ├── blogs/BlogLayout.tsx    # Blog listing
│   │   ├── blogs/HowToPlanAProject.tsx # Blog post
│   │   ├── notFound/PageNotFound.tsx   # 404 page
│   │   ├── resume/ResumeLayout.tsx     # PDF viewer
│   │   ├── uses/UsesLayout.tsx         # Full uses page
│   │   └── ProjectsLayout.tsx          # All projects page
│   ├── utils/
│   │   └── ImageDecoration.ts # Daily decoration logic
│   ├── App.tsx              # Router + layout
│   ├── App.css              # Global styles + design tokens
│   ├── index.css            # CSS reset
│   ├── main.tsx             # React entry point
│   └── vite-env.d.ts        # Vite type declarations
├── .github/                 # CI, templates, dependabot
├── api/
│   └── analytics.ts         # Serverless fn — Vercel Web Analytics proxy
├── index.html               # SPA entry with SEO meta
├── vite.config.ts           # Vite config
├── tsconfig.json            # TS project references
├── eslint.config.js         # ESLint flat config
├── .prettierrc              # Prettier config
├── vercel.json              # SPA rewrite + /api passthrough
└── package.json
```

## Routing

| Path | Component | Lazy-loaded |
|------|-----------|-------------|
| `/` | `Home` | Yes (2.5s delay) |
| `/home` | `Home` | Yes |
| `/projects` | `ProjectsLayout` | Yes |
| `/blogs` | `BlogsLayout` | Yes |
| `/blogs/how-to-plan-a-project` | `HowToPlanAProject` | Yes |
| `/uses` | `UsesLayout` | Yes |
| `/resume` | `ResumeLayout` | Yes |
| `/analytics` | `AnalyticsLayout` | Yes |
| `*` | `PageNotFound` | Yes |

All routes are wrapped in:
```
<BrowserRouter>
  <Navbar />           ← Always visible
  <ClickSpark>         ← Click particle effect
    <Suspense>         ← Loading fallback
      <Routes />       ← Page content
    </Suspense>
    <Analytics />      ← Vercel analytics
  </ClickSpark>
</BrowserRouter>
```

## Data Flow

Content is stored in **TypeScript data files** (not JSON, not CMS, not MDX):

### `src/data/projects.ts`
```typescript
interface ProjectData {
  banner: string;        // Image path or URL
  name: string;          // Display name
  desc: string;          // Description text
  tech: string[];        // Technology tags
  github: string;        // GitHub URL
  live?: string;         // Live demo URL
  demoWarning?: boolean; // Show demo warning
  isUnderDevelopment?: boolean;
  isPrivate?: boolean;
  sponsor?: { icon: IconType };
  stats?: string;        // e.g. "4k+ downloads"
}

export const featuredProjects: ProjectData[] = [...];  // 4 items
export const allProjects: ProjectData[] = [...featuredProjects, ...additionalProjects]; // 8 total
```

### `src/data/socialLinks.tsx`
```typescript
interface SocialLink {
  name: string;       // Display name
  url: string;        // Link URL
  icon: ReactNode;    // react-icons component
  color: string;      // Brand color hex
}

export const socialLinks: SocialLink[] = [...];  // 7 items
```

### `src/data/uses.ts`
```typescript
interface UsesItem {
  label: string;     // Category label (e.g. "Keyboard")
  name: string;      // Product name
  link?: string;     // Optional URL
}

interface UsesCategory {
  category: string;  // Section title (e.g. "Software")
  items: UsesItem[];
}

export const usesData: UsesCategory[] = [...];  // 2 categories, 20 items
```

### `src/data/images.ts`
```typescript
export const userImages = {
  profile: { avatar: string; qrCode: string },
  projects: { project1: string; ... project6: string },
  decorations: { soulLeavingBody: string; ... blossomBurst: string },
};
```

#### `src/data/analytics.ts`

Types + period options for the analytics dashboard.

```typescript
export type AnalyticsPeriod = '24h' | '7d' | '30d';

export interface AnalyticsSeriesPoint {
  timestamp: number;  // epoch ms (bucket start)
  pageviews: number;
  visitors: number;
}

export const analyticsPeriods: AnalyticsPeriodOption[] = [...]; // 24h, 7d, 30d
```

## Hardcoded Content (not in data files)

These are embedded in component code and would need editing:

| File | Content |
|------|---------|
| `HeroSection.tsx` | Name, username, bio lines, location, Twitter card, Discord invite, email, ossium link |
| `SkillSection.tsx` | All 30 technology/tool items with icons and colors |
| `Experience.tsx` | All experience entries (company, role, dates, description) |
| `Footer.tsx` | Quote text, "Designed & Made with ❤️" |
| `Calendar.tsx` | GitHub username |
| `Navbar.tsx` | Nav links, GitHub repo URL |
| `BlogAuthor.tsx` | Default author name and avatar |
| `BlogLayout.tsx` | Blog post listing data |
| `index.html` | All SEO meta tags, JSON-LD, OG images |
| `ContactMe.tsx` | Title and description text |
| `UsesSection.tsx` | Teaser text |
| `Loading.tsx` | "Just a second babe..." text |

## Build & Deployment

### Local Development
```bash
pnpm install
pnpm dev          # Starts on localhost:3000
```

### Production Build
```bash
pnpm build        # tsc -b && vite build → dist/
pnpm preview      # Preview build locally
```

### Quality Checks
```bash
pnpm lint         # ESLint
pnpm format       # Prettier (write)
pnpm format:check # Prettier (check only)
pnpm typecheck    # tsc --noEmit
```

### Deployment
- **Platform:** Vercel
- **Config:** `vercel.json` rewrites all routes to `index.html` (SPA) and passes `/api/*` through to serverless functions
- **CI:** GitHub Actions runs lint + build on push/PR to main (Node 20, pnpm 9)
- **Dependabot:** Weekly npm updates, monthly GH Actions updates

### Environment Variables
All prefixed with `VITE_` (exposed to client):

| Variable | Purpose |
|----------|---------|
| `VITE_DECORATION_IMAGE` | Override daily decoration (optional) |

Server-side API keys (`VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`) are configured on the hosting platform, never in client code.

## Key Architectural Decisions

1. **No CSS framework** — all styles are hand-written CSS with consistent naming
2. **No state management library** — only `useState`/`useEffect` locally
3. **No data fetching library** — native `fetch` in hooks, no React Query/SWR
4. **Lazy loading with artificial delay** — 2.5s minimum load time for all routes (for loading screen)
5. **Content in TypeScript files** — not JSON, not MDX, not CMS — editable by developers
6. **Single CSS file per component** — co-located CSS, no CSS modules, no CSS-in-JS
7. **Strict TypeScript** — `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`
8. **ESLint flat config** — modern config format with TypeScript + React hooks rules
9. **Serverless API functions** — the `api/` directory proxies server-side data (Vercel Web Analytics); secrets (`VERCEL_TOKEN`, etc.) never reach the client
