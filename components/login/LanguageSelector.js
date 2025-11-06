'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', shortCode: 'US' },
  { code: 'es', name: 'Español', flag: '🇪🇸', shortCode: 'ES' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', shortCode: 'FR' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', shortCode: 'PT' },
];

const LanguageSelector = () => {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-[150px] border-gray-200 text-orange-500 hover:bg-orange-50 focus:ring-gray-200">
        <Globe className="w-4 h-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-[200px]">
        {languages.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="cursor-pointer my-1 rounded-md hover:bg-orange-50 focus:bg-orange-50 data-[state=checked]:bg-orange-50 data-[state=checked]:text-orange-600"
          >
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  {language.shortCode}
                </span>
                <span className="text-sm font-medium">{language.name}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
