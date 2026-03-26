import React from 'react';
import { Network, ArrowRight } from 'lucide-react';

const CONNECTIONS = [
  {
    id: 1,
    topic: "Perturbation Theory",
    branch: "Quantum Mechanics",
    description: "Alternative approximation method. Compare when to use WKB vs Perturbation.",
  },
  {
    id: 2,
    topic: "Variational Method",
    branch: "Quantum Mechanics",
    description: "Another approximation method. Often used for ground state energy estimation.",
  },
  {
    id: 3,
    topic: "Semiclassical limit",
    branch: "Statistical Mechanics",
    description: "How WKB applies to partition functions in the limit of large quantum numbers.",
  },
  {
    id: 4,
    topic: "Instanton methods",
    branch: "Quantum Field Theory",
    description: "Advanced generalization of WKB tunnelling to continuous fields.",
  }
];

export default function TopicConnections() {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <Network className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Related Topics</h2>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
        {CONNECTIONS.map(conn => (
          <div key={conn.id} className="min-w-[280px] md:min-w-[320px] bg-card border rounded-lg p-5 snap-start shrink-0 flex flex-col hover:shadow-md transition-shadow">
            <span className="text-xs font-semibold text-primary/80 mb-1">{conn.branch}</span>
            <h3 className="font-bold text-lg mb-2">{conn.topic}</h3>
            <p className="text-sm text-muted-foreground flex-1 mb-4">
              {conn.description}
            </p>
            <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline mt-auto">
              Explore Topic <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
