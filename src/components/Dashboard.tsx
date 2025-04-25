import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { RiBarChartBoxLine, RiErrorWarningLine, RiLineChartLine } from 'react-icons/ri'
import { MdWarning } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const data = [
  { name: '1', prevue: 4000, reelle: 2400 },
  { name: '2', prevue: 3000, reelle: 1398 },
  { name: '3', prevue: 2000, reelle: 9800 },
  { name: '4', prevue: 2780, reelle: 3908 },
  { name: '5', prevue: 1890, reelle: 4800 },
  { name: '6', prevue: 2390, reelle: 3800 },
  { name: '7', prevue: 3490, reelle: 4300 },
]

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) => {
  const { t } = useTranslation()
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <p className="text-orange-500 text-sm">{t('dashboard.realTime')}</p>
      <div className="flex justify-between items-start mt-2">
        <div>
          <h3 className="text-4xl font-semibold dark:text-white">{value}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{title}</p>
        </div>
        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <Icon className="w-6 h-6 text-orange-500" />
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">{t('dashboard.title')}</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title={t('dashboard.stats.production')}
          value="12,540"
          icon={RiBarChartBoxLine}
        />
        <StatCard
          title={t('dashboard.stats.errors')}
          value="23"
          icon={RiErrorWarningLine}
        />
        <StatCard
          title={t('dashboard.stats.yield')}
          value="72%"
          icon={RiLineChartLine}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6 dark:text-white">
            {t('dashboard.productionOverTime')}
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7280"
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 10000]}
                  ticks={[0, 2500, 5000, 7500, 10000]}
                />
                <Line
                  type="monotone"
                  dataKey="prevue"
                  stroke="#3B82F6"
                  dot={{ fill: "#3B82F6" }}
                  name={t('dashboard.predicted')}
                />
                <Line
                  type="monotone"
                  dataKey="reelle"
                  stroke="#F97316"
                  dot={{ fill: "#F97316" }}
                  name={t('dashboard.actual')}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6 dark:text-white">
            {t('dashboard.aiCamera')}
          </h2>
          <div className="relative aspect-video bg-[#0F172A] rounded-lg overflow-hidden mb-4 border-2 border-dashed border-orange-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {t('dashboard.detectionResults')}
            </h3>
            <div className="flex items-center gap-2 text-red-500">
              <MdWarning className="w-5 h-5" />
              <span>{t('dashboard.badlyPositioned')}</span>
            </div>
            <button className="w-full py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              {t('dashboard.analyzeAgain')}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          {t('dashboard.recentAlerts')}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div>
              <p className="text-gray-900 dark:text-white font-medium">
                {t('dashboard.defectDetected')}
              </p>
              <p className="text-sm text-gray-500">{t('dashboard.timeAgo')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 