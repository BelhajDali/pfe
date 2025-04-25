import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface ProductionData {
  date: string;
  value: number;
}

const dummyData: ProductionData[] = [
  { date: '2024-01', value: 65 },
  { date: '2024-02', value: 78 },
  { date: '2024-03', value: 72 },
  { date: '2024-04', value: 85 },
  { date: '2024-05', value: 92 },
  { date: '2024-06', value: 88 }
];

export const ProductionChart = () => {
  const { t } = useTranslation();
  const maxValue = Math.max(...dummyData.map(d => d.value));

  return (
    <div className="col-span-2 rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{t('production.title')}</h3>
          <p className="text-sm text-muted-foreground">{t('production.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">{t('production.current')}</span>
          </div>
          <select className="rounded-md border bg-background px-2 py-1 text-sm">
            <option value="6">{t('production.last6Months')}</option>
            <option value="12">{t('production.lastYear')}</option>
          </select>
        </div>
      </div>

      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <div className="flex h-full items-end space-x-2">
            {dummyData.map((data, index) => (
              <div key={data.date} className="relative flex-1">
                <div
                  className="relative h-full w-full"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                >
                  <div className="absolute bottom-0 w-full">
                    <div className="mx-auto w-full max-w-[30px] rounded-t-sm bg-primary transition-all hover:bg-primary/90" style={{ height: `${(data.value / maxValue) * 300}px` }} />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {data.date.split('-')[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 