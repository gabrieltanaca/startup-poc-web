'use client';

import { KeyRound } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useLanguage } from '@/contexts/Language';
import GeneralConfigs from './GeneralConfig';
import ChangePasswordForm from '@/components/forms/ChangePasswordForm';

const SettingsPage = () => {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t.settings.page_title || 'Configurações'}
        </h2>
      </div>

      <Separator />

      <Card className="max-w-3xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <KeyRound className="text-primary h-5 w-5" />
            <CardTitle>{t.settings.password_section_title}</CardTitle>
          </div>
          <CardDescription>{t.settings.password_section_desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>

      <GeneralConfigs translation={t} lang={lang} setLang={setLang} />
    </div>
  );
};

export default SettingsPage;
