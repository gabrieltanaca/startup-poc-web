export type Toast = Omit<any, 'id' | 'open' | 'onOpenChange'> & {
  id: string;
};

export type ActiveToast = Omit<any, 'onOpenChange'>;

export type ToastOptions = Omit<Toast, 'id' | 'variant'> & {
  variant?: Toast['variant'];
  id?: Toast['id'];
};
