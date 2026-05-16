import { Cpu, Atom, Brain, Gamepad2, Box, Map, TrendingUp, Type } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  year: number;
  desc: string;
  tags: string[];
  repo: string;
  icon: string;
  tier: 'featured' | 'notable';
  image: string | null;
}

// Map icon names to Lucide components
export const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Atom,
  Brain,
  Gamepad2,
  Box,
  Map,
  TrendingUp,
  Type,
};

// ── Projects ────────────────────────────────────────────
//
// How to add a new repo:
//   1. Copy the template below
//   2. Pick an icon name from the iconMap above (e.g. 'Cpu', 'Brain', 'Atom')
//   3. Choose a tier: 'featured' (shown by default) or 'notable' (shown when expanding)
//   4. Add to the end of the projects array
//
// ── Template ─────────────────────────────────────────────
// {
//   title: 'My New Project',
//   year: 2025,
//   desc: 'Short description of what the project does.',
//   tags: ['Python', 'ML'],
//   repo: 'https://github.com/erichanwang/my-new-project',
//   icon: 'Brain',       // pick from iconMap keys
//   tier: 'featured',     // 'featured' | 'notable'
//   image: null,
// },
//
export const projects: Project[] = [
  {
    title: 'Compiler',
    year: 2024,
    desc: 'Custom language that compiles to C++. Lexer, parser, AST, and code generation — built from scratch.',
    tags: ['C++', 'Systems', 'PL Theory'],
    repo: 'https://github.com/erichanwang/Compiler',
    icon: 'Cpu',
    tier: 'featured',
    image: null,
  },
  {
    title: 'Physics Engine',
    year: 2024,
    desc: 'Low-level rigid-body physics engine in C with collision detection and constraint solving.',
    tags: ['C', 'Simulation', 'Math'],
    repo: 'https://github.com/erichanwang/Physics-Engine',
    icon: 'Atom',
    tier: 'featured',
    image: null,
  },
  {
    title: 'Neural Network',
    year: 2023,
    desc: 'ML framework built from scratch — trained agents across multiple game environments.',
    tags: ['Python', 'ML', 'Deep Learning'],
    repo: 'https://github.com/erichanwang/neural-network',
    icon: 'Brain',
    tier: 'featured',
    image: null,
  },
  {
    title: 'Reinforcement Learning',
    year: 2023,
    desc: 'RL algorithms implemented and benchmarked across Pacman environments.',
    tags: ['Python', 'RL', 'AI'],
    repo: 'https://github.com/erichanwang/ReinforcementLearning',
    icon: 'Gamepad2',
    tier: 'featured',
    image: null,
  },
  {
    title: "Rubik's Cube Simulation",
    year: 2023,
    desc: 'Full 3D Rubik\'s cube with rotations, move sequences, and visual rendering.',
    tags: ['Python', '3D', 'Algorithms'],
    repo: 'https://github.com/erichanwang/cube3d',
    icon: 'Box',
    tier: 'featured',
    image: null,
  },
  {
    title: 'Path-Finding Algorithms',
    year: 2022,
    desc: 'Interactive visualizer for A*, Dijkstra, BFS, DFS with real-time grid editing.',
    tags: ['C++', 'Algorithms', 'Visualization'],
    repo: 'https://github.com/erichanwang/Path-Finding-Algorithms',
    icon: 'Map',
    tier: 'featured',
    image: null,
  },
  {
    title: 'Quaternions',
    year: 2024,
    desc: 'Quaternion algebra library and 3D rotation visualizer — slerp, rotation compositing, and interactive orientation demo.',
    tags: ['C++', 'Math', '3D Graphics'],
    repo: 'https://github.com/erichanwang/quaternions',
    icon: 'Box',
    tier: 'featured',
    image: null,
  },
  {
    title: 'ODE Solver',
    year: 2023,
    desc: 'Differential equation solver using Runge-Kutta and Euler methods with graphical output.',
    tags: ['Python', 'Numerical Analysis', 'Math'],
    repo: 'https://github.com/erichanwang/diff-eq-solver',
    icon: 'TrendingUp',
    tier: 'notable',
    image: null,
  },
  {
    title: 'Infinite Wordle',
    year: 2022,
    desc: 'Unlimited Wordle clone with randomized word selection and streak tracking.',
    tags: ['JavaScript', 'Web'],
    repo: 'https://github.com/erichanwang/infinite-wordle',
    icon: 'Type',
    tier: 'notable',
    image: null,
  },
];

// TODO: Add screenshot imports to projects.ts

export const archiveProjects = [
  { title: 'Hangman (Java)', year: 2022, repo: 'https://github.com/erichanwang/Hangman-Java' },
  { title: 'Hangman (C++)', year: 2022, repo: 'https://github.com/erichanwang/Hangman-CPP' },
  { title: 'Snake', year: 2021, repo: 'https://github.com/erichanwang/Snake' },
  { title: 'Pygame Intro', year: 2022, repo: 'https://github.com/erichanwang/Pygame-Intro' },
  { title: 'Pong', year: 2022, repo: 'https://github.com/erichanwang/Pong' },
  { title: 'Blackjack', year: 2022, repo: 'https://github.com/erichanwang/Blackjack' },
  { title: '2048', year: 2023, repo: 'https://github.com/erichanwang/2048' },
  { title: 'Calculator', year: 2022, repo: 'https://github.com/erichanwang/Calculator' },
  { title: 'Multi-lang Demo', year: 2022, repo: 'https://github.com/erichanwang/Multi-lang-Demo' },
  { title: 'Godot Intro', year: 2022, repo: 'https://github.com/erichanwang/Godot-Intro' },
  { title: 'Coffee Filter Sim', year: 2023, repo: 'https://github.com/erichanwang/Coffee-Filter-Sim' },
  { title: 'Autotyper', year: 2022, repo: 'https://github.com/erichanwang/Autotyper' },
];
