'use client';

interface Node {
  id: string;
  label: string;
  level: 'bsc' | 'msc' | 'current';
  y: number;
}

const nodes: Node[] = [
  { id: 'calculus', label: 'Calculus', level: 'bsc', y: 0 },
  { id: 'odes', label: 'ODEs', level: 'bsc', y: 1 },
  { id: 'classical', label: 'Classical Mechanics', level: 'bsc', y: 2 },
  { id: 'schrodinger', label: 'Schrödinger Equation', level: 'bsc', y: 3 },
  { id: 'isw', label: 'Infinite Square Well', level: 'bsc', y: 4 },
  { id: 'fsw', label: 'Finite Square Well', level: 'msc', y: 5 },
  { id: 'wkb', label: 'WKB Approximation', level: 'current', y: 6 },
  { id: 'conn', label: 'Connection Formulae', level: 'msc', y: 7 },
  { id: 'tunnel', label: 'Tunnelling Probability', level: 'msc', y: 8 },
];

const colors = {
  bsc: { bg: '#dcfce7', border: '#16a34a', text: '#15803d' },
  msc: { bg: '#fef3c7', border: '#d97706', text: '#92400e' },
  current: { bg: '#fecaca', border: '#dc2626', text: '#991b1b' },
};

const nodeH = 40;
const nodeW = 200;
const gapY = 60;
const svgW = 260;
const svgH = nodes.length * gapY + nodeH;

export default function PrerequisiteFlowchart() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-md">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Prerequisite Flowchart</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1" />BSc &nbsp;
        <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1" />MSc &nbsp;
        <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1" />Current Topic
      </p>
      <div className="overflow-x-auto">
        <svg width={svgW} height={svgH} className="mx-auto">
          {nodes.slice(0, -1).map((node, i) => {
            const x = svgW / 2;
            const y1 = i * gapY + nodeH;
            const y2 = (i + 1) * gapY;
            return (
              <g key={`arrow-${i}`}>
                <line x1={x} y1={y1} x2={x} y2={y2 - 6} stroke="#94a3b8" strokeWidth={2} />
                <polygon points={`${x - 5},${y2 - 6} ${x + 5},${y2 - 6} ${x},${y2}`} fill="#94a3b8" />
              </g>
            );
          })}
          {nodes.map((node) => {
            const c = colors[node.level];
            const x = (svgW - nodeW) / 2;
            const y = node.y * gapY;
            return (
              <g key={node.id}>
                <rect x={x} y={y} width={nodeW} height={nodeH} rx={8} fill={c.bg} stroke={c.border} strokeWidth={node.level === 'current' ? 3 : 1.5} />
                <text x={svgW / 2} y={y + nodeH / 2 + 5} textAnchor="middle" fontSize={13} fontWeight={node.level === 'current' ? 700 : 500} fill={c.text}>
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
