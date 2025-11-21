import { LoginForm } from '@/components/forms/LoginForm';
import Card from '@/components/Card';

export default function LoginPage() {
  return (
    <Card title="Acesso ao Portal" description="Faça login para gerenciar os dados de localização.">
      <LoginForm />
    </Card>
  );
}
