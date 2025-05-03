import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiFilePdfLine, RiFileExcelLine } from 'react-icons/ri';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

interface ReportTypeSelectorProps {
  value: 'pdf' | 'excel';
  onChange: (value: 'pdf' | 'excel') => void;
}

export const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => onChange(value as 'pdf' | 'excel')}
      className="w-full bg-[#1E2A3B] dark:bg-white border border-[#2A3A4F] rounded-lg p-1 text-white dark:text-gray-900"
    >
      <ToggleGroupItem
        value="pdf"
        className="flex-1 data-[state=on]:bg-blue-500 data-[state=on]:text-white bg-[#1E2A3B] dark:bg-white text-white dark:text-gray-900"
      >
        <RiFilePdfLine className="mr-2 h-4 w-4" />
        {t('pdf')}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="excel"
        className="flex-1 data-[state=on]:bg-green-500 data-[state=on]:text-white bg-[#1E2A3B] dark:bg-white text-white dark:text-gray-900"
      >
        <RiFileExcelLine className="mr-2 h-4 w-4" />
        {t('excel')}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}; 