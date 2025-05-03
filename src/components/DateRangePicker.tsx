import React from 'react';
import { useTranslation } from 'react-i18next';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { CalendarIcon } from 'lucide-react';

interface DateRangePickerProps {
  value: [Date, Date] | null;
  onChange: (value: [Date, Date] | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? fr : enUS;

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-[#1E2A3B] dark:bg-white border-[#2A3A4F] text-white dark:text-gray-900 hover:bg-[#2A3A4F] dark:hover:bg-gray-100"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              <>
                {format(value[0], 'PPP', { locale })} - {format(value[1], 'PPP', { locale })}
              </>
            ) : (
              <span>{t('selectDateRange')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-[#1E2A3B] dark:bg-white text-white dark:text-gray-900" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.[0]}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={locale}
            className="bg-[#1E2A3B] dark:bg-white text-white dark:text-gray-900"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}; 