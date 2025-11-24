'use client';

import { ExternalToast, toast } from 'sonner';

export const useToast = () => {
  return {
    success: (message: string, options?: ExternalToast) => {
      toast.success(message, {
        duration: 2500,
        position: 'top-right',
        className: '!bg-green-600',
        ...options,
      });
    },

    error: (message: string, options?: ExternalToast) => {
      toast.error(message, {
        duration: 2500,
        position: 'top-right',
        className: '!bg-red-600',
        ...options,
      });
    },

    info: (message: string, options?: ExternalToast) => {
      toast.info(message, {
        duration: 2500,
        position: 'top-right',
        className: '!bg-blue-600',

        ...options,
      });
    },

    default: (message: string, options?: ExternalToast) => {
      toast(message, { duration: 2500, position: 'top-right', ...options });
    },
  };
};
