import SimpleSidebar, { SimpleRoute } from '@/components/SimpleSidebar';
import { useLanguage } from '@/contexts/Language';
import { HistoryIcon, LayoutDashboardIcon, SearchIcon, Settings2Icon } from 'lucide-react';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full">
      <div className="w-auto">
        <SimpleSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
