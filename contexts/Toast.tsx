'use client';

import { generateId } from '@/hooks/use-toast';
import { ActiveToast, Toast, ToastOptions } from '@/types/toast';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react';

type State = {
  toasts: ActiveToast[];
};

type Action =
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'DISMISS_TOAST'; id: string }
  | { type: 'UPDATE_TOAST'; id: string; props: ToastOptions }
  | { type: 'REMOVE_TOAST'; id: string };

const TOAST_LIMIT = 5;

const toastReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      const newActiveToast: ActiveToast = {
        ...action.toast,
        open: true,
      };
      return {
        ...state,
        toasts: [newActiveToast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.id ? { ...t, ...action.props } : t)),
      };

    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.id ? { ...t, open: false } : t)),
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };

    default:
      return state;
  }
};

interface ToastContextType {
  toasts: ActiveToast[];
  addToast: (props: ToastOptions) => { id: string };
  dismissToast: (id: string) => void;
  updateToast: (id: string, props: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback((props: ToastOptions) => {
    const toast: Toast = { ...props, id: props.id || generateId() };
    dispatch({ type: 'ADD_TOAST', toast });
    return { id: toast.id };
  }, []);

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: 'DISMISS_TOAST', id });
  }, []);

  const updateToast = useCallback((id: string, props: ToastOptions) => {
    dispatch({ type: 'UPDATE_TOAST', id, props });
  }, []);

  const value = useMemo(
    () => ({
      toasts: state.toasts,
      addToast,
      dismissToast,
      updateToast,
    }),
    [state.toasts, addToast, dismissToast, updateToast],
  );

  useEffect(() => {
    state.toasts
      .filter((t) => !t.open)
      .forEach((t) => {
        const timeout = setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', id: t.id });
        }, 300);
        return () => clearTimeout(timeout);
      });
  }, [state.toasts]);

  useEffect(() => {
    state.toasts
      .filter((t) => t.open && t.duration !== 0)
      .forEach((t) => {
        const timeout = setTimeout(() => {
          dispatch({ type: 'DISMISS_TOAST', id: t.id });
        }, t.duration || 5000);
        return () => clearTimeout(timeout);
      });
  }, [state.toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
