import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateRangePicker } from '../components/DateRangePicker';
import { WorkstationDropdown } from '../components/WorkstationDropdown';
import { ReportTypeSelector } from '../components/ReportTypeSelector';
import { YieldChart } from '../components/YieldChart';
import { DelaysChart } from '../components/DelaysChart';
import { HelpDistributionChart } from '../components/HelpDistributionChart';
import { BottleneckTimeline } from '../components/BottleneckTimeline';
import { SummaryTable } from '../components/SummaryTable';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { RiFilePdfLine, RiFileExcelLine, RiRefreshLine, RiBarChart2Line, RiPieChart2Line, RiTimeLine, RiAwardLine, RiSunLine, RiMoonLine, RiCalendar2Line } from 'react-icons/ri';
import { useTheme } from '../components/ThemeProvider';

const Reports = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [selectedWorkstation, setSelectedWorkstation] = useState<string>('');
  const [reportType, setReportType] = useState<'pdf' | 'excel'>('pdf');
  const { theme, setTheme } = useTheme();
  const [lastUpdated] = useState(() => new Date());

  const handleExport = () => {
    if (reportType === 'pdf') {
      exportToPDF({
        title: 'Reports',
        headers: [
          t('date'),
          t('operator'),
          t('yield'),
          t('delays'),
          t('help'),
          t('anomalies')
        ],
        data: []
      });
    } else {
      exportToExcel({
        title: 'Reports',
        headers: [
          t('date'),
          t('operator'),
          t('yield'),
          t('delays'),
          t('help'),
          t('anomalies')
        ],
        data: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#151C2C] via-[#1E2A3B] to-[#202940] dark:from-white dark:via-gray-100 dark:to-gray-200 text-white dark:text-gray-900 font-sans transition-colors duration-300">
      <div className="px-4 md:px-8 py-4 md:py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <RiBarChart2Line className="text-blue-400 dark:text-blue-500 w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white dark:text-gray-900">Reports</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span className="text-xs text-gray-400 dark:text-gray-500 mb-1 md:mb-0">
              <RiCalendar2Line className="inline mr-1" /> Last updated: {lastUpdated.toLocaleString()}
            </span>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow transition-colors border border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {reportType === 'pdf' ? (
                <>
                  <RiFilePdfLine size={20} />
                  {t('exportPDF')}
                </>
              ) : (
                <>
                  <RiFileExcelLine size={20} />
                  {t('exportExcel')}
                </>
              )}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#202940] dark:bg-gray-100 hover:bg-[#232C47] dark:hover:bg-gray-200 text-white dark:text-gray-900 border border-[#232C47] dark:border-gray-200 shadow transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <RiRefreshLine size={20} />
              {t('refresh')}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center p-2 rounded-lg bg-[#202940] dark:bg-gray-100 hover:bg-[#232C47] dark:hover:bg-gray-200 text-white dark:text-gray-900 border border-[#232C47] dark:border-gray-200 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
            </button>
          </div>
        </div>
        <div className="border-b border-[#232C47] dark:border-gray-200 mb-8" />

        {/* Filters Card */}
        <div className="bg-[#1E2A3B]/80 dark:bg-white/80 shadow-xl rounded-3xl p-6 md:p-8 mb-8 border border-[#232C47] dark:border-[#e5e7eb] transition-transform hover:scale-[1.01] flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-white dark:text-gray-700 mb-1">
                <RiCalendar2Line className="w-4 h-4 text-blue-300 dark:text-blue-600" />
                {t('selectDateRangeLabel') || 'Date range'}
              </label>
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-white dark:text-gray-700 mb-1">
                <RiBarChart2Line className="w-4 h-4 text-green-300 dark:text-green-600" />
                {t('selectWorkstationLabel') || 'Workstation'}
              </label>
              <WorkstationDropdown value={selectedWorkstation} onChange={setSelectedWorkstation} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-white dark:text-gray-700 mb-1">
                <RiFilePdfLine className="w-4 h-4 text-purple-300 dark:text-purple-600" />
                {t('selectReportTypeLabel') || 'Export type'}
              </label>
              <ReportTypeSelector value={reportType} onChange={setReportType} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-2">
            <div className="bg-gradient-to-br from-[#1E2A3B] via-[#232C47] to-[#202940] dark:from-white dark:via-gray-100 dark:to-gray-200 rounded-2xl p-6 shadow-lg border border-[#232C47] dark:border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl group">
              <div className="flex items-center gap-2 mb-2">
                <RiBarChart2Line className="text-blue-400 dark:text-blue-500 w-5 h-5" />
                <span className="text-base font-semibold text-white dark:text-gray-900 group-hover:text-blue-400 dark:group-hover:text-blue-500 transition-colors">{t('yieldChart')}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 mb-2">{t('yieldChartSubtitle') || 'Production yield over the selected period.'}</span>
              <YieldChart />
            </div>
            <div className="bg-gradient-to-br from-[#1E2A3B] via-[#232C47] to-[#202940] dark:from-white dark:via-gray-100 dark:to-gray-200 rounded-2xl p-6 shadow-lg border border-[#232C47] dark:border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl group">
              <div className="flex items-center gap-2 mb-2">
                <RiTimeLine className="text-orange-400 dark:text-orange-500 w-5 h-5" />
                <span className="text-base font-semibold text-white dark:text-gray-900 group-hover:text-orange-400 dark:group-hover:text-orange-500 transition-colors">{t('delaysChart')}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 mb-2">{t('delaysChartSubtitle') || 'Delays by operator.'}</span>
              <DelaysChart />
            </div>
            <div className="bg-gradient-to-br from-[#1E2A3B] via-[#232C47] to-[#202940] dark:from-white dark:via-gray-100 dark:to-gray-200 rounded-2xl p-6 shadow-lg border border-[#232C47] dark:border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl group">
              <div className="flex items-center gap-2 mb-2">
                <RiPieChart2Line className="text-green-400 dark:text-green-500 w-5 h-5" />
                <span className="text-base font-semibold text-white dark:text-gray-900 group-hover:text-green-400 dark:group-hover:text-green-500 transition-colors">{t('helpDistributionChart')}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 mb-2">{t('helpDistributionSubtitle') || 'Distribution of help given and received.'}</span>
              <HelpDistributionChart />
            </div>
            <div className="bg-gradient-to-br from-[#1E2A3B] via-[#232C47] to-[#202940] dark:from-white dark:via-gray-100 dark:to-gray-200 rounded-2xl p-6 shadow-lg border border-[#232C47] dark:border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl group">
              <div className="flex items-center gap-2 mb-2">
                <RiAwardLine className="text-purple-400 dark:text-purple-500 w-5 h-5" />
                <span className="text-base font-semibold text-white dark:text-gray-900 group-hover:text-purple-400 dark:group-hover:text-purple-500 transition-colors">{t('bottleneckTimeline')}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 mb-2">{t('bottleneckTimelineSubtitle') || 'Bottleneck events over time.'}</span>
              <BottleneckTimeline />
            </div>
          </div>

          <div className="border-b border-[#232C47] dark:border-gray-200" />

          {/* Summary Table */}
          <div className="bg-gradient-to-br from-[#1E2A3B] via-[#232C47] to-[#202940] dark:from-white dark:via-gray-100 dark:to-gray-200 rounded-2xl p-6 shadow-lg border border-[#232C47] dark:border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl group">
            <div className="flex items-center gap-2 mb-2">
              <RiBarChart2Line className="text-blue-400 dark:text-blue-500 w-5 h-5" />
              <span className="text-base font-semibold text-white dark:text-gray-900 group-hover:text-blue-400 dark:group-hover:text-blue-500 transition-colors">{t('summary')}</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 mb-2">{t('summarySubtitle') || 'Key production metrics summary.'}</span>
            <SummaryTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 