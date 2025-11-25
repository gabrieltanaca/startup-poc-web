import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

type FieldProps = React.ComponentProps<'input'> & {
  label: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  error?: string;
};

export const Field = ({ label, icon, error, className, ...props }: FieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <div className="relative">
        {icon
          ? React.createElement(icon, {
              className: 'text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
            })
          : null}
        <Input className={cn(icon && 'pl-10', className)} {...props} />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
