import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Aide reçue', value: 15 },
  { name: 'Aide donnée', value: 8 },
];

const COLORS = ['#3B82F6', '#10B981'];

export const HelpDistributionChart = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[300px]">
      <h3 className="text-lg font-semibold mb-4">{t('helpDistributionChart')}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E2A3B',
              border: '1px solid #2A3A4F',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}; 