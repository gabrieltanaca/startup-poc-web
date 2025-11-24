'use client';

import { PanelLeftIcon } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarSeparator, useSidebar } from '../ui/sidebar';
import { useLanguage } from '@/contexts/Language';
import { Logo } from '../Logo';
import { Button } from '../ui/button';
import Content from './__features/Content';
import Footer from './__features/Footer';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const { t } = useLanguage();
  const { state, toggleSidebar } = useSidebar();
  const open = state === 'expanded';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2 pt-4">
        <div className={cn('flex items-center justify-between gap-2 pb-2', !open && 'flex-col')}>
          {open && (
            <div className="flex flex-1 items-center gap-2">
              <Logo />
              {open && <span className="text-xl font-semibold">{t.general.portalTitle}</span>}
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <PanelLeftIcon
              className={`h-5 w-5 transition-transform ${!open ? 'rotate-180' : ''}`}
            />
          </Button>
          {!open && (
            <div className="flex flex-1 items-center gap-2">
              <Logo />
              {open && <span className="text-xl font-semibold">{t.general.portalTitle}</span>}
            </div>
          )}
        </div>
        <SidebarSeparator className="mx-0" />
      </SidebarHeader>
      <Content translation={t} />
      <Footer open={open} translation={t} />
    </Sidebar>
  );
}
