import LanguageSelect from '@/components/LanguageSelect';
import ThemeSwitch from '@/components/ThemeSwitch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarFooter, SidebarSeparator } from '@/components/ui/sidebar';
import { TranslateType } from '@/lib/translations/pt';
import { cn } from '@/lib/utils';
import { LogOutIcon } from 'lucide-react';

type FooterProps = { open: boolean; translation: TranslateType };

const Footer = ({ open, translation: t }: FooterProps) => {
  const handleLogout = () => {
    try {
      localStorage.removeItem('app_token');
      localStorage.removeItem('app_language');
    } catch (e) {}
    window.location.href = '/login';
  };

  return (
    <SidebarFooter className="flex flex-col gap-3">
      <SidebarSeparator className="mx-0" />
      <div className="flex flex-col gap-2">
        <ThemeSwitch hasLabel={open} />
        <LanguageSelect compact={!open} />
      </div>
      <SidebarSeparator className="mx-0" />
      <div
        className={cn(
          'bg-card flex w-full items-center gap-2',
          open && 'border-border rounded-md border p-2',
        )}
      >
        <Avatar className="size-9">
          <AvatarImage src="/avatar.png" alt="Usuário" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {open && (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Usuário</p>
            <p className="text-sidebar-foreground/70 truncate text-xs">user@example.com</p>
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-pointer justify-start gap-3 rounded-md px-3 py-2"
        onClick={handleLogout}
      >
        <span className="flex items-center">
          <LogOutIcon className="h-5 w-5" />
        </span>
        {open && <span className="truncate">{t.sidebar.logout}</span>}
      </Button>
    </SidebarFooter>
  );
};

export default Footer;
