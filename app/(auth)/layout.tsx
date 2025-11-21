import FloatingMenu from '@/components/FloatingMenu';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full justify-center max-md:mt-10 md:items-center">
      {children}
      <FloatingMenu />
    </main>
  );
}
