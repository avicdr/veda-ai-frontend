import Link from 'next/link';
import { BookOpen, Briefcase, FilePlus2, Grid2X2 } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', icon: Grid2X2 },
  { href: '/', label: 'Assignments', icon: Briefcase, active: true },
  { href: '/', label: 'Library', icon: FilePlus2 },
  { href: '/', label: 'AI Toolkit', icon: BookOpen }
];

export function MobileTabbar() {
  return (
    <nav className="no-print fixed inset-x-2.5 bottom-4 z-30 grid h-[72px] grid-cols-4 rounded-[20px] bg-[#171717] px-2 py-2 text-white shadow-[0_-18px_80px_rgba(0,0,0,0.22)] lg:hidden">
      {items.map((item) => (
        <Link key={item.label} href={item.href} className={`flex flex-col items-center justify-center gap-1 rounded-lg px-2 text-[11px] font-bold ${item.active ? 'text-white' : 'text-[#575757]'}`}>
          <item.icon size={21} fill="currentColor" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
