import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const data = [
  { name: '1', value: 2500 },
  { name: '2', value: 1500 },
  { name: '3', value: 10000 },
  { name: '4', value: 5000 },
  { name: '5', value: 5000 },
  { name: '6', value: 4000 },
  { name: '7', value: 5000 },
];

const ProductionHistoryChart = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#202940] dark:bg-gray-100 rounded-2xl p-6 shadow-lg transition-colors">
      <h2 className="text-lg font-semibold mb-4 text-white dark:text-[#151C2C]">{t('productionHistory')}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#6B7280" tickLine={false} />
            <YAxis stroke="#6B7280" tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3B82F6" dot={{ fill: '#3B82F6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductionHistoryChart; 