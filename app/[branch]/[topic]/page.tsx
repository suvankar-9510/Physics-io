import { notFound } from 'next/navigation';
import { getTopicById, getBranchBySlug } from '../../../lib/topics';
import Breadcrumb from '../../../components/layout/Breadcrumb';
import SimulationCanvas from '../../../components/simulation/SimulationCanvas';
import ControlPanel from '../../../components/simulation/ControlPanel';
import TheorySection from '../../../components/theory/TheorySection';
import PracticalExamples from '../../../components/blocks/PracticalExamples';
import PrerequisiteFlowchart from '../../../components/blocks/PrerequisiteFlowchart';
import TopicConnections from '../../../components/blocks/TopicConnections';
import ExternalResources from '../../../components/blocks/ExternalResources';

interface PageProps {
  params: Promise<{ branch: string; topic: string }>;
}

const levelColors = {
  BSc: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  MSc: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  PhD: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export default async function TopicPage({ params }: PageProps) {
  const { branch: branchSlug, topic: topicSlug } = await params;
  const topic = getTopicById(topicSlug);
  const branch = getBranchBySlug(branchSlug);

  if (!topic || !branch) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumb crumbs={[
        { label: 'Home', href: '/' },
        { label: branch.name, href: `/${branchSlug}` },
        { label: topic.name },
      ]} />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{topic.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">{topic.description}</p>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${levelColors[topic.level]}`}>{topic.level}</span>
      </div>

      {/* Block 1: Simulation + Controls */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <SimulationCanvas />
        </div>
        <div className="lg:col-span-2">
          <ControlPanel />
        </div>
      </div>

      {/* Block 2: Theory */}
      <TheorySection />

      {/* Block 3: Practical Examples */}
      <PracticalExamples />

      {/* Block 4: Prerequisite Flowchart */}
      <PrerequisiteFlowchart />

      {/* Block 5: Topic Connections */}
      <TopicConnections />

      {/* Block 6: External Resources */}
      <ExternalResources />
    </div>
  );
}
