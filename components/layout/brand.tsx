export function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: 'h-[30px] w-[30px] rounded-lg text-lg',
    md: 'h-10 w-10 rounded-xl text-2xl',
    lg: 'h-10 w-10 rounded-xl text-2xl'
  }[size];

  return (
    <div className={`grid place-items-center bg-[linear-gradient(135deg,#ff8a19_0%,#f15a24_42%,#202020_78%)] font-black italic text-white shadow-[0_18px_35px_rgba(0,0,0,0.18)] ${dimensions}`}>
      V
    </div>
  );
}

export function SchoolBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#F0F0F0] p-4">
      <div className={`${compact ? 'h-10 w-10' : 'h-[52px] w-[52px]'} grid shrink-0 place-items-center rounded-full bg-[#FFD8CC] text-base font-bold text-[#7A3A23]`}>
        DPS
      </div>
      <div>
        <p className="text-sm font-bold leading-tight text-[#2D2D2D]">Delhi Public School</p>
        <p className="mt-1 text-xs text-[#777]">Bokaro Steel City</p>
      </div>
    </div>
  );
}
