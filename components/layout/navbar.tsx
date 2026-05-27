import { ArrowLeft, Bell, ChevronDown, Grid2X2, Menu } from 'lucide-react';
import { BrandMark } from './brand';

export function Navbar() {
  return (
    <header className="no-print sticky top-0 z-20 px-2 pt-3 sm:px-3 lg:px-0 lg:pt-0">
      <div className="hidden h-[56px] items-center justify-between rounded-[13px] bg-white px-6 shadow-[0_14px_42px_rgba(255,255,255,0.55)] lg:flex">
        <div className="flex items-center gap-3">
          <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#2D2D2D] shadow-[0_10px_26px_rgba(0,0,0,0.05)]">
            <ArrowLeft size={25} />
          </button>
          <Grid2X2 size={22} className="text-[#A9A9A9]" />
          <span className="text-base font-bold text-[#A9A9A9]">Assignment</span>
        </div>
        <div className="flex items-center gap-5">
          <button className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-[#2D2D2D]">
            <Bell size={24} />
            <span className="absolute right-1.5 top-0.5 h-2.5 w-2.5 rounded-full bg-[#FF572A]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FFD8CC] text-xs font-black text-[#6B3D21]">JD</div>
            <p className="text-base font-bold text-[#2D2D2D]">John Doe</p>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
      <div className="flex h-14 items-center justify-between rounded-[13px] bg-white px-3 lg:hidden">
        <div className="flex items-center gap-3">
          <BrandMark size="sm" />
          <span className="text-xl font-black tracking-[-0.04em]">VedaAI</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative grid h-10 w-10 place-items-center rounded-full bg-[#F4F4F4]">
            <Bell size={24} />
            <span className="absolute right-1.5 top-0.5 h-2.5 w-2.5 rounded-full bg-[#FF572A]" />
          </button>
          <div className="h-9 w-9 rounded-full bg-[#FFD8CC]" />
          <Menu size={29} />
        </div>
      </div>
    </header>
  );
}
