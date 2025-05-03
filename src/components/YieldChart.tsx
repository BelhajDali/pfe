import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Lun', yield: 95 },
  { name: 'Mar', yield: 92 },
  { name: 'Mer', yield: 88 },
  { name: 'Jeu', yield: 94 },
  { name: 'Ven', yield: 96 },
  { name: 'Sam', yield: 90 },
  { name: 'Dim', yield: 85 },
];

export const YieldChart = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[300px]">
      <h3 className="text-lg font-semibold mb-4">{t('yieldChart')}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E2A3B',
              border: '1px solid #2A3A4F',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="yield"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 