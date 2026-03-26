import { create } from 'zustand';

interface SimulationState {
  energy: number;
  potentialHeight: number;
  barrierWidth: number;
  activeHighlight: string | null;
  setEnergy: (value: number) => void;
  setPotentialHeight: (value: number) => void;
  setBarrierWidth: (value: number) => void;
  setHighlight: (param: string | null) => void;
  loadPreset: (preset: Partial<SimulationState>) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  energy: 2.0,
  potentialHeight: 4.0,
  barrierWidth: 1.5,
  activeHighlight: null,
  setEnergy: (value) => set({ energy: value }),
  setPotentialHeight: (value) => set({ potentialHeight: value }),
  setBarrierWidth: (value) => set({ barrierWidth: value }),
  setHighlight: (param) => set({ activeHighlight: param }),
  loadPreset: (preset) => set((state) => ({ ...state, ...preset })),
}));
