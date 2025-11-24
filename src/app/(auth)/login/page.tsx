'use client';

import { LoginForm } from '@/components/forms/LoginForm';
import Card from '@/components/Card';
import { useLanguage } from '@/contexts/Language';

const LoginPage = () => {
  const { t } = useLanguage();
  return (
    <Card title={t.auth.accessTitle} description={t.auth.description}>
      <LoginForm />
    </Card>
  );
};

export default LoginPage;
