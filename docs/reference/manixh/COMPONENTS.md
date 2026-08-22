# Components Reference

> All reusable components, their props, variants, and usage. Cross-reference: [DESIGN.md](./DESIGN.md), [ARCHITECTURE.md](./ARCHITECTURE.md)

## Component Categories

| Category | Components |
|----------|-----------|
| **Layout** | BlogLayoutContainer, Loading |
| **UI Primitives** | Tooltip, SectionTitle, ClickSpark |
| **Page Sections** | HeroSection, SkillSection, Experience, Projects, AllProjects, UsesSection, AnalyticsSection, ContactMe, Footer, Calendar |
| **Data Viz** | AnalyticsDashboard, AnalyticsChart |
| **Blog System** | BlogTitle, BlogHeader, BlogDesc, BlogParagraph, BlogHighlight (3 variants), BlogAlert (3 variants), BlogList, BlogImage (3 variants), BlogTerminal, BlogCodeBlock, BlogTextLine, BlogLink, BlogButton, BlogAuthor |
| **Cards** | ProjectCard, ExperienceCard |

---

## Layout Components

### `BlogLayoutContainer`
**Path:** `src/components/blogs/BlogLayoutContainer.tsx`

Wraps individual blog posts with navigation footer and standard container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Blog post content |

```tsx
import BlogLayoutContainer from '../components/blogs/BlogLayoutContainer';

<BlogLayoutContainer>
  <BlogTitle>My Post</BlogTitle>
  <BlogParagraph>Content here...</BlogParagraph>
</BlogLayoutContainer>
```

---

### `Loading`
**Path:** `src/components/loading/Loading.tsx`

Full-screen SVG loading animation (chip/circuit board). Used as `Suspense` fallback.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props |

```tsx
<Suspense fallback={<Loading />}>
  <Routes>...</Routes>
</Suspense>
```

---

## UI Primitives

### `Tooltip`
**Path:** `src/components/tooltip/Tooltip.tsx`

Hover tooltip with arrow indicator. Uses `forwardRef`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Tooltip content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Placement |
| `children` | `ReactNode` | — | Element to wrap |
| `className` | `string` | `''` | Additional CSS class |
| `ref` | `React.Ref<HTMLDivElement>` | — | Forwarded ref |

```tsx
import Tooltip from '../components/tooltip/Tooltip';

<Tooltip text="Hello!" position="bottom">
  <button>Hover me</button>
</Tooltip>
```

---

### `SectionTitle`
**Path:** `src/components/sectionTitle/SectionTitle.tsx`

Decorated section heading with corner accents.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Title text |

```tsx
import SectionTitle from '../components/sectionTitle/SectionTitle';

<SectionTitle>My Projects</SectionTitle>
```

---

### `ClickSpark`
**Path:** `src/components/ClickSpark.tsx`

Canvas-based particle effect on click with optional audio. Wraps entire app.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sparkColor` | `string` | `'#ffffff'` | Particle color |
| `sparkSize` | `number` | `10` | Particle size |
| `sparkRadius` | `number` | `15` | Explosion radius |
| `sparkCount` | `number` | `8` | Number of particles |
| `duration` | `number` | `400` | Animation duration (ms) |
| `easing` | `'linear' \| 'ease-in' \| 'ease-out' \| 'ease-in-out'` | `'ease-out'` | Animation easing |
| `extraScale` | `number` | `1` | Scale multiplier |
| `children` | `ReactNode` | — | App content |

```tsx
<ClickSpark sparkColor="#ffffffff" sparkSize={12} sparkRadius={20}>
  <App />
</ClickSpark>
```

---

## Page Sections

### `HeroSection`
**Path:** `src/components/heroSection/HeroSection.tsx`

Profile card with avatar, name, username, status, bio, social links, Twitter card, Discord invite, and email button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props (all content from data/hardcoded) |

**Internal state:** `time`, `currentDecoration`, `imgLoaded`, `decorationInfo`, `showQR`

**Data consumed:** `userImages`, `socialLinks`

---

### `SkillSection`
**Path:** `src/components/skillSection/SkillSection.tsx`

Dual-row infinite marquee of technology and tool icons.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props (technologies/tools hardcoded internally) |

**Internal data:** `technologies` (15 items), `tools` (15 items) — each with `name`, `icon` (react-icons component), `color`

---

### `Experience`
**Path:** `src/components/experience/Experience.tsx`

Work experience timeline with expand/collapse cards and GitHub calendar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props (experience data hardcoded internally) |

**Internal state:** `expandedIdx` (which card is expanded)

---

### `ExperienceCard`
**Path:** `src/components/experience/ExperienceCard.tsx`

Individual experience timeline card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `React.ReactNode` | — | Custom logo element |
| `logoUrl` | `string` | — | Logo image URL |
| `company` | `string` | — | Company name |
| `links` | `{ url: string; icon: React.ReactNode }[]` | — | Company links |
| `status` | `string` | — | `'present' \| 'past' \| 'future'` |
| `role` | `string` | — | Job title |
| `dates` | `string` | — | Date range |
| `location` | `string` | — | Work location |
| `description` | `string[]` | — | Bullet points |
| `isExpanded` | `boolean` | — | Expansion state |
| `onToggle` | `() => void` | — | Toggle handler |

```tsx
<ExperienceCard
  logoUrl="/images/misc/jabsz.png"
  company="JabszGaming"
  role="Full Stack Dev Intern"
  dates="May 2025 - Sep 2025"
  status="past"
  description={['Built a project', 'Collaborated with team']}
/>
```

---

### `Projects`
**Path:** `src/components/projects/Projects.tsx`

Featured projects grid with "More Projects" link.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props (reads `featuredProjects` from data) |

---

### `AllProjects`
**Path:** `src/components/projects/AllProjects.tsx`

All projects grid with navigation arrows.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props (reads `allProjects` from data) |

---

### `ProjectCard`
**Path:** `src/components/projects/ProjectCard.tsx`

Individual project card with banner, name, description, tech tags, and links.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `banner` | `string` | — | Image URL |
| `name` | `string` | — | Project name |
| `desc` | `string` | — | Description |
| `tech` | `string[]` | — | Technology tags |
| `github` | `string` | — | GitHub URL |
| `live` | `string` | — | Live demo URL |
| `demoWarning` | `boolean` | — | Show demo warning tooltip |
| `isUnderDevelopment` | `boolean` | — | Show "under development" badge |
| `isPrivate` | `boolean` | — | Show "private project" badge |
| `sponsor` | `{ icon: IconType }` | — | Sponsor badge |
| `stats` | `string` | — | Stats badge text |

---

### `UsesSection`
**Path:** `src/components/uses/UsesSection.tsx`

Teaser card linking to the full `/uses` page.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props |

---

### `ContactMe`
**Path:** `src/components/contactMe/ContactMe.tsx`

Social links card listing all platforms.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props (reads `socialLinks` from data) |

---

### `Footer`
**Path:** `src/components/footer/Footer.tsx`

Footer with quote, copyright, and a live IST clock.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props |

**Behavior:** ticking IST clock via `useState` + `setInterval` (updates every second).

---

### `Calendar`
**Path:** `src/components/calendar/Calendar.tsx`

GitHub contribution calendar with custom tooltip.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props (username hardcoded: `ig-imanish`) |

**Internal state:** `tooltip` (position + content)

---

### `AnalyticsSection`
**Path:** `src/components/analyticsSection/AnalyticsSection.tsx`

Home page analytics teaser — renders `SectionTitle` + the full `AnalyticsDashboard`. Lazy-loaded on the home page.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No props |

---

## Data Viz Components

### `AnalyticsDashboard`
**Path:** `src/components/analytics/AnalyticsDashboard.tsx`

Self-contained analytics dashboard: period selector, stat cards, chart, and loading/error states. Fetches data via `useAnalytics` internally.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRefetch` | `(refetch: () => void) => void` | — | Callback to expose the refetch function to the parent |

```tsx
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';

<AnalyticsDashboard onRefetch={(refetch) => { window.refetchAnalytics = refetch; }} />
```

### `AnalyticsChart`
**Path:** `src/components/analytics/AnalyticsChart.tsx`

echarts line chart rendering the pageview/visitor series.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `period` | `AnalyticsPeriod` | — | Active period (`'24h' \| '7d' \| '30d'`) |
| `series` | `AnalyticsSeriesPoint[]` | — | Timestamped data points |

---

## Blog Components

### `BlogTitle`
**Path:** `src/components/blogs/components/BlogText.tsx`

`<h1>` wrapper. No props beyond `children`.

### `BlogHeader`
**Path:** `src/components/blogs/components/BlogText.tsx`

`<h2>` wrapper. No props beyond `children`.

### `BlogDesc` / `BlogParagraph`
**Path:** `src/components/blogs/components/BlogText.tsx`

`<p>` wrappers. No props beyond `children`.

---

### `WhiteBoldHighlight`
**Path:** `src/components/blogs/components/BlogHighlight.tsx`

White bold text on `rgba(255,255,255,0.15)` background.

### `NormalHighlight`
**Path:** `src/components/blogs/components/BlogHighlight.tsx`

Normal weight text on `rgba(255,255,255,0.08)` background.

### `CustomColorHighlight`
**Path:** `src/components/blogs/components/BlogHighlight.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | — | Text color |
| `children` | `ReactNode` | — | Content |

---

### `BlogTip` / `BlogWarn` / `BlogDontDo`
**Path:** `src/components/blogs/components/BlogAlert.tsx`

Alert boxes with icon and title.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Tip"` / `"Warning"` / `"Don't Do This"` | Alert heading |
| `children` | `ReactNode` | — | Alert content |

```tsx
<BlogTip title="Pro tip">
  Always plan before coding.
</BlogTip>
```

---

### `BlogOrderedList` / `BlogUnorderedList`
**Path:** `src/components/blogs/components/BlogList.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `React.ReactNode[]` | — | List items |

---

### `BlogImage` / `BlogImages` / `BlogEmoji`
**Path:** `src/components/blogs/components/BlogImage.tsx`

| Component | Props | Description |
|-----------|-------|-------------|
| `BlogImage` | `src: string, alt: string, width?: string` | Single image (default width: `100%`) |
| `BlogImages` | `images: { src: string; alt: string }[]` | Side-by-side images |
| `BlogEmoji` | `src: string, alt: string, size?: 'small' \| 'medium' \| 'large'` | Emoji-size image |

---

### `BlogTerminal`
**Path:** `src/components/blogs/components/BlogTerminal.tsx`

Styled terminal with copy button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `commands` | `string[]` | — | Terminal commands |
| `title` | `string` | `"Terminal"` | Header title |

```tsx
<BlogTerminal commands={['npm install', 'npm run dev']} title="Getting Started" />
```

---

### `BlogCodeBlock`
**Path:** `src/components/blogs/components/BlogCodeBlock.tsx`

Syntax-highlighted code block with copy button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | — | Code string |
| `filename` | `string` | — | Header filename |
| `language` | `string` | — | Language label |

```tsx
<BlogCodeBlock code='{"success": true}' filename="response.json" language="JSON" />
```

---

### `BlogTextLine`
**Path:** `src/components/blogs/components/BlogTextLine.tsx`

Icon + text line.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | — | Leading icon |
| `children` | `ReactNode` | — | Text content |

---

### `BlogLink` / `BlogButton` / `BlogButtonsContainer`
**Path:** `src/components/blogs/components/BlogLink.tsx`

| Component | Props | Description |
|-----------|-------|-------------|
| `BlogLink` | `href: string, children: ReactNode, external?: boolean` | Styled link (auto external icon) |
| `BlogButton` | `href?: string, onClick?: () => void, children: ReactNode, icon?: ReactNode` | Button or anchor |
| `BlogButtonsContainer` | `children: ReactNode, direction?: 'row' \| 'column'` | Button group layout |

---

### `BlogAuthor`
**Path:** `src/components/blogs/components/BlogAuthor.tsx`

Author card with avatar and reply text.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `"Manish Kumar"` | Author name |
| `avatar` | `string` | GitHub avatar URL | Avatar image |
| `children` | `ReactNode` | — | Author reply text |
