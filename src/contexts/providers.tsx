import { LanguageProvider } from './Language';
import { PropsWithChildren } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from './Theme';
import { Language } from '@/lib/translations';

export const ContextProviders = ({
  children,
  initialLang,
}: PropsWithChildren & { initialLang?: Language }) => {
  return (
    <ThemeProvider>
      <LanguageProvider initialLang={initialLang}>
        <SidebarProvider>{children}</SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
