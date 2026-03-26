import Link from 'next/link';

interface Crumb { label: string; href?: string; }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {c.href ? (
            <Link href={c.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{c.label}</Link>
          ) : (
            <span className="text-slate-900 dark:text-white font-medium">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
