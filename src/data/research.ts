export interface ResearchArea {
  label: string;
  detail: string;
  color: string;
}

export const researchAreas: ResearchArea[] = [
  {
    label: 'Neuromorphic Computing',
    detail: 'Brain-inspired hardware, spiking neural networks, event-driven computation',
    color: '#4fc3f7',
  },
  {
    label: 'Quantum Computing',
    detail: 'Quantum algorithms, circuit simulation, quantum-classical hybrid systems',
    color: '#ce93d8',
  },
  {
    label: 'Bio-Inspired Systems',
    detail: 'Biomimicry in computational models, swarm intelligence, evolutionary algorithms',
    color: '#80cbc4',
  },
  {
    label: 'Mathematical Modeling',
    detail: 'ODE/PDE systems, numerical analysis, finite element methods, dynamical systems',
    color: '#ffcc80',
  },
  {
    label: 'Computational Physics',
    detail: 'Multiphysics simulation, COMSOL, rigid-body dynamics, fluid approximations',
    color: '#f48fb1',
  },
  {
    label: 'Machine Learning Theory',
    detail: 'Supervised/unsupervised learning, reinforcement learning, neural architecture search',
    color: '#a5d6a7',
  },
];

export const awards = [
  { year: 2025, text: 'AIME National Qualifier' },
  { year: 2025, text: 'BPA National Alternate — Python' },
  { year: 2025, text: 'GARSEF Regional Finalist — 2nd Place (Materials Science)' },
  { year: 2025, text: 'TXSEF Regional Finalist — 3rd Place (Materials Science)' },
  { year: 2025, text: 'TEAMS National Qualifier' },
  { year: 2025, text: 'UT Austin CS Machine-Learning Program' },
  { year: 2023, text: 'Yale SIG Camp — Neuroscience & Regenerative Medicine' },
  { year: 2022, text: 'Texas A&M STEM Research Camp' },
];

// TODO: Eric to confirm which awards to include
