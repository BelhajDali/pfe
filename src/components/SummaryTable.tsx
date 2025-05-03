import React from 'react';
import { useTranslation } from 'react-i18next';

interface SummaryData {
  totalParts: number;
  goodParts: number;
  defectiveParts: number;
  averageCycleTime: number;
  totalDelays: number;
  totalHelpRequests: number;
}

const mockData: SummaryData = {
  totalParts: 1250,
  goodParts: 1150,
  defectiveParts: 100,
  averageCycleTime: 45.2,
  totalDelays: 12,
  totalHelpRequests: 23,
};

export const SummaryTable = () => {
  const { t } = useTranslation();

  const calculateYield = () => {
    return ((mockData.goodParts / mockData.totalParts) * 100).toFixed(1);
  };

  return (
    <div className="bg-[#1E2A3B] dark:bg-white rounded-lg shadow p-6 transition-colors">
      <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-900">{t('summary')}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#232C47] dark:divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {t('metric')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {t('value')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#232C47] dark:divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {t('totalParts')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {mockData.totalParts}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {t('goodParts')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {mockData.goodParts}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {t('defectiveParts')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {mockData.defectiveParts}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {t('yield')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {calculateYield()}%
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {t('averageCycleTime')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {mockData.averageCycleTime}s
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {t('totalDelays')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {mockData.totalDelays}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {t('totalHelpRequests')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-900">
                {mockData.totalHelpRequests}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}; 