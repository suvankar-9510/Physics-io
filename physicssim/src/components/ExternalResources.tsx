import React from 'react';
import { ExternalLink, Video, FileText, Book } from 'lucide-react';

const RESOURCES = [
  {
    id: 1,
    title: "NPTEL QM Lectures - WKB",
    author: "Prof. V. Balakrishnan (IIT Madras)",
    type: "Video",
    level: "MSc",
    icon: Video,
    url: "#"
  },
  {
    id: 2,
    title: "Intro to Quantum Mechanics, Ch 9",
    author: "David J. Griffiths",
    type: "Textbook",
    level: "BSc",
    icon: Book,
    url: "#"
  },
  {
    id: 3,
    title: "MIT OCW 8.06 - WKB Approximation",
    author: "Barton Zwiebach",
    type: "Notes",
    level: "BSc",
    icon: FileText,
    url: "#"
  }
];

export default function ExternalResources() {
  return (
    <section className="mt-8 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <ExternalLink className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Curated External Resources</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES.map(res => {
          const Icon = res.icon;
          return (
            <a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className="bg-card border rounded-lg p-5 flex items-start gap-4 hover:bg-muted/50 transition-colors group"
            >
              <div className="bg-primary/10 p-3 rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{res.type}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary/80">{res.level}</span>
                </div>
                <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors" title={res.title}>
                  {res.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate" title={res.author}>
                  {res.author}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
