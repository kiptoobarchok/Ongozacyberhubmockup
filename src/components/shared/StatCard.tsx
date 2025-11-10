import { Card, CardContent } from '../ui/card';
import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  gradient: string;
  description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, gradient, description }: StatCardProps) {
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : trend?.direction === 'down' ? TrendingDown : Minus;
  const trendColor = trend?.direction === 'up' ? 'text-green-400' : trend?.direction === 'down' ? 'text-red-400' : 'text-slate-400';

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-slate-400 text-sm mb-1">{title}</p>
          <p className="text-3xl text-white">{value}</p>
          {description && (
            <p className="text-xs text-slate-500 mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
