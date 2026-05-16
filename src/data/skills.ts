export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      'Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Kotlin',
      'Ruby', 'PHP', 'Bash / Shell', 'JavaScript', 'TypeScript', 'GDScript',
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & ML',
    skills: [
      'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face', 'Ollama',
      'Deep Learning', 'Neural Network Training', 'Model Fine-Tuning',
      'Transformer Models', 'NLP Pipelines', 'LLM Workflows',
      'Supervised Learning', 'Unsupervised Learning', 'Jupyter Notebook',
    ],
  },
  {
    id: 'web',
    label: 'Web & Full-Stack',
    skills: [
      'HTML', 'CSS', 'Tailwind CSS', 'React', 'Angular',
      'Node.js', 'Flask', 'REST API Development',
    ],
  },
  {
    id: 'systems',
    label: 'Systems & Tools',
    skills: [
      'Linux (Arch, Ubuntu, Debian)', 'Git', 'GitHub', 'VSCode', 'Vim / Neovim',
      'Make / CMake', 'GCC', 'GDB', 'POSIX Shell Scripting',
      'TCP/IP Networking', 'Cloudflare',
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: [
      'MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Firebase', 'Redis', 'Oracle',
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering & Modeling',
    skills: [
      'COMSOL Multiphysics', 'SolidWorks', 'Onshape', 'CAD / CAM',
      '3D Modeling & Design', 'Multi-Axial 3D Printing',
      'Finite Element Analysis (FEA)', 'ODE / PDE Modeling',
      'Numerical Analysis', 'Computational Mathematics',
      'Circuit Analysis', 'Electronics Prototyping',
      'Embedded Systems', 'Arduino', 'Raspberry Pi',
      'Microcontroller Programming', 'Sensor Integration',
      'MATLAB / MathWorks', 'STEM Olympiads',
    ],
  },
];

// TODO: Eric to confirm final skills list before deploy
