import React from 'react';
import { useTranslation } from 'react-i18next';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { RiFilePdfLine, RiFileExcelLine } from 'react-icons/ri';

interface StatsData {
  dailyProduction: string;
  downtime: string;
  efficiency: string;
  activeOperators: string;
}

const statsData: StatsData = {
  dailyProduction: '1,325',
  downtime: '12 h',
  efficiency: '96 %',
  activeOperators: '8'
};

const StatsExport = () => {
  const { t } = useTranslation();

  const handleExportPDF = () => {
    const headers = [t('dashboard.statistic'), t('dashboard.value')];
    const data = [
      [t('dashboard.dailyProduction'), statsData.dailyProduction],
      [t('dashboard.downtime'), statsData.downtime],
      [t('dashboard.efficiency'), statsData.efficiency],
      [t('dashboard.activeOperators'), statsData.activeOperators]
    ];

    exportToPDF({
      title: t('dashboard.statistics'),
      headers,
      data
    });
  };

  const handleExportExcel = () => {
    const headers = [t('dashboard.statistic'), t('dashboard.value')];
    const data = [
      [t('dashboard.dailyProduction'), statsData.dailyProduction],
      [t('dashboard.downtime'), statsData.downtime],
      [t('dashboard.efficiency'), statsData.efficiency],
      [t('dashboard.activeOperators'), statsData.activeOperators]
    ];

    exportToExcel({
      title: t('dashboard.statistics'),
      headers,
      data
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <RiFilePdfLine size={20} />
        PDF
      </button>
      <button
        onClick={handleExportExcel}
        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <RiFileExcelLine size={20} />
        Excel
      </button>
    </div>
  );
};

export default StatsExport; 