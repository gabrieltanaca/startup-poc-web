'use client';

import { cn } from '@/lib/utils';
import LanguageSelect from '@/components/LanguageSelect';
import ThemeSwitch from '../ThemeSwitch';

export default function FloatingMenu({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-card border-border fixed bottom-4 left-4 z-50 flex w-44 flex-col gap-3 rounded-md border p-3 shadow-md',
        className,
      )}
    >
      <ThemeSwitch />
      <LanguageSelect />
    </div>
  );
}
