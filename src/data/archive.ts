export interface Award {
  year: number;
  text: string;
  location?: string;       // city/state for major awards
  detail?: string;          // competition level, recognition tier, etc.
}

export interface Activity {
  year: number;
  role: string;
  organization: string;
  detail?: string;
  location?: string;      // e.g. "College Station, TX"
  link?: string;           // external URL
  linkLabel?: string;      // label for the link display
  yearSpan?: string;       // e.g. "9th – 12th grade" overrides year display
}

// ── High School Awards ──────────────────────────────────
//
// Major awards first (with location + detail), then additional honors.
export const hsAwards: Award[] = [
  // ── Major Awards ────────────────────────────────────
  {
    year: 2024,
    text: 'SME Digital Manufacturing Challenge — Runner-Up Award (High School Division)',
    location: 'Los Angeles, CA',
    detail: 'International Competition',
  },
  {
    year: 2024,
    text: 'NIH BRAIN NeuroAI Workshop Poster Blitz Honoree',
    location: 'Bethesda, MD',
    detail: 'National Competition — Honoree Award',
  },
  // ── Additional Honors ───────────────────────────────
  { year: 2025, text: 'AIME National Qualifier' },
  { year: 2025, text: 'BPA National Alternate — Python' },
  { year: 2025, text: 'GARSEF Regional Finalist — 2nd Place (Materials Science)' },
  { year: 2025, text: 'TXSEF Regional Finalist — 3rd Place (Materials Science)' },
  { year: 2025, text: 'TEAMS National Qualifier' },
  { year: 2025, text: 'UT Austin CS Machine-Learning Program' },
  { year: 2023, text: 'Yale SIG Camp — Neuroscience & Regenerative Medicine' },
  { year: 2022, text: 'Texas A&M STEM Research Camp' },
];

// ── High School Activities ──────────────────────────────
export const hsActivities: Activity[] = [
  {
    year: 2025,
    role: 'Co-Founder',
    organization: 'Sci-access Company',
    detail: 'Publishing the Journal of Neuromorphic Intelligence — a peer-reviewed open-access journal bridging neuromorphic computing research.',
    location: 'College Station, TX',
    yearSpan: '9th – 12th grade',
    link: 'https://sci-access.org',
    linkLabel: 'sci-access.org',
  },
  {
    year: 2025,
    role: 'Research Assistant / Intern',
    organization: 'Texas A&M University',
    detail: 'Conducted research across two labs: Advanced Materials & Manufacturing Research Lab, and Natural Language Processing & Machine Learning Lab.',
    location: 'College Station, TX',
    yearSpan: '9th – 12th grade',
  },
];
