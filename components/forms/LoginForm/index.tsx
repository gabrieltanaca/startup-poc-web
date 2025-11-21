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

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter ao menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = ({ className, ...props }: HTMLAttributes<HTMLFormElement>) => {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [busy, setBusy] = useState(false);
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
    setBusy(true);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: 'Falha na Autenticação',
          description: error.message || 'Credenciais inválidas',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Login bem-sucedido!',
          description: 'Redirecionando...',
        });
        router.push('/');
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao tentar logar.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
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
        disabled={isLoading || busy}
      />
      {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}

      <Field
        id="password"
        label={t.auth.passwordLabel}
        type="password"
        placeholder="••••••••"
        {...register('password')}
        icon={Lock}
        disabled={isLoading || busy}
      />
      {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}

      <div className="space-y-2">
        <div className="text-right">
          <a href="#" className="text-primary text-sm hover:underline">
            {t.auth.forgotPassword}
          </a>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || busy}>
        {isLoading || busy ? (
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
