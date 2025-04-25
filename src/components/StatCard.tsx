import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  bgColor?: string;
}

const StatCard = ({ icon, value, label, bgColor = 'bg-blue-600' }: StatCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 text-white flex flex-col gap-2`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <div className="text-white/80">{label}</div>
    </div>
  );
};

export default StatCard; 