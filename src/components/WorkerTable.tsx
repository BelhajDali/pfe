import React from 'react';
import { useTranslation } from 'react-i18next';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { RiFilePdfLine, RiFileExcelLine } from 'react-icons/ri';

interface Worker {
  name: string;
  task: string;
  status: string;
  progress: number;
}

const workers: Worker[] = [
  { name: 'John Doe', task: 'Assembly Line 1', status: 'In Progress', progress: 75 },
  { name: 'Jane Smith', task: 'Quality Check', status: 'Completed', progress: 100 },
  { name: 'Alice Johnson', task: 'Packaging', status: 'In Progress', progress: 50 },
  { name: 'Bob Brown', task: 'Maintenance', status: 'Pending', progress: 0 },
];

const WorkerTable = () => {
  const { t } = useTranslation();

  const handleExportPDF = () => {
    const headers = [t('name'), t('current'), t('status'), t('progress')];
    const data = workers.map(worker => [
      worker.name,
      t(`task.${worker.task}`),
      t(`statuses.${worker.status}`),
      `${worker.progress}%`
    ]);

    exportToPDF({
      title: t('workerTable'),
      headers,
      data
    });
  };

  const handleExportExcel = () => {
    const headers = [t('name'), t('current'), t('status'), t('progress')];
    const data = workers.map(worker => [
      worker.name,
      t(`task.${worker.task}`),
      t(`statuses.${worker.status}`),
      `${worker.progress}%`
    ]);

    exportToExcel({
      title: t('workerTable'),
      headers,
      data
    });
  };

  return (
    <div className="bg-[#1E2A3B] dark:bg-gray-100 rounded-lg p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white dark:text-[#151C2C]">{t('workerTable')}</h2>
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
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 dark:text-gray-500">
              <th className="pb-4">{t('name')}</th>
              <th className="pb-4">{t('current')}</th>
              <th className="pb-4">{t('status')}</th>
              <th className="pb-4">{t('progress')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A3A4F] dark:divide-gray-300">
            {workers.map((worker, index) => (
              <tr key={index} className="text-white dark:text-[#151C2C]">
                <td className="py-3">{worker.name}</td>
                <td className="py-3">{t(`task.${worker.task}`)}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    worker.status === 'Completed' ? 'bg-green-500 text-white' :
                    worker.status === 'In Progress' ? 'bg-blue-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {t(`statuses.${worker.status}`)}
                  </span>
                </td>
                <td className="py-3">
                  <div className="w-full bg-[#2A3A4F] dark:bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${worker.progress}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerTable; 