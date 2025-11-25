import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TranslateType } from '@/lib/translations/pt';
import { HTMLAttributes, useState } from 'react';
import z from 'zod';
import { Field } from '../Field';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/Language';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

const mockUpdatePasswordSupabase = async (newPassword: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (newPassword === 'password123') {
        reject(new Error('A nova senha é muito comum.'));
      } else if (newPassword.length < 8) {
        reject(new Error('A senha deve ter pelo menos 8 caracteres.'));
      } else {
        resolve();
      }
    }, 1500);
  });
};

const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Senha deve ter ao menos 8 caracteres' }),
  newPassword: z.string().min(8, { message: 'Senha deve ter ao menos 8 caracteres' }),
  confirmPassword: z.string().min(8, { message: 'Senha deve ter ao menos 8 caracteres' }),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePasswordForm = ({ className, ...props }: HTMLAttributes<HTMLFormElement>) => {
  const toast = useToast();
  const { t } = useLanguage();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);

    try {
      if (data.confirmPassword !== data.newPassword) {
        toast.error(t.settings.password_error_mismatch);
        setIsLoading(false);
        return;
      }

      if (data.newPassword === data.currentPassword) {
        toast.error(t.settings.password_error_same);
        setIsLoading(false);
        return;
      }

      await mockUpdatePasswordSupabase(data.newPassword);

      toast.success(t.settings.toast_password_success);
    } catch (err) {
      const errorMessage = String(err) || t.settings.toast_password_generic_error;
      toast.error(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <form className={cn('space-y-4', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Field
        id="currentPassword"
        label={t.settings.label_current_password}
        type="password"
        placeholder="••••••••"
        {...register('currentPassword')}
        disabled={isLoading}
        error={errors.currentPassword?.message}
      />

      <Field
        id="newPassword"
        label={t.settings.label_new_password}
        type="password"
        placeholder="••••••••"
        {...register('newPassword')}
        disabled={isLoading}
        error={errors.newPassword?.message}
      />

      <Field
        id="confirmPassword"
        label={t.settings.label_current_password}
        type="password"
        placeholder="••••••••"
        {...register('confirmPassword')}
        disabled={isLoading}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? t.general.loading : t.settings.button_save_password}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
