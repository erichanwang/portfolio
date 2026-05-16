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

// TODO: Replace with collegiate awards and activities (no high school items)
