# Portfolio Rebuild — Claude Code Instructions
**Eric Han Wang · github.com/erichanwang · 2026**

---

## 0. Stack & Project Setup

- **Framework**: React + TypeScript (Vite)
- **Styling**: Tailwind CSS v3 + one global `styles.css` for custom animations, keyframes, and anything Tailwind can't express cleanly
- **File structure**:
  ```
  src/
    App.tsx                  ← root, routing
    main.tsx
    styles.css               ← global styles, keyframes, custom CSS (ALL shared CSS here)
    components/
      Navbar.tsx
      Hero.tsx
      Projects.tsx
      Skills.tsx
      Research.tsx
      Contact.tsx
      Certifications.tsx     ← hidden by default, toggled
      Footer.tsx
    data/
      projects.ts            ← project data array
      skills.ts              ← skill categories array
      research.ts            ← research areas array
    hooks/
      useClock.ts
      useInView.ts
    assets/                  ← icons, images
  ```
- **Fonts** (Google Fonts, import in `styles.css`):
  - `DM Mono` — monospace, for labels, tags, code-flavored text
  - `Space Grotesk` — display/headings
  - `DM Sans` — body
  - `Ma Shan Zheng` or `ZCOOL XiaoWei` — brushy Chinese font for 王翰

- **Icon library**: Lucide React (`npm install lucide-react`)
- **Animation**: Framer Motion (`npm install framer-motion`)
- **No emoji anywhere in the UI.** Use Lucide icons or custom SVG instead.

---

## 1. Design System

### Color Palette
```css
--bg-base:        #0e1520;   /* deep charcoal base */
--bg-surface:     #131c2a;   /* card/section surface */
--bg-hover:       #1a2438;   /* hover state */
--accent-blue:    #4fc3f7;   /* primary accent */
--accent-purple:  #ce93d8;   /* secondary accent */
--accent-teal:    #80cbc4;   /* tertiary accent */
--text-primary:   #f0f4f8;
--text-secondary: rgba(240, 244, 248, 0.55);
--text-muted:     rgba(240, 244, 248, 0.30);
--border-subtle:  rgba(255, 255, 255, 0.07);
--border-hover:   rgba(79, 195, 247, 0.30);
--glow-blue:      rgba(79, 195, 247, 0.12);
```

### Typography
- Headings: `Space Grotesk`, weight 700–800, tight letter-spacing (`-0.03em` to `-0.04em`)
- Body: `DM Sans`, weight 400–500
- Labels/tags/mono: `DM Mono`, weight 400–500
- Chinese name: brushy font (`Ma Shan Zheng` or `ZCOOL XiaoWei`)

### Spacing rhythm
- Section padding: `80px 40px` on desktop, `60px 20px` on mobile
- Max content width: `960px`, centered

### Section headers
All section labels follow this pattern:
```tsx
<span className="section-label">// section name</span>
<div className="section-rule" />   {/* horizontal line */}
```
Monospace, `#4fc3f7`, small, uppercase, with a full-width hairline rule extending right.

---

## 2. Navbar

- Fixed top, full width
- Left: logo — use the following inline SVG as a placeholder (`// TODO: Replace with real logo asset when designed`). It is a neural cluster mark: a center node with 8 radiating connections, in the site's blue accent color. Render it at 32×32px in the navbar.

```tsx
// src/assets/LogoPlaceholder.tsx
export function LogoPlaceholder({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Radial spokes */}
      <line x1="16" y1="16" x2="16" y2="4"   stroke="#4fc3f7" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="16" y2="28"  stroke="#4fc3f7" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="4"  y2="16"  stroke="#80cbc4" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="28" y2="16"  stroke="#80cbc4" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="7"  y2="7"   stroke="#4fc3f7" strokeWidth="0.8" opacity="0.4"/>
      <line x1="16" y1="16" x2="25" y2="7"   stroke="#4fc3f7" strokeWidth="0.8" opacity="0.4"/>
      <line x1="16" y1="16" x2="7"  y2="25"  stroke="#ce93d8" strokeWidth="0.8" opacity="0.4"/>
      <line x1="16" y1="16" x2="25" y2="25"  stroke="#ce93d8" strokeWidth="0.8" opacity="0.4"/>
      {/* Outer terminal dots */}
      <circle cx="16" cy="4"  r="1.5" fill="#4fc3f7" opacity="0.7"/>
      <circle cx="16" cy="28" r="1.5" fill="#4fc3f7" opacity="0.7"/>
      <circle cx="4"  cy="16" r="1.5" fill="#80cbc4" opacity="0.7"/>
      <circle cx="28" cy="16" r="1.5" fill="#80cbc4" opacity="0.7"/>
      <circle cx="7"  cy="7"  r="1.2" fill="#4fc3f7" opacity="0.4"/>
      <circle cx="25" cy="7"  r="1.2" fill="#4fc3f7" opacity="0.4"/>
      <circle cx="7"  cy="25" r="1.2" fill="#ce93d8" opacity="0.4"/>
      <circle cx="25" cy="25" r="1.2" fill="#ce93d8" opacity="0.4"/>
      {/* Center ring + core */}
      <circle cx="16" cy="16" r="5.5" fill="#0e1520" stroke="#4fc3f7" strokeWidth="1.2"/>
      <circle cx="16" cy="16" r="2"   fill="#4fc3f7"/>
    </svg>
  );
}
```
- Right: nav links → `Projects`, `Research`, `Skills`, `Contact`
- On scroll > 40px: frosted glass (`backdrop-filter: blur(16px)`, `background: rgba(14,21,32,0.85)`, bottom border `1px solid var(--border-subtle)`)
- Smooth transition on scroll
- Mobile: hamburger menu that slides in a full-screen overlay

---

## 3. Hero Section

### Name animation

**English name: "Eric Han Wang"**

Implement a "hacker decode" animation:
- On mount, each letter position starts showing a random character from the set: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*`
- Every ~60ms, each letter independently has a chance to "lock in" to its correct value
- Letters lock in sequentially (left to right bias) over ~1.2s total
- Locked-in letters stop randomizing; still-randomizing letters keep flickering
- Final result: `Eric Han Wang` in `Space Grotesk`, 800 weight, ~72–88px, `#f0f4f8`
- Add a **text glow**: `text-shadow: 0 0 40px rgba(79,195,247,0.25), 0 0 80px rgba(79,195,247,0.10);`

**Chinese name: 王翰**

- Use the brushy Chinese font
- Animate with an SVG stroke-dashoffset reveal (brush-stroke effect):
  - Each character's SVG path starts fully hidden (`stroke-dashoffset = stroke-dasharray`)
  - Animates to `stroke-dashoffset: 0` over ~1.5s per character, sequentially
  - If SVG stroke animation is too complex, fall-through: fade + slight upward translate, still using the brushy font, with a `clip-path: inset(0 100% 0 0)` wipe animation left-to-right per character
- Color: gradient `linear-gradient(135deg, #4fc3f7, #ce93d8, #80cbc4)`
- Font size ~60–72px
- Glow matching the English name

### Location + Clock
- Line above name, monospace (`DM Mono`), muted color
- Icon: Lucide `MapPin` (small, `#4fc3f7`)
- Text: `Pittsburgh, PA  ·  GMT-5 (CDT)`  
  *(Note: Eric is not in PA yet. This is aspirational/future. Keep it. Update timezone label to match reality: CDT = UTC-5 in summer, CST = UTC-6 in winter. Use dynamic offset based on actual JS `Date` offset or hardcode `UTC-5 CDT` for now)*
- Live clock updating every second, format: `HH:MM:SS AM/PM`

### Tagline — list format
Render as a styled vertical list, not a paragraph:

```
▸  CS + AI @ Carnegie Mellon University
▸  Research: Neuromorphic Computing · Quantum Systems · Bio-Inspired Architectures  
▸  Building at the intersection of computation and nature
```

Each bullet uses a small `▸` or Lucide `ChevronRight` icon in `#4fc3f7`. Items fade in staggered (100ms delay each) after name animation completes.

### CTA Buttons (4 total)
```
[View Projects →]   filled, accent blue bg, dark text
[GitHub ↗]          ghost/outline
[Contact Me]        ghost/outline
[Resume ↗]          ghost/outline  ← links to PDF resume (placeholder href="#" for now, labeled "Resume")
```

Hover: slight `translateY(-1px)`, brightness bump, border glow on ghost buttons.

### Stats Row
Thin top border, then 4 stats horizontally:

| Stat | Value |
|------|-------|
| Repos | 100+ |
| Languages | 15+ |
| Research Areas | 3 |
| University | CMU CS+AI '30 |

Numbers in `#4fc3f7`, labels in `DM Mono` muted. No emojis.

---

## 4. Projects Section

### Layout
- Section label: `// featured projects`
- Grid: `repeat(auto-fill, minmax(280px, 1fr))`, gap `16px`
- Each card: dark surface, subtle border, border-radius `16px`
- Hover: border color shifts to `--border-hover`, surface lightens, soft blue glow (`box-shadow: 0 0 32px rgba(79,195,247,0.08)`)
- Cards are clickable → open GitHub repo link in new tab

### Card anatomy
```
[Lucide icon — pick contextually, NO emoji]
Project Title          ← Space Grotesk, 17px, 700
Year (e.g. 2024)       ← DM Mono, 11px, muted, right-aligned or below title
Short description      ← DM Sans, 13.5px, text-secondary, max 2 lines
[Tag] [Tag] [Tag]      ← small pill tags, blue-tinted bg
[GitHub icon link]  [Live link if exists]  ← bottom row, icon buttons
```

**If a project has an image**: show it as a 16:9 or 4:3 image at the top of the card, with `object-fit: cover`, rounded top corners.

**No emoji icons.** Use Lucide icons:
- Compiler → `Cpu` or `Terminal`
- Physics Engine → `Atom`
- Neural Network / ML → `Brain`
- RL → `Gamepad2`
- Rubik's Cube → `Box`
- Path-Finding → `Map`
- Sorting Viz → `BarChart2`
- ODE Solver → `Function` or `TrendingUp`
- Pixel Art → `PenTool`
- Wordle → `Type`

### Featured projects data (`src/data/projects.ts`)
```ts
export const projects = [
  {
    title: "Compiler",
    year: 2024,
    desc: "Custom language that compiles to C++. Lexer, parser, AST, and code generation — built from scratch.",
    tags: ["C++", "Systems", "PL Theory"],
    repo: "https://github.com/erichanwang/Compiler",
    icon: "Cpu",
    tier: "featured",
    image: null,
  },
  {
    title: "Physics Engine",
    year: 2024,
    desc: "Low-level rigid-body physics engine in C with collision detection and constraint solving.",
    tags: ["C", "Simulation", "Math"],
    repo: "https://github.com/erichanwang/Physics-Engine",
    icon: "Atom",
    tier: "featured",
    image: null,
  },
  {
    title: "Neural Network",
    year: 2023,
    desc: "ML framework built from scratch — trained agents across multiple game environments.",
    tags: ["Python", "ML", "Deep Learning"],
    repo: "https://github.com/erichanwang/neural-network",
    icon: "Brain",
    tier: "featured",
    image: null,
  },
  {
    title: "Reinforcement Learning",
    year: 2023,
    desc: "RL algorithms implemented and benchmarked across Pacman environments.",
    tags: ["Python", "RL", "AI"],
    repo: "https://github.com/erichanwang/ReinforcementLearning",
    icon: "Gamepad2",
    tier: "featured",
    image: null,
  },
  {
    title: "Rubik's Cube Simulation",
    year: 2023,
    desc: "Full 3D Rubik's cube with rotations, move sequences, and visual rendering.",
    tags: ["Python", "3D", "Algorithms"],
    repo: "https://github.com/erichanwang/cube3d",
    icon: "Box",
    tier: "featured",
    image: null,
  },
  {
    title: "Path-Finding Algorithms",
    year: 2022,
    desc: "Interactive visualizer for A*, Dijkstra, BFS, DFS with real-time grid editing.",
    tags: ["C++", "Algorithms", "Visualization"],
    repo: "https://github.com/erichanwang/Path-Finding-Algorithms",
    icon: "Map",
    tier: "featured",
    image: null,
  },
  {
    title: "ODE Solver",
    year: 2023,
    desc: "Differential equation solver using Runge-Kutta and Euler methods with graphical output.",
    tags: ["Python", "Numerical Analysis", "Math"],
    repo: "https://github.com/erichanwang/diff-eq-solver",
    icon: "TrendingUp",
    tier: "notable",
    image: null,
  },
  {
    title: "Infinite Wordle",
    year: 2022,
    desc: "Unlimited Wordle clone with randomized word selection and streak tracking.",
    tags: ["JavaScript", "Web"],
    repo: "https://github.com/erichanwang/infinite-wordle",
    icon: "Type",
    tier: "notable",
    image: null,
  },
];
```

> **TODO for Eric**: Add `year` for any project that's missing it. Set `image` to an import path once you have screenshots.

### Tiers
Show `featured` tier by default. Add a `"Show more projects"` button that expands to reveal `notable` tier cards (Framer Motion `AnimatePresence`). A separate `/archive` page (or section, collapsed by default) for old high school projects.

---

## 5. Research Section

### Layout
Section label: `// research & interests`

Two-column grid on desktop, single column mobile. Each area has:
- Left color bar (3px, colored per area)
- Area name — `Space Grotesk`, 15px, 600
- Detail line — `DM Mono`, 12px, muted

### Research areas data
```ts
export const researchAreas = [
  {
    label: "Neuromorphic Computing",
    detail: "Brain-inspired hardware, spiking neural networks, event-driven computation",
    color: "#4fc3f7",
  },
  {
    label: "Quantum Computing",
    detail: "Quantum algorithms, circuit simulation, quantum-classical hybrid systems",
    color: "#ce93d8",
  },
  {
    label: "Bio-Inspired Systems",
    detail: "Biomimicry in computational models, swarm intelligence, evolutionary algorithms",
    color: "#80cbc4",
  },
  {
    label: "Mathematical Modeling",
    detail: "ODE/PDE systems, numerical analysis, finite element methods, dynamical systems",
    color: "#ffcc80",
  },
  {
    label: "Computational Physics",
    detail: "Multiphysics simulation, COMSOL, rigid-body dynamics, fluid approximations",
    color: "#f48fb1",
  },
  {
    label: "Machine Learning Theory",
    detail: "Supervised/unsupervised learning, reinforcement learning, neural architecture search",
    color: "#a5d6a7",
  },
];
```

### Activity / Info accordion
Below the research grid, add an expandable section:

```
[▼  Awards & Activity]   ← clicking toggles open/close, Framer Motion height animation
```

When expanded, shows:
```
2025  AIME National Qualifier
2025  BPA National Alternate — Python
2025  GARSEF Regional Finalist — 2nd Place (Materials Science)
2025  TXSEF Regional Finalist — 3rd Place (Materials Science)
2025  TEAMS National Qualifier
2025  UT Austin CS Machine-Learning Program
2023  Yale SIG Camp — Neuroscience & Regenerative Medicine
2022  Texas A&M STEM Research Camp
```

Each row: year in `DM Mono` muted left column, description right. Subtle divider lines between rows.

> **Note for Eric**: Only include awards you want listed. Remove anything you'd rather omit.

---

## 6. Skills Section

Section label: `// skills & tools`

### Layout
Tabbed interface — tab bar with these categories:

```
Languages  |  AI & ML  |  Web & Full-Stack  |  Systems & Tools  |  Databases  |  Engineering
```

- Active tab: bottom border `2px solid #4fc3f7`, text `#4fc3f7`
- Inactive tab: text muted, hover lightens
- Tab content: grid of skill pills, `repeat(auto-fill, minmax(140px, 1fr))`

Each skill pill:
```
[icon or letter mark]  Skill Name
```
- `DM Mono`, 12–13px
- Dark surface bg, subtle border
- Hover: slight glow, border brightens

### Skills data (`src/data/skills.ts`)
```ts
export const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      "Python", "Java", "C", "C++", "C#", "Go", "Kotlin",
      "Ruby", "PHP", "Bash / Shell", "JavaScript", "TypeScript", "GDScript",
    ],
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    skills: [
      "PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face", "Ollama",
      "Deep Learning", "Neural Network Training", "Model Fine-Tuning",
      "Transformer Models", "NLP Pipelines", "LLM Workflows",
      "Supervised Learning", "Unsupervised Learning", "Jupyter Notebook",
    ],
  },
  {
    id: "web",
    label: "Web & Full-Stack",
    skills: [
      "HTML", "CSS", "Tailwind CSS", "React", "Angular",
      "Node.js", "Flask", "REST API Development",
    ],
  },
  {
    id: "systems",
    label: "Systems & Tools",
    skills: [
      "Linux (Arch, Ubuntu, Debian)", "Git", "GitHub", "VSCode", "Vim / Neovim",
      "Make / CMake", "GCC", "GDB", "POSIX Shell Scripting",
      "TCP/IP Networking", "Cloudflare",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    skills: [
      "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Firebase", "Redis", "Oracle",
    ],
  },
  {
    id: "engineering",
    label: "Engineering & Modeling",
    skills: [
      "COMSOL Multiphysics", "SolidWorks", "Onshape", "CAD / CAM",
      "Finite Element Analysis (FEA)", "ODE / PDE Modeling",
      "Numerical Analysis", "Computational Mathematics",
      "Circuit Analysis", "Electronics Prototyping",
      "Embedded Systems", "Arduino", "Raspberry Pi",
      "Microcontroller Programming", "Sensor Integration",
      "MATLAB / MathWorks",
    ],
  },
];
```

> **TODO for Eric**: You will be asked to add any missing skills before this section is finalized.

---

## 7. Contact Section

Section label: `// contact me`  ← NOT "Get in Touch"

Layout: centered, generous vertical padding.

Contact items:
```
📍  Pittsburgh, PA  (icon: MapPin)
📞  +1 979 402 8365  — Personal  (icon: Phone)
✉   ericwang559@gmail.com  — Personal  (icon: Mail)
✉   ehw2@andrew.cmu.edu  — Carnegie Mellon  (icon: Mail, different color/label)
```

> **TODO for Eric**: Add work/startup/business contact when ready. Placeholder row with `[Work / Business — coming soon]` can stay commented out in code.

Each row: icon (Lucide, `#4fc3f7`), contact value as copyable text, label badge on right.

Add a `[Copy]` button on hover for phone and email fields (copies to clipboard via `navigator.clipboard.writeText`).

Links: email rows should be `mailto:` links. Phone row: `tel:` link on mobile.

---

## 8. Certifications (Hidden by Default)

- Not shown in nav or as a section by default
- Reveal via a small `[Certifications ↓]` text link at the bottom of the Contact section or Footer
- On click: smooth Framer Motion expand animation shows the certifications list

Certifications:
```
Java IBC Certificate
UT Austin CS Machine Learning Certificate
HackerRank — Python
HackerRank — Java
HackerRank — C#
HackerRank — JavaScript
HackerRank — SQL
HackerRank — CSS
HackerRank — Go
```

HackerRank profile link: https://www.hackerrank.com/profile/ericwang559

Each cert: name, issuer badge (small pill), optional link icon. No full-page section — just an expandable card list.

---

## 9. Footer

Minimal. One line:
```
© 2026 Eric Han Wang · github.com/erichanwang
```

Links: GitHub, email. Monospace, muted. No "ericwang.dev" — domain TBD.

---

## 10. Archive Page (`/archive`)

Separate route (`/archive`). Simple list layout, no hero. Just a header and a grid/list of older projects:

```
Hangman (Java)       2022
Hangman (C++)        2022
Snake                2021
Pygame Intro         2022
Pong                 2022
Blackjack            2022
2048                 2023
Calculator           2022
Multi-lang Demo      2022
Godot Intro          2022
Coffee Filter Sim    2023
Autotyper            2022
```

These are preserved, not deleted. Each links to its GitHub repo if one exists. Minimal styling — same dark theme, no glow, no animations except a simple fade-in. A `← Back` link returns to home.

---

## 11. Animations & Motion

Use Framer Motion for:
- Page-level route transitions (`AnimatePresence` wrapping routes)
- Section entrance: `opacity: 0 → 1`, `y: 24 → 0`, triggered by `IntersectionObserver` (see `useInView.ts` hook)
- Project card hover states (scale, glow)
- Skills tab switch: content slides/fades between tabs
- Certifications accordion: `height: 0 → auto`
- Awards accordion: same

CSS keyframes (in `styles.css`) for:
- Hero name hacker animation (JS-driven, but base letter styling in CSS)
- Pulse dot on location/status line
- Subtle background grid or particle effect (optional — only if performant)

---

## 12. Responsive Breakpoints

| Breakpoint | Layout changes |
|------------|---------------|
| < 640px    | Single column everywhere, smaller hero text, stacked CTA buttons, hamburger nav |
| 640–1024px | 2-col project grid, 1-col research |
| > 1024px   | Full 3-col project grid, 2-col research |

---

## 13. Misc / To-do markers in code

Leave `// TODO:` comments in the code for:
- Logo/icon: `// TODO: Replace SVG placeholder with real logo asset`
- Resume: `// TODO: Replace href="#" with actual resume PDF URL`
- Project images: `// TODO: Add screenshot imports to projects.ts`
- Business contact: `// TODO: Add work/startup contact when ready`
- Domain: `// TODO: Update footer link when domain is purchased`
- Skills: `// TODO: Eric to confirm final skills list before deploy`
- Awards: `// TODO: Eric to confirm which awards to include`

---

## 14. What NOT to include

- **No "About" section** — remove it entirely
- **No Education page** — not needed (CMU is mentioned in hero tagline and stats row)
- **No emoji anywhere in the UI**
- **No "Fluent in English and Chinese"** — irrelevant
- **No "ericwang.dev"** — domain TBD, use `github.com/erichanwang` in footer
- **No "CSHS '26"** — you've graduated, irrelevant
- **No old awards that Eric hasn't confirmed** — only include what's listed in section 5 above
- **No "Version 2.0.0 / Last updated"** header styling from old site

---

## 15. Deployment

- **Host: Vercel only.** No gh-pages, no Cloudflare.
- `vite.config.ts`: set `base: '/'` (Vercel handles routing from root)
- Deploy via Vercel CLI or connect the new GitHub repo to Vercel dashboard (recommended):
  ```bash
  npm install -g vercel
  vercel        # preview deploy
  vercel --prod # production deploy
  ```
- Add a `vercel.json` in the repo root for SPA routing (so `/archive` does not 404 on refresh):
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- New repo: create a **fresh repo** (do not reuse the old `erichanwang.github.io` repo). Suggested name: `portfolio`. Connect it to Vercel on first deploy.
- `// TODO: Update footer link when custom domain is purchased and set in Vercel`

---

*End of instructions. Feed this file to Claude Code and proceed section by section.*