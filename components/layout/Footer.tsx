export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-white mb-2">⚛️ PhysicsSim</p>
        <p className="text-sm">Simulate First. Derive Second. Understand Always.</p>
        <p className="text-xs mt-4 text-slate-500">© {new Date().getFullYear()} PhysicsSim. Built with Next.js 14 & Canvas 2D.</p>
      </div>
    </footer>
  );
}
