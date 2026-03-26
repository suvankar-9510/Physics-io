import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBranchBySlug, getTopicsByBranch } from '../../lib/topics';
import Breadcrumb from '../../components/layout/Breadcrumb';

interface PageProps {
  params: Promise<{ branch: string }>;
}

const levelColors = {
  BSc: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  MSc: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  PhD: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export default async function BranchPage({ params }: PageProps) {
  const { branch: branchSlug } = await params;
  const branch = getBranchBySlug(branchSlug);
  if (!branch) notFound();

  const topics = getTopicsByBranch(branchSlug);

  // Group topics by subTheme in a single pass O(N) to avoid O(N*M) nested loops
  const topicsBySubTheme = topics.reduce((acc, topic) => {
    if (!acc[topic.subTheme]) {
      acc[topic.subTheme] = [];
    }
    acc[topic.subTheme].push(topic);
    return acc;
  }, {} as Record<string, typeof topics>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: branch.name }]} />
      <div className="mb-10">
        <div className="text-5xl mb-3">{branch.emoji}</div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{branch.name}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl">{branch.description}</p>
      </div>

      {Object.entries(topicsBySubTheme).map(([theme, themeTopics]) => (
        <div key={theme} className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">{theme}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {themeTopics.map(topic => (
              <Link
                key={topic.id}
                href={`/${branchSlug}/${topic.id}`}
                className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:border-indigo-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">
                    {topic.name}
                  </h3>
                  <span className={`ml-2 flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${levelColors[topic.level]}`}>
                    {topic.level}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{topic.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {topics.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">Topics coming soon!</p>
        </div>
      )}
    </div>
  );
}
