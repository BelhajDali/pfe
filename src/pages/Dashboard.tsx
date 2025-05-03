import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiSunLine, RiMoonLine, RiBarChart2Line, RiAlertLine, RiUserSettingsLine, RiCalendar2Line } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeProvider';
import CameraGrid from '../components/CameraGrid';
import WorkerTable from '../components/WorkerTable';
import RecentAlerts from '../components/RecentAlerts';
import ProductionHistoryChart from '../components/ProductionHistoryChart';
import AdminPanel from '../components/AdminPanel';
import DailyReportCard from '../components/DailyReportCard';
import StatsExport from '../components/StatsExport';

const mainTableData = [
  { name: 'Amelia', current: 'Packing', status: 'On Time', timeLeft: '00:25' },
  { name: 'Bob', current: 'Packing', status: 'Delayed', timeLeft: '01:12' },
];

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const statCards = [
    {
      label: t('dailyProduction'),
      value: '1,325',
      icon: <RiBarChart2Line className="text-orange-500 w-7 h-7" />, // accent icon
      change: '+5.4%',
      changeColor: 'text-green-400',
    },
    {
      label: t('downtime'),
      value: '12 h',
      icon: <RiCalendar2Line className="text-slate-500 w-7 h-7" />, // accent icon
      change: '+0.8%',
      changeColor: 'text-orange-400',
    },
    {
      label: t('efficiency'),
      value: '96 %',
      icon: <RiBarChart2Line className="text-blue-500 w-7 h-7" />, // accent icon
      change: '',
      changeColor: '',
    },
    {
      label: t('activeOperators'),
      value: '8',
      icon: <RiUserSettingsLine className="text-slate-500 w-7 h-7" />, // accent icon
      change: '',
      changeColor: '',
    },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-[#151C2C] dark:bg-white text-white dark:text-gray-900 px-2 md:px-8 py-4 md:py-6 font-sans">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 md:gap-0 shadow-sm bg-[#151C2C] dark:bg-white sticky top-0 z-20 py-4 px-2 md:px-0" style={{boxShadow:'0 2px 8px 0 rgba(20,24,31,0.10)'}}>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <h1 className="text-2xl font-bold tracking-tight whitespace-nowrap text-white dark:text-gray-900">LeoLAD</h1>
          <div className="relative flex-1 max-w-lg w-full">
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder={t('search')}
              className="bg-[#202940] dark:bg-gray-100 pl-10 pr-4 py-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white dark:text-gray-900 w-full shadow-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <StatsExport />
          <button
            onClick={toggleLanguage}
            className="text-sm font-semibold px-3 py-2 rounded-lg bg-[#202940] dark:bg-gray-100 hover:bg-[#232C47] dark:hover:bg-gray-200 transition-colors text-white dark:text-gray-900"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-[#202940] dark:bg-gray-100 hover:bg-[#232C47] dark:hover:bg-gray-200 transition-colors text-white dark:text-gray-900"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
          </button>
          <div className="flex items-center gap-2 bg-[#202940] dark:bg-gray-100 px-3 py-2 rounded-xl shadow-sm ml-2">
            <FaRegUserCircle className="text-2xl text-gray-400 dark:text-gray-500" />
            <span className="text-sm font-medium text-white dark:text-gray-900">John Doe</span>
          </div>
        </div>
      </div>
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-[#202940] dark:bg-white rounded-2xl p-6 flex flex-col gap-2 shadow-lg min-h-[120px] group hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center gap-4 mb-2">
              {card.icon}
              <span className="text-base text-gray-400 dark:text-gray-500 font-medium group-hover:text-white dark:group-hover:text-gray-900 transition-colors">{card.label}</span>
            </div>
            <div className="text-3xl font-extrabold tracking-tight mb-1 text-white dark:text-gray-900 group-hover:text-blue-400 dark:group-hover:text-blue-500 transition-colors">{card.value}</div>
            {card.change && (
              <div className={`text-xs ${card.changeColor}`}>{card.change}</div>
            )}
          </div>
        ))}
      </div>
      {/* Main Content: CameraGrid + MainTable */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#202940] dark:bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <RiBarChart2Line className="text-blue-400 dark:text-blue-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-white dark:text-gray-900">{t('cameraGrid')}</h2>
            </div>
            <CameraGrid />
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#202940] dark:bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <RiBarChart2Line className="text-purple-400 dark:text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-white dark:text-gray-900">{t('mainTable')}</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 dark:text-gray-500">
                  <th className="pb-2 text-left font-semibold">{t('name')}</th>
                  <th className="pb-2 text-left font-semibold">{t('current')}</th>
                  <th className="pb-2 text-left font-semibold">{t('status')}</th>
                  <th className="pb-2 text-left font-semibold">{t('timeLeft')}</th>
                </tr>
              </thead>
              <tbody>
                {mainTableData.map((row, idx) => (
                  <tr key={idx} className={`border-t border-[#232C47] dark:border-gray-200 ${idx%2===0 ? 'bg-[#232C47]/40 dark:bg-gray-50' : ''} hover:bg-[#232C47]/80 dark:hover:bg-gray-100 transition-colors`}>
                    <td className="py-2 font-semibold text-white dark:text-gray-900">{row.name}</td>
                    <td className="py-2 text-white dark:text-gray-900">{t(`task.${row.current}`)}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'On Time' ? 'text-green-400 bg-green-400/10 dark:text-green-700 dark:bg-green-100' : 
                        row.status === 'Delayed' ? 'text-orange-400 bg-orange-400/10 dark:text-orange-700 dark:bg-orange-100' : 
                        'text-gray-400 bg-gray-700/10 dark:text-gray-700 dark:bg-gray-100'
                      }`}>{t(`statuses.${row.status}`)}</span>
                    </td>
                    <td className="py-2 text-white dark:text-gray-900">{row.timeLeft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Second Row: WorkerTable + RecentAlerts + DailyReport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#202940] dark:bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <RiUserSettingsLine className="text-green-400 dark:text-green-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-white dark:text-gray-900">{t('workerTable')}</h2>
            </div>
            <WorkerTable />
          </div>
        </div>
        <div className="lg:col-span-3">
          <RecentAlerts />
        </div>
        <div className="lg:col-span-3">
          <DailyReportCard />
        </div>
      </div>
      {/* Bottom Row: ProductionHistory, AdminPanel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6"><ProductionHistoryChart /></div>
        <div className="lg:col-span-6"><AdminPanel /></div>
      </div>
    </div>
  );
};

export default Dashboard;