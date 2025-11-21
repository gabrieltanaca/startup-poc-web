import { LanguageProvider } from './Language';
import { PropsWithChildren } from 'react';
import { ToastProvider } from './Toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from './Theme';

export const ContextProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
