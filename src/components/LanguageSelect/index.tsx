'use client';

import { useLanguage } from '@/contexts/Language';
import { Dropdown } from '../Dropdown';
import { Language } from '@/lib/translations';
import { Label } from '../ui/label';
import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';

type LanguageSelectProps = {
  compact?: boolean;
};

export default function LanguageSelect({ compact = false }: LanguageSelectProps) {
  const { t, lang, setLang, langOptions } = useLanguage();
  const selectedOption = langOptions.find((x) => x.value === lang);

  return (
    <div className="flex items-center gap-2">
      {!compact && <Label>{t.lang.label}</Label>}
      <Dropdown
        options={langOptions}
        onSelect={({ value }) => setLang(value as Language)}
        value={selectedOption}
        compact={compact}
        compactIcon={<Languages />}
      />
    </div>
  );
}
