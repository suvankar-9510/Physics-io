"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GitBranch } from 'lucide-react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

const data: { nodes: Node[], links: Link[] } = {
  nodes: [
    { id: "Calculus", group: 1 },
    { id: "ODEs", group: 1 },
    { id: "Classical Mechanics", group: 1 },
    { id: "Schrödinger Eq", group: 1 },
    { id: "Infinite Square Well", group: 2 },
    { id: "Finite Square Well", group: 2 },
    { id: "Asymptotic Analysis", group: 2 },
    { id: "WKB Approximation", group: 3 },
  ],
  links: [
    { source: "Calculus", target: "ODEs" },
    { source: "ODEs", target: "Classical Mechanics" },
    { source: "Classical Mechanics", target: "Schrödinger Eq" },
    { source: "Schrödinger Eq", target: "Infinite Square Well" },
    { source: "Infinite Square Well", target: "Finite Square Well" },
    { source: "Finite Square Well", target: "WKB Approximation" },
    { source: "Asymptotic Analysis", target: "WKB Approximation" },
  ]
};

export default function PrerequisiteFlowchart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = 800;
    const height = 400;

    // Clear old renders
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Graph setup
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));

    const simulation = d3.forceSimulation(nodes)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Arrows
    svg.append("defs").selectAll("marker")
      .data(["end"])
      .join("marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("fill", "#999")
        .attr("d", "M0,-5L10,0L0,5");

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#end)");

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node as any).call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("r", 15)
        .attr("fill", d => (d as unknown as Node).group === 3 ? "#ef4444" : (d as unknown as Node).group === 2 ? "#eab308" : "#22c55e");

    node.append("text")
        .text(d => (d as unknown as Node).id)
        .attr("x", 18)
        .attr("y", 4)
        .attr("class", "text-sm fill-foreground pointer-events-none");

    simulation.on("tick", () => {
      link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("x1", d => (d.source as any).x)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("y1", d => (d.source as any).y)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("x2", d => (d.target as any).x)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("y2", d => (d.target as any).y);

      node
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("transform", d => `translate(${(d as any).x},${(d as any).y})`);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

  }, []);

  return (
    <section className="mt-8 bg-card border rounded-lg p-6 md:p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <GitBranch className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Prerequisite Map</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Drag nodes to explore the dependency graph. Red marks the current topic.</p>

      <div className="w-full overflow-x-auto border rounded-md bg-muted/20">
        <svg ref={svgRef} className="w-full min-w-[600px] h-[400px] text-foreground"></svg>
      </div>

      <div className="flex gap-4 mt-4 text-xs">
         <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span> BSc Core</span>
         <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span> MSc Core</span>
         <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span> Current Topic</span>
      </div>
    </section>
  );
}
