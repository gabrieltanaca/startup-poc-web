import { LanguageProvider, Language } from './Language';
import { PropsWithChildren } from 'react';
import { ToastProvider } from './Toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from './Theme';

export const ContextProviders = ({ children, initialLang }: PropsWithChildren & { initialLang?: Language }) => {
  return (
    <ThemeProvider>
      <LanguageProvider initialLang={initialLang}>
        <ToastProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
