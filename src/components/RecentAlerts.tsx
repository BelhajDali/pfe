import React from 'react';
import { RiAlertLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const alerts = [
  { message: 'Defect detected on line 3', time: '2h ago', type: 'error' },
  { message: 'Help request from operator', time: '3h ago', type: 'info' },
];

const RecentAlerts = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#202940] dark:bg-gray-100 rounded-2xl p-6 shadow-lg transition-colors">
      <h2 className="text-lg font-semibold mb-4 text-white dark:text-[#151C2C]">{t('dashboard.recentAlerts')}</h2>
      <ul className="space-y-4">
        {alerts.map((alert, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <RiAlertLine className={`w-5 h-5 ${alert.type === 'error' ? 'text-red-500' : 'text-blue-500'}`} />
            <div>
              <div className="font-medium text-white dark:text-[#151C2C]">{t(`dashboard.alerts.${alert.message}`) || alert.message}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{alert.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAlerts; 