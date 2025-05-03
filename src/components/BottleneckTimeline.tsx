import React from 'react';
import { useTranslation } from 'react-i18next';

export const BottleneckTimeline = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[300px] flex items-center justify-center">
      <h3 className="text-lg font-semibold mb-4">{t('bottleneckTimeline')}</h3>
      <span className="text-gray-400">(Bottleneck timeline chart à venir)</span>
    </div>
  );
}; 