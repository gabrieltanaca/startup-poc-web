import { LanguageProvider } from './Language';
import { PropsWithChildren } from 'react';
import { ToastProvider } from './Toast';
import { SidebarProvider } from '@/components/ui/sidebar';

export const ContextProviders = ({ children }: PropsWithChildren) => {
  return (
    <LanguageProvider>
      <ToastProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ToastProvider>
    </LanguageProvider>
  );
};
