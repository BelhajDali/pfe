import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'John D.', delays: 2 },
  { name: 'Jane S.', delays: 1 },
  { name: 'Alice J.', delays: 3 },
  { name: 'Bob B.', delays: 0 },
  { name: 'Mike R.', delays: 2 },
  { name: 'Sarah L.', delays: 1 },
];

export const DelaysChart = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[300px]">
      <h3 className="text-lg font-semibold mb-4">{t('delaysChart')}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4F" />
          <XAxis
            dataKey="name"
            stroke="#6B7280"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#6B7280"
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E2A3B',
              border: '1px solid #2A3A4F',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Bar
            dataKey="delays"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 