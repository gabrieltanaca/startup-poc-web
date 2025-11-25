import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/Select';
import { TranslateType } from '@/lib/translations/pt';
import { Bell, ChevronDown, Settings, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Theme, useTheme } from '@/contexts/Theme';
import { useState } from 'react';
import { Language } from '@/lib/translations';

type GeneralConfigsProps = {
  translation: TranslateType;
  lang: Language;
  setLang: (value: Language) => void;
};

const GeneralConfigs = ({ translation: t, lang, setLang }: GeneralConfigsProps) => {
  const { theme, setTheme } = useTheme();

  const [notifications, setNotifications] = useState(false);

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <div className="flex items-center">
          <Settings className="text-primary h-5 w-5" />
          <CardTitle>{t.settings.general_section_title}</CardTitle>
        </div>
        <CardDescription>{t.settings.general_section_desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Opção de Tema */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <Label className="flex items-center">
              <Sun className="h-4 w-4" />
              <span>{t.settings.theme_label || 'Tema da Interface'}</span>
            </Label>
            <p className="text-muted-foreground text-sm">{t.settings.theme_desc}</p>
          </div>
          <Select
            placeholder={t.settings.theme_placeholder}
            value={theme}
            onValueChange={(v) => setTheme(v as Theme)}
            options={[
              {
                label: t.settings.theme_light,
                value: 'light',
              },
              {
                label: t.settings.theme_dark,
                value: 'dark',
              },
            ]}
          />
        </div>

        {/* Opção de Idioma */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <Label className="flex items-center space-x-2">
              <ChevronDown className="h-4 w-4" />
              <span>{t.settings.language_label}</span>
            </Label>
            <p className="text-muted-foreground text-sm">{t.settings.language_desc}</p>
          </div>
          <Select
            placeholder={t.settings.language_placeholder}
            value={lang}
            onValueChange={(v) => setLang(v as 'pt' | 'en')}
            options={[
              {
                label: 'Português (BR)',
                value: 'pt',
              },
              {
                label: 'English (US)',
                value: 'en',
              },
            ]}
          />
        </div>

        {/* Opção de Notificações */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>{t.settings.notifications_label || 'Notificações por Email'}</span>
            </Label>
            <p className="text-muted-foreground text-sm">
              {t.settings.notifications_desc || 'Receba atualizações importantes e alertas.'}
            </p>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            aria-label={t.settings.notifications_label}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralConfigs;
