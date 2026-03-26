"use client";

import React from 'react';
import LiveFormula from './LiveFormula';
import { useSimulationStore } from '../store/useSimulationStore';
import { BookOpen } from 'lucide-react';

export default function TheorySection() {
  const { energy, potentialHeight, barrierWidth } = useSimulationStore();

  // Example calculating transmission T simply for the live output
  const kappa = Math.sqrt(Math.max(0, potentialHeight - energy));
  const transmission = energy >= potentialHeight
    ? 1.0
    : Math.exp(-2 * kappa * barrierWidth);

  return (
    <section className="mt-8 bg-card text-card-foreground border rounded-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Theory: WKB Approximation</h2>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-8 text-sm flex items-start gap-3">
           <span className="text-xl">💡</span>
           <p className="m-0 text-yellow-800 dark:text-yellow-200">
             <strong>Interactive Theory:</strong> Hover over the sliders in the Control Panel above.
             The equations below will <span className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">highlight</span> to
             show you exactly which parts of the math are changing.
           </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">1. Introduction & Assumptions</h3>
          <p>
            The WKB (Wentzel-Kramers-Brillouin) approximation is a semiclassical method for solving the time-independent Schrödinger equation.
            It is valid when the potential
            <LiveFormula math="V(x)" param="potential" />
            varies slowly compared to the de Broglie wavelength of the particle.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">2. The Wavefunction in Forbidden Regions</h3>
          <p>
            For a particle with total energy
            <LiveFormula math="E" param="energy" />
            incident on a potential barrier of height
            <LiveFormula math="V_0" param="potential" />
            where
            <LiveFormula math="E < V_0" param={['energy', 'potential']} />,
            the classical kinetic energy is negative. This is the classically forbidden region.
          </p>
          <p className="mt-4">
            The local wave number is imaginary, defined as:
          </p>
          <LiveFormula block math="\kappa(x) = \frac{\sqrt{2m(V(x) - E)}}{\hbar}" param={['energy', 'potential']} />

          <div className="bg-muted p-4 rounded-md my-4 font-mono text-sm border">
            Live evaluation: <br/>
            κ = √[2m(
               <span className={useSimulationStore(s => s.activeHighlight) === 'potential' ? 'bg-yellow-200 dark:bg-yellow-900 px-1 text-black dark:text-white' : ''}>{potentialHeight.toFixed(2)}</span>
               -
               <span className={useSimulationStore(s => s.activeHighlight) === 'energy' ? 'bg-yellow-200 dark:bg-yellow-900 px-1 text-black dark:text-white' : ''}>{energy.toFixed(2)}</span>
            )] / ħ
            <br/>
            κ ∝ {(Math.max(0, potentialHeight - energy)).toFixed(3)}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">3. Transmission Probability (Tunnelling)</h3>
          <p>
            The probability of the particle tunnelling through a barrier of width
            <LiveFormula math="a" param="width" />
            is given by the Gamow factor, calculated by integrating the momentum over the forbidden region:
          </p>
          <LiveFormula block math="T \approx \exp\left( -2 \int_{0}^{a} \kappa(x) \, dx \right)" param={['width', 'energy', 'potential']} />

          <p className="mt-4">
             For a rectangular barrier of constant height <LiveFormula math="V_0" param="potential" />, this simplifies to:
          </p>
          <LiveFormula block math="T \approx e^{-2 \kappa a}" param={['width', 'energy', 'potential']} />

          <div className="bg-muted p-4 rounded-md my-4 font-mono text-sm border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              Live Tunnelling Coefficient <LiveFormula math="T" />:
            </div>
            <div className="text-2xl font-bold text-primary">
              {(transmission * 100).toExponential(2)} %
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
