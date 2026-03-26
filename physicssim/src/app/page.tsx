import React from 'react';
import Navigation from '../components/Navigation';
import SimulationCanvas from '../components/SimulationCanvas';
import ControlPanel from '../components/ControlPanel';
import TheorySection from '../components/TheorySection';
import PracticalExamples from '../components/PracticalExamples';
import PrerequisiteFlowchart from '../components/PrerequisiteFlowchart';
import TopicConnections from '../components/TopicConnections';
import ExternalResources from '../components/ExternalResources';
import { ChevronRight, Share2, Bookmark } from 'lucide-react';

export default function WKBTopicPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-6 max-w-[1400px]">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <nav className="flex items-center text-sm text-muted-foreground whitespace-nowrap overflow-x-auto">
            <a href="/" className="hover:text-foreground">Home</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <a href="/branches/qm" className="hover:text-foreground">Quantum Mechanics</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-foreground font-medium">WKB Approximation</span>
          </nav>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              <Bookmark className="w-4 h-4 mr-2" /> Save
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">WKB Approximation</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            A semiclassical method for solving the Schrödinger equation when the potential varies slowly. Interactive simulation, live derivations, and conceptual examples.
          </p>
        </div>

        {/* Desktop Layout: Canvas + Control Panel Side by Side */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
           <div className="w-full lg:w-[60%] xl:w-[65%] min-h-[400px] lg:min-h-[500px]">
              <SimulationCanvas />
           </div>
           <div className="w-full lg:w-[40%] xl:w-[35%] h-auto lg:h-[500px]">
              <ControlPanel />
           </div>
        </div>

        {/* Content Blocks */}
        <div className="max-w-4xl">
           <TheorySection />
        </div>

        <PracticalExamples />

        <PrerequisiteFlowchart />

        <TopicConnections />

        <ExternalResources />
      </main>

      <footer className="border-t py-6 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 PhysicsSim. Open-source educational platform.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">About</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">Contribute</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
