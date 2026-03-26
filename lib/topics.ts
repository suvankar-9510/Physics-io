import { Topic, Branch } from '../types';

export const branches: Branch[] = [
  { id: 'qm', slug: 'quantum-mechanics', name: 'Quantum Mechanics', emoji: '⚛️', description: 'Wave functions, operators, and the quantum world', topicCount: 6 },
  { id: 'cm', slug: 'classical-mechanics', name: 'Classical Mechanics', emoji: '🔭', description: 'Lagrangian, Hamiltonian, and analytical mechanics', topicCount: 6 },
  { id: 'sm', slug: 'statistical-mechanics', name: 'Statistical Mechanics', emoji: '🎲', description: 'Ensembles, entropy, and thermodynamic behaviour', topicCount: 6 },
  { id: 'ss', slug: 'solid-state-physics', name: 'Solid-State Physics', emoji: '🔬', description: 'Crystal structure, band theory, and condensed matter', topicCount: 6 },
  { id: 'em', slug: 'classical-electrodynamics', name: 'Classical Electrodynamics', emoji: '⚡', description: "Maxwell's equations, radiation, and wave propagation", topicCount: 0 },
  { id: 'op', slug: 'optics-photonics', name: 'Optics & Photonics', emoji: '🌈', description: 'Light, lenses, lasers, and photonic devices', topicCount: 0 },
  { id: 'th', slug: 'thermodynamics', name: 'Thermodynamics', emoji: '🌡️', description: 'Heat, work, and the laws of energy', topicCount: 0 },
  { id: 'gr', slug: 'general-relativity', name: 'General Relativity & Astrophysics', emoji: '🌌', description: 'Spacetime curvature, gravity, and cosmology', topicCount: 0 },
  { id: 'np', slug: 'nuclear-particle-physics', name: 'Nuclear & Particle Physics', emoji: '💫', description: 'Quarks, leptons, and nuclear forces', topicCount: 0 },
  { id: 'mp', slug: 'mathematical-physics', name: 'Mathematical Physics', emoji: '📐', description: 'Group theory, tensors, and mathematical methods', topicCount: 0 },
];

export const topics: Topic[] = [
  // Quantum Mechanics
  { id: 'infinite-square-well', name: 'Infinite Square Well', branch: 'Quantum Mechanics', branchSlug: 'quantum-mechanics', level: 'BSc', description: 'Energy quantization and stationary states in an infinite potential well.', subTheme: 'Bound States' },
  { id: 'harmonic-oscillator', name: 'Harmonic Oscillator', branch: 'Quantum Mechanics', branchSlug: 'quantum-mechanics', level: 'BSc', description: 'Ladder operators, zero-point energy, and coherent states.', subTheme: 'Bound States' },
  { id: 'wkb-approximation', name: 'WKB Approximation', branch: 'Quantum Mechanics', branchSlug: 'quantum-mechanics', level: 'MSc', description: 'Semi-classical approximation for slowly varying potentials, tunnelling, and connection formulae.', subTheme: 'Approximation Methods' },
  { id: 'perturbation-theory', name: 'Time-Independent Perturbation Theory', branch: 'Quantum Mechanics', branchSlug: 'quantum-mechanics', level: 'MSc', description: 'First and second-order corrections to energy levels and eigenstates.', subTheme: 'Approximation Methods' },
  { id: 'variational-method', name: 'Variational Method', branch: 'Quantum Mechanics', branchSlug: 'quantum-mechanics', level: 'MSc', description: 'Variational principle and trial wavefunctions for ground-state energies.', subTheme: 'Approximation Methods' },
  { id: 'hydrogen-atom', name: 'Hydrogen Atom', branch: 'Quantum Mechanics', branchSlug: 'quantum-mechanics', level: 'BSc', description: 'Exact solution of the Coulomb potential, spherical harmonics, and quantum numbers.', subTheme: 'Central Potentials' },
  // Classical Mechanics
  { id: 'lagrangian-mechanics', name: 'Lagrangian Mechanics', branch: 'Classical Mechanics', branchSlug: 'classical-mechanics', level: 'BSc', description: "Euler-Lagrange equations and generalized coordinates.", subTheme: 'Analytical Mechanics' },
  { id: 'hamiltonian-mechanics', name: 'Hamiltonian Mechanics & Phase Space', branch: 'Classical Mechanics', branchSlug: 'classical-mechanics', level: 'BSc', description: "Hamilton's equations, phase portraits, and Liouville's theorem.", subTheme: 'Analytical Mechanics' },
  { id: 'normal-modes', name: 'Normal Modes', branch: 'Classical Mechanics', branchSlug: 'classical-mechanics', level: 'BSc', description: 'Coupled oscillators, eigenfrequencies, and normal coordinates.', subTheme: 'Oscillations' },
  { id: 'central-force', name: 'Central Force Problem', branch: 'Classical Mechanics', branchSlug: 'classical-mechanics', level: 'BSc', description: "Kepler's laws, orbit equations, and effective potential.", subTheme: 'Orbital Mechanics' },
  { id: 'rigid-body', name: 'Rigid Body Rotation', branch: 'Classical Mechanics', branchSlug: 'classical-mechanics', level: 'MSc', description: 'Inertia tensor, Euler angles, and torque-free precession.', subTheme: 'Rigid Body Dynamics' },
  { id: 'canonical-transformations', name: 'Canonical Transformations', branch: 'Classical Mechanics', branchSlug: 'classical-mechanics', level: 'MSc', description: 'Generating functions, Poisson brackets, and Hamilton-Jacobi theory.', subTheme: 'Analytical Mechanics' },
  // Statistical Mechanics
  { id: 'microcanonical', name: 'Microcanonical Ensemble', branch: 'Statistical Mechanics', branchSlug: 'statistical-mechanics', level: 'BSc', description: 'Isolated systems, entropy as log of phase volume, and temperature.', subTheme: 'Ensembles' },
  { id: 'canonical', name: 'Canonical Ensemble', branch: 'Statistical Mechanics', branchSlug: 'statistical-mechanics', level: 'BSc', description: 'Boltzmann factor, partition function, and Helmholtz free energy.', subTheme: 'Ensembles' },
  { id: 'grand-canonical', name: 'Grand Canonical Ensemble', branch: 'Statistical Mechanics', branchSlug: 'statistical-mechanics', level: 'MSc', description: 'Variable particle number, chemical potential, and grand potential.', subTheme: 'Ensembles' },
  { id: 'quantum-statistics', name: 'Quantum Statistics', branch: 'Statistical Mechanics', branchSlug: 'statistical-mechanics', level: 'MSc', description: 'Fermi-Dirac and Bose-Einstein distributions, degeneracy pressure.', subTheme: 'Quantum Gases' },
  { id: 'ising-model', name: 'Ising Model', branch: 'Statistical Mechanics', branchSlug: 'statistical-mechanics', level: 'MSc', description: 'Lattice spin model, mean-field theory, and exact 1D solution.', subTheme: 'Phase Transitions' },
  { id: 'phase-transitions', name: 'Phase Transitions', branch: 'Statistical Mechanics', branchSlug: 'statistical-mechanics', level: 'PhD', description: 'Order parameters, critical exponents, and universality classes.', subTheme: 'Phase Transitions' },
  // Solid-State Physics
  { id: 'drude-sommerfeld', name: 'Drude & Sommerfeld Models', branch: 'Solid-State Physics', branchSlug: 'solid-state-physics', level: 'BSc', description: 'Classical and quantum free electron models of metals.', subTheme: 'Free Electron Theory' },
  { id: 'crystal-structure', name: 'Crystal Structure', branch: 'Solid-State Physics', branchSlug: 'solid-state-physics', level: 'BSc', description: 'Bravais lattices, reciprocal lattice, and Brillouin zones.', subTheme: 'Crystallography' },
  { id: 'nearly-free-electron', name: 'Nearly Free Electron Model', branch: 'Solid-State Physics', branchSlug: 'solid-state-physics', level: 'MSc', description: 'Bloch theorem, band gaps, and effective mass.', subTheme: 'Band Theory' },
  { id: 'tight-binding', name: 'Tight-Binding Model', branch: 'Solid-State Physics', branchSlug: 'solid-state-physics', level: 'MSc', description: 'LCAO approach to band structure, hopping integrals.', subTheme: 'Band Theory' },
  { id: 'phonons-debye', name: 'Phonons & Debye Model', branch: 'Solid-State Physics', branchSlug: 'solid-state-physics', level: 'MSc', description: 'Lattice vibrations, Debye model, and heat capacity of solids.', subTheme: 'Lattice Dynamics' },
  { id: 'hall-effect', name: 'Hall Effect', branch: 'Solid-State Physics', branchSlug: 'solid-state-physics', level: 'BSc', description: 'Transverse voltage, Hall coefficient, and carrier type determination.', subTheme: 'Transport Theory' },
];

export function getTopicsByBranch(branchSlug: string): Topic[] {
  return topics.filter(t => t.branchSlug === branchSlug);
}

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find(b => b.slug === slug);
}
