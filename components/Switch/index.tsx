'use client';

import React from 'react';
import { Switch as SwitchComponent } from '../ui/switch';

type SwitchColors = {
  checked?: string;
  unChecked?: string;
};

type SwitchProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  icon?: React.ReactNode;
  className?: string;
  colors?: SwitchColors;
};

export default function Switch({ checked, onChange, icon }: SwitchProps) {
  return <SwitchComponent checked={checked} onClick={() => onChange(!checked)} icon={icon} />;
}
