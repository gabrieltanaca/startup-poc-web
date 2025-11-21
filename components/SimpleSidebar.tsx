'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChartColumnIncreasing,
  HistoryIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PanelLeftIcon,
  SearchIcon,
  Settings2Icon,
} from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/Language';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import LanguageSelect from '@/components/LanguageSelect';
import ThemeSwitch from '@/components/ThemeSwitch';
import { Logo } from './Logo';

export type SimpleRoute = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export default function SimpleSidebar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<boolean>(true);

  const routes: SimpleRoute[] = [
    { label: t.sidebar.search, href: '/search', icon: <SearchIcon className="h-5 w-5" /> },
    {
      label: t.sidebar.dashboard,
      href: '/dashboard',
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    { label: t.sidebar.history, href: '/history', icon: <HistoryIcon className="h-5 w-5" /> },
    {
      label: t.sidebar.statistics,
      href: '/statistics',
      icon: <ChartColumnIncreasing className="h-5 w-5" />,
    },
    { label: t.sidebar.config, href: '/settings', icon: <Settings2Icon className="h-5 w-5" /> },
  ];

  return (
    <aside
      className={cn(
        `bg-sidebar text-sidebar-foreground flex h-full flex-col transition-all duration-200 ease-linear`,
        'w-[250px]',
        !open && 'w-[58px]',
      )}
      aria-hidden={false}
    >
      <div className={cn('flex items-center justify-between gap-2 px-2 py-2', !open && 'flex-col')}>
        {open && (
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold">{t.general.portalTitle}</span>
          </div>
        )}
        <Button variant="ghost" onClick={() => setOpen((s) => !s)}>
          <PanelLeftIcon className={`h-4 w-4 transition-transform ${open ? '' : 'rotate-180'}`} />
        </Button>
        {!open && <Logo />}
      </div>

      <nav className="mt-4 flex flex-col gap-1 px-1">
        {routes.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2',
              !open && 'justify-center',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )}
          >
            <span className="flex size-4 items-center justify-center">
              {r.icon ?? <span className="w-4" />}
            </span>
            {open && <span className="truncate">{r.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-4 px-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">{t.search.filters}</span>
          <ThemeSwitch />
        </div>
        <div className="mt-2">
          <LanguageSelect />
        </div>
      </div>

      <footer className="mt-auto p-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'bg-card flex w-full items-center gap-3 rounded-md',
                open && 'border-border border p-2',
              )}
            >
              <div className="text-sidebar-primary-foreground flex size-9 items-center justify-center overflow-hidden rounded-full bg-stone-200">
                <span className="text-sm font-medium">U</span>
              </div>
              {open && (
                <div>
                  <p className="text-sm font-medium">Usuário</p>
                  <p className="text-sidebar-foreground/70 text-xs">user@example.com</p>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              try {
                localStorage.removeItem('app_token');
                localStorage.removeItem('app_language');
              } catch (e) {}
              window.location.href = '/';
            }}
            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-pointer justify-start gap-3 rounded-md px-3 py-2"
          >
            <span className="flex size-4 items-center justify-center">
              <LogOutIcon className="h-5 w-5" />
            </span>
            {open && <span className="truncate">{t.sidebar.logout}</span>}
          </Button>
        </div>
      </footer>
    </aside>
  );
}
