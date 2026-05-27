import Link from 'next/link';
import { BookOpen, ClipboardList, FileText, Grid2X2, Settings, Sparkles, UserRound } from 'lucide-react';
import { BrandMark, SchoolBadge } from './brand';

const navItems = [
  { href: '/', label: 'Home', icon: Grid2X2 },
  { href: '/', label: 'My Groups', icon: UserRound },
  { href: '/', label: 'Assignments', icon: ClipboardList, active: true, count: 10 },
  { href: '/', label: "AI Teacher's Toolkit", icon: BookOpen },
  { href: '/', label: 'My Library', icon: FileText, count: 32 }
];

export function Sidebar() {
  return (
    <aside className="no-print fixed bottom-3 left-3 top-3 z-30 hidden w-[303px] rounded-[14px] bg-white p-6 shadow-[0_28px_70px_rgba(0,0,0,0.16)] lg:block">
      <Link href="/" className="flex items-center gap-3">
        <BrandMark size="lg" />
        <div>
          <p className="text-[27px] font-black leading-none tracking-[-0.04em] text-[#282828]">VedaAI</p>
        </div>
      </Link>

      <Link
        href="/assignments/new"
        className="mt-[55px] inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full border-[3px] border-[#FF7D5C] bg-[linear-gradient(180deg,#3f3f3f,#1b1b1b)] text-base font-bold text-white shadow-[inset_0_8px_22px_rgba(255,255,255,0.12),0_12px_28px_rgba(0,0,0,0.16)] transition hover:brightness-110"
      >
        <Sparkles size={18} fill="white" />
        Create Assignment
      </Link>

      <nav className="mt-[58px] space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex h-[38px] items-center gap-3 rounded-lg px-3 text-base font-medium transition ${
              item.active ? 'bg-[#EFEFEF] font-bold text-[#2D2D2D]' : 'text-[#858585] hover:bg-[#F5F5F5] hover:text-[#2D2D2D]'
            }`}
          >
            <item.icon size={20} strokeWidth={2.4} />
            <span className="min-w-0 flex-1">{item.label}</span>
            {item.count ? <span className="rounded-full bg-[#FF572A] px-3 py-0.5 text-sm font-bold text-white">{item.count}</span> : null}
          </Link>
        ))}
      </nav>

      <Link href="/" className="absolute bottom-[134px] left-9 right-9 flex items-center gap-3 rounded-md text-base font-medium text-[#858585] hover:text-[#2D2D2D]">
        <Settings size={20} />
        Settings
      </Link>
      <div className="absolute bottom-6 left-6 right-6">
        <SchoolBadge />
      </div>
    </aside>
  );
}
