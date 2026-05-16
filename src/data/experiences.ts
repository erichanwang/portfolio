export interface Experience {
  title: string;
  organization: string;
  location: string;
  period: string;         // e.g. "Jun 2025 — Present"
  type: 'research' | 'internship' | 'work' | 'teaching' | 'school';
  desc: string;
  tags: string[];
  link?: string;          // optional external URL (e.g. publication DOI, company page)
  linkLabel?: string;     // label for the link button (e.g. "Read publication")
}

// ── Collegiate & Professional Experiences ───────────────
// TODO: Eric — add your actual experiences here.
//       Each entry needs: title, organization, location, period, type, desc, tags.
//
//       To add a new experience, copy the template below and fill in your details:
//
//   {
//     title: 'Your Role Title',
//     organization: 'Company / Lab Name',
//     location: 'City, State',
//     period: 'Month YYYY — Month YYYY',
//     type: 'research',   // one of: 'research' | 'internship' | 'work' | 'teaching'
//     desc: 'Brief description of what you did and accomplished.',
//     tags: ['Tag1', 'Tag2'],
//   },
//
export const experiences: Experience[] = [
  {
    title: 'CS + AI Student',
    organization: 'Carnegie Mellon University',
    location: 'Pittsburgh, PA',
    period: 'Aug 2026 — May 2030',
    type: 'school',
    desc: 'Pursuing undergraduate studies in Computer Science and Artificial Intelligence. Coursework spanning algorithms, systems, machine learning, and computational theory.',
    tags: ['Computer Science', 'AI', 'Mathematics'],
  },
  {
    title: 'Research Assistant',
    organization: 'Texas A&M University — ML & NLP Lab',
    location: 'College Station, TX',
    period: '2022 — 2026',
    type: 'research',
    desc: 'Conducted research in natural language processing and machine learning. Developed models and pipelines for text understanding, contributed to experimental design, and authored technical reports.',
    tags: ['NLP', 'Machine Learning', 'Python'],
  },
  {
    title: 'Research Assistant',
    organization: 'Texas A&M University — AM² Lab',
    location: 'College Station, TX',
    period: '2023 — 2025',
    type: 'research',
    desc: 'Worked in the Advanced Materials & Manufacturing Research Lab. Gained hands-on experience with multi-axial 3D printing, materials characterization, and CAD-driven design workflows.',
    tags: ['Additive Manufacturing', 'CAD', 'Materials Science'],
  },
  {
    title: 'Published Author',
    organization: 'Nature Springer',
    location: 'International',
    period: '2025',
    type: 'research',
    desc: 'Published research in a peer-reviewed journal. Read the full publication for free via the shared author link.',
    tags: ['Publication', 'Research'],
    link: 'https://rdcu.be/eYKgm',
    linkLabel: 'Read publication',
  },
  // ── Template for adding more experiences ──────────────
  // {
  //   title: '',
  //   organization: '',
  //   location: '',
  //   period: '',
  //   type: 'research',
  //   desc: '',
  //   tags: [],
  //   link: '',        // optional
  //   linkLabel: '',   // optional
  // },
];
