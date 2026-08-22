# Content Schema

> Documents where every piece of personal content lives, its data shape, and how to replace it. Cross-reference: [AGENTS.md](./AGENTS.md), [COMPONENTS.md](./COMPONENTS.md)

## Content Location Map

### Data Files (cleanly separated — edit these)

| File | Content | Shape |
|------|---------|-------|
| `src/data/projects.ts` | All projects | `ProjectData[]` |
| `src/data/socialLinks.tsx` | Social links | `SocialLink[]` |
| `src/data/uses.ts` | Software & hardware lists | `UsesCategory[]` |
| `src/data/images.ts` | Image path constants | `userImages` object |

### Hardcoded in Components (edit the component file)

| File | Lines | Content |
|------|-------|---------|
| `src/components/heroSection/HeroSection.tsx` | ~105 | Name: `"Manish Kumar"` |
| | ~113 | Username: `@manixh02` |
| | ~138 | Status: `"Building ossium.in"` |
| | ~148 | Location: `"India"` |
| | ~174-196 | Bio (3 lines) |
| | ~203-247 | Twitter card + Discord invite |
| | ~251 | Email: `mailto:work.manishh02@gmail.com` |
| `src/components/skillSection/SkillSection.tsx` | ~15-45 | `technologies` array (15 items) |
| | ~48-78 | `tools` array (15 items) |
| `src/components/experience/Experience.tsx` | ~20-50 | Experience entries |
| `src/components/footer/Footer.tsx` | ~25 | Quote text |
| | ~32 | Attribution text |
| `src/components/calendar/Calendar.tsx` | ~40 | GitHub username |
| `src/components/navbar/Navbar.tsx` | ~46 | GitHub repo URL |
| `src/components/loading/Loading.tsx` | SVG text | `"Just a second babe..."` |
| `src/components/blogs/components/BlogAuthor.tsx` | ~12-13 | Default author name/avatar |
| `src/pages/blogs/BlogLayout.tsx` | ~30-100 | Blog post listing entries |
| `src/components/contactMe/ContactMe.tsx` | ~15-16 | Title + description text |
| `src/components/uses/UsesSection.tsx` | ~15-16 | Teaser text |
| `index.html` | All meta | SEO, OG, Twitter, JSON-LD |

---

## Data Schemas

### `ProjectData` (from `src/data/projects.ts`)

```typescript
interface ProjectData {
  /** Image URL for the project banner/screenshot */
  banner: string;
  /** Display name of the project */
  name: string;
  /** Short description (1-2 sentences) */
  desc: string;
  /** Technology tags shown as pills */
  tech: string[];
  /** GitHub repository URL */
  github: string;
  /** Live demo URL (optional) */
  live?: string;
  /** Show warning that demo may not work */
  demoWarning?: boolean;
  /** Show "under development" badge */
  isUnderDevelopment?: boolean;
  /** Show "private project" badge (no code available) */
  isPrivate?: boolean;
  /** Sponsor badge with icon */
  sponsor?: { icon: IconType };
  /** Stats badge text (e.g. "4k+ downloads") */
  stats?: string;
}
```

**Arrays:**
- `featuredProjects` — shown on home page (typically 3-5 items)
- `additionalProjects` — shown on /projects page only
- `allProjects` — `[...featuredProjects, ...additionalProjects]`

---

### `SocialLink` (from `src/data/socialLinks.tsx`)

```typescript
interface SocialLink {
  /** Platform display name (e.g. "GitHub") */
  name: string;
  /** Profile URL or mailto: link */
  url: string;
  /** react-icons component (e.g. <FaGithub />) */
  icon: ReactNode;
  /** Brand color hex (used for hover effects) */
  color: string;
}
```

**Filtered for hero section:** GitHub, Resume, Medium, Instagram, LinkedIn
**Used in ContactMe:** All links

---

### `UsesItem` / `UsesCategory` (from `src/data/uses.ts`)

```typescript
interface UsesItem {
  /** What category this item belongs to (e.g. "Keyboard") */
  label: string;
  /** Product/tool name */
  name: string;
  /** Optional purchase/info link */
  link?: string;
}

interface UsesCategory {
  /** Section heading (e.g. "Software", "Hardware") */
  category: string;
  /** Items in this category */
  items: UsesItem[];
}
```

---

### `userImages` (from `src/data/images.ts`)

```typescript
export const userImages = {
  profile: {
    avatar: string,     // Main profile photo
    qrCode: string,     // QR code image
  },
  projects: {
    project1: string,   // Screenshot for project 1
    project2: string,   // Screenshot for project 2
    project3: string,
    project4: string,
    project5: string,
    project6: string,
  },
  decorations: {
    soulLeavingBody: string,  // Sunday decoration
    cyberKatana: string,      // Monday/Wednesday decoration
    candlelightDark: string,  // Tuesday/Thursday decoration
    shy: string,              // Friday decoration
    blossomBurst: string,     // Saturday decoration
  },
};
```

---

### Experience Entry (hardcoded in `src/components/experience/Experience.tsx`)

```typescript
// Shape of each experience entry (not exported as interface)
{
  company: string;       // "mx corp."
  role: string;          // "Developer"
  dates: string;         // "Dec 2025 - Now"
  status: string;        // "present" | "past" | "future"
  logoUrl: string;       // Company logo URL
  description: string[]; // Bullet points
  links?: { url: string; icon: React.ReactNode }[];
}
```

---

### Skill/Tool Entry (hardcoded in `src/components/skillSection/SkillSection.tsx`)

```typescript
// Shape of each skill entry (not exported as interface)
{
  name: string;    // "React"
  icon: IconType;  // FaReact
  color: string;   // "#61dafb"
}
```

---

## Replacement Checklist

Use this when swapping content for a new person:

- [ ] `src/data/projects.ts` — replace all project entries
- [ ] `src/data/socialLinks.tsx` — replace all social links
- [ ] `src/data/uses.ts` — replace all tools & gear
- [ ] `src/data/images.ts` — update image paths
- [ ] `HeroSection.tsx` — name, username, bio, status, location, email, social cards
- [ ] `SkillSection.tsx` — technologies and tools arrays
- [ ] `Experience.tsx` — experience entries
- [ ] `Footer.tsx` — quote and attribution
- [ ] `Calendar.tsx` — GitHub username
- [ ] `Navbar.tsx` — repo URL
- [ ] `BlogAuthor.tsx` — default author name/avatar
- [ ] `BlogLayout.tsx` — blog post listing
- [ ] `Loading.tsx` — loading text
- [ ] `ContactMe.tsx` — title and description
- [ ] `UsesSection.tsx` — teaser text
- [ ] `index.html` — all meta tags, SEO, OG, JSON-LD
- [ ] `public/images/profile/` — avatar and QR code files
- [ ] `public/images/projects/` — project screenshot files
- [ ] `public/og/og-image.png` — Open Graph image
- [ ] `public/resume/resume.pdf` — resume file
- [ ] `.env` — copy from `.env.example`, set `VITE_DECORATION_IMAGE` if desired
