import { create } from 'zustand';
import { SimulationParams } from '../types';

interface SimulationState {
  params: SimulationParams;
  lastChanged: keyof SimulationParams | null;
  setParam: (key: keyof SimulationParams, value: number) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  params: {
    barrierHeight: 5,
    particleEnergy: 3,
    barrierWidth: 1.5,
    waveNumber: 2,
  },
  lastChanged: null,
  setParam: (key, value) =>
    set((state) => ({
      params: { ...state.params, [key]: value },
      lastChanged: key,
    })),
}));
