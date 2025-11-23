import { ToastContext } from '@/contexts/Toast';
import { ToastOptions } from '@/types/toast';
import { useCallback, useContext } from 'react';

let count = 0;

export function generateId() {
  count = (count + 1) % 1000;
  return `toast-${Date.now()}-${count}`;
}

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider (Toaster)');
  }

  const { addToast, dismissToast, updateToast } = context;

  const toast = useCallback(
    (props: ToastOptions) => {
      const id = generateId();
      addToast({ ...props, id, variant: props.variant || 'default' });
      return { id };
    },
    [addToast],
  );

  return { toast, dismiss: dismissToast, update: updateToast };
};
