import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface WorkstationDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const WorkstationDropdown: React.FC<WorkstationDropdownProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const workstations = [
    { id: 'assembly1', name: t('workstations.assembly1') },
    { id: 'assembly2', name: t('workstations.assembly2') },
    { id: 'packaging', name: t('workstations.packaging') },
    { id: 'quality', name: t('workstations.quality') },
    { id: 'maintenance', name: t('workstations.maintenance') },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-[#1E2A3B] dark:bg-white border-[#2A3A4F] text-white dark:text-gray-900">
        <SelectValue placeholder={t('selectWorkstation')} />
      </SelectTrigger>
      <SelectContent className="bg-[#1E2A3B] dark:bg-white text-white dark:text-gray-900 border-[#2A3A4F]">
        {workstations.map((workstation) => (
          <SelectItem
            key={workstation.id}
            value={workstation.id}
            className="hover:bg-[#2A3A4F] dark:hover:bg-gray-100 focus:bg-[#2A3A4F] dark:focus:bg-gray-100"
          >
            {workstation.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}; 