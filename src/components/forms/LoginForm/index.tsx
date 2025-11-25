'use client';

import { Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '../../ui/button';
import { HTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import { Field } from '../Field';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/Language';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSession } from '@/lib/session';

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(8, { message: 'Senha deve ter ao menos 8 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = ({ className, ...props }: HTMLAttributes<HTMLFormElement>) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useLanguage();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const { data: auth, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(`Falha na Autenticação. Erro: Credenciais Inválidas`);
      } else {
        toast.success('Login bem-sucedido! Sincronizando sessão...');
        await createSession(auth.user.id);
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error(`Ocorreu um erro. Verifique a conexão. Erro: ${err}`);
    }

    setIsLoading(false);
  };

  return (
    <form className={cn('space-y-4', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Field
        id="email"
        label={t.auth.emailLabel}
        type="email"
        placeholder={t.auth.placeholderEmail}
        {...register('email')}
        icon={Mail}
        disabled={isLoading}
      />
      {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}

      <Field
        id="password"
        label={t.auth.passwordLabel}
        type="password"
        placeholder="••••••••"
        {...register('password')}
        icon={Lock}
        disabled={isLoading}
      />
      {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}

      <div className="space-y-2">
        <div className="text-right">
          <a href="#" className="text-primary text-sm hover:underline">
            {t.auth.forgotPassword}
          </a>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.auth.btnEntering}
          </>
        ) : (
          `${t.auth.btnEnter}`
        )}
      </Button>
    </form>
  );
};
