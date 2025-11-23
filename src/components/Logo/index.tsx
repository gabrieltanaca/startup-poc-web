import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="text-sidebar-primary-foreground size-9 rounded-lg bg-stone-200 p-1">
      <Image src="/logo.png" alt="logo" width={40} height={40} className="object-cover" />
    </div>
  );
};
