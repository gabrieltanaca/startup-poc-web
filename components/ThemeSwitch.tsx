'use client';

import Switch from '@/components/Switch';
import { useTheme } from '@/contexts/Theme';
import { Label } from './ui/label';
import { useLanguage } from '@/contexts/Language';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';

type ThemeSwitchProps = HTMLAttributes<HTMLDivElement> & {
  hasLabel?: boolean;
  showIcon?: boolean;
};

export default function ThemeSwitch({
  hasLabel = true,
  showIcon = true,
  className,
  ...props
}: ThemeSwitchProps) {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {hasLabel && <Label>{t.theme.label}</Label>}
      <Switch
        checked={theme === 'dark'}
        onChange={() => toggleTheme()}
        icon={
          showIcon ? (
            theme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )
          ) : undefined
        }
      />
    </div>
  );
}
