import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

interface AIInsightCardProps {
  title: string;
  insight: string;
  confidence?: number;
  type?: 'recommendation' | 'prediction' | 'analysis';
  className?: string;
}

export function AIInsightCard({ title, insight, confidence, type = 'recommendation', className = '' }: AIInsightCardProps) {
  const icons = {
    recommendation: Sparkles,
    prediction: TrendingUp,
    analysis: Zap,
  };

  const Icon = icons[type];

  return (
    <Card className={`bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 backdrop-blur-sm relative overflow-hidden ${className}`}>
      {/* AI Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
      
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-white flex items-center gap-2">
            {title}
            <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
              AI-Powered
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-slate-300 mb-3">{insight}</p>
        {confidence !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Confidence</span>
              <span className="text-purple-400">{confidence}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
