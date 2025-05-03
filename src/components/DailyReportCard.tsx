import React from 'react';
import { useTranslation } from 'react-i18next';

const report = {
  date: 'April 25, 2024',
  timeSpent: '4h 10m',
  helpRequests: 2,
  completionRate: '90%'
};

const DailyReportCard = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#202940] dark:bg-gray-100 rounded-2xl p-6 shadow-lg transition-colors">
      <h2 className="text-lg font-semibold mb-4 text-white dark:text-[#151C2C]">{t('dailyReport')}</h2>
      <div className="text-sm text-white dark:text-[#151C2C] space-y-2">
        <div className="flex justify-between"><span>{t('date')}</span><span>{report.date}</span></div>
        <div className="flex justify-between"><span>{t('timeSpent')}</span><span>{report.timeSpent}</span></div>
        <div className="flex justify-between"><span>{t('helpRequests')}</span><span>{report.helpRequests}</span></div>
        <div className="flex justify-between"><span>{t('completionRate')}</span><span>{report.completionRate}</span></div>
      </div>
    </div>
  );
};

export default DailyReportCard; 