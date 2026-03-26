import Link from 'next/link';
import { branches } from '../lib/topics';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="text-6xl mb-4">⚛️</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Simulate First. Derive Second. Understand Always.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Interactive physics simulations for university students. See the physics, then understand the maths. Choose a branch to get started.
        </p>
      </div>

      {/* Branch Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {branches.map(branch => (
          <Link
            key={branch.id}
            href={`/${branch.slug}`}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-indigo-400 hover:shadow-xl transition-all duration-200"
          >
            <div className="text-4xl mb-3">{branch.emoji}</div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {branch.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{branch.description}</p>
            {branch.topicCount > 0 ? (
              <span className="inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-1 rounded-full">
                {branch.topicCount} topics
              </span>
            ) : (
              <span className="inline-block text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                Coming soon
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
