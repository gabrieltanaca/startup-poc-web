import { LucideIcon, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  trend: string;
  icon: any;
};

const MetricCard = ({ title, value, change, trend, icon: Icon }: MetricCardProps) => {
  const isUp = trend === 'up';
  const changeColor = isUp ? 'text-green-500' : 'text-red-500';
  const bgColor = isUp ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wider text-gray-500 uppercase">{title}</h3>
        <div className={`rounded-full p-2 ${bgColor}`}>
          <Icon className={`h-5 w-5 ${isUp ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
      <p className="mt-4 text-3xl font-extrabold text-gray-900">{value}</p>
      <div className="mt-2 flex items-center text-sm">
        <span className={`font-semibold ${changeColor}`}>{change}</span>
        <span className="ml-1 text-gray-500">vs. mês passado</span>
      </div>
    </div>
  );
};

export default MetricCard;
