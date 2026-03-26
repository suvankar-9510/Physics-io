export interface Topic {
  id: string;
  name: string;
  branch: string;
  branchSlug: string;
  level: 'BSc' | 'MSc' | 'PhD';
  description: string;
  subTheme: string;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  description: string;
  topicCount: number;
}

export interface SimulationParams {
  barrierHeight: number;  // eV
  particleEnergy: number; // eV
  barrierWidth: number;   // nm
  waveNumber: number;
}

export interface PrerequisiteNode {
  id: string;
  label: string;
  level: 'bsc' | 'msc' | 'current';
}
