import React from 'react';

// Ce composant est un placeholder minimal pour Calendar
// À remplacer par une vraie implémentation ou une librairie de calendrier selon les besoins

export interface CalendarProps {
  initialFocus?: boolean;
  mode?: string;
  defaultMonth?: Date;
  selected?: [Date, Date] | null;
  onSelect?: (value: [Date, Date] | null) => void;
  numberOfMonths?: number;
  locale?: any;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="text-center text-gray-400 py-8">Calendar component placeholder</div>
    </div>
  );
}; 