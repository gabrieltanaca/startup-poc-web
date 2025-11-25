import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/Language';
import { HistoryItem } from '@/service/history';
import { Loader2, X } from 'lucide-react';
import { MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

export type ModalActions = {
  cancel: string;
  confirm: string;
};

export type ModalProps = PropsWithChildren & {
  title: string;
  isLoading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onConfirm?: MouseEventHandler<HTMLButtonElement> | undefined;
  description?: string;
  helper?: string;
  actions?: ModalActions;
};

function Modal({
  isLoading,
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  title,
  description,
  helper,
  actions,
  children,
}: ModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center">
            <X className="mr-2 h-5 w-5" /> {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {helper && <div className="text-muted-foreground mt-4 text-sm">{helper}</div>}
        {children}
        {actions && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isLoading}>
              {actions.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={(e) => {
                onConfirm?.(e);
                setIsModalOpen(false);
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {actions.confirm}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
