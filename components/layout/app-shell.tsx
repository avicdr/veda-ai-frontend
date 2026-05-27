import { Navbar } from './navbar';
import { MobileTabbar } from './mobile-tabbar';
import { Sidebar } from './sidebar';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-cloud text-ink">
      <Sidebar />
      <div className="min-h-screen lg:pl-[327px] lg:pr-3 lg:pt-3">
        <Navbar />
        <div className="px-2 pb-24 pt-4 sm:px-3 sm:pt-5 lg:px-0 lg:pb-8 lg:pt-7">{children}</div>
      </div>
      <MobileTabbar />
    </div>
  );
}
