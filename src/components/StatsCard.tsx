import { Card } from "./ui/card";
import { LucideIcon } from "lucide-react@0.487.0";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-600 mb-1">{title}</p>
          <p className="text-slate-900 mb-2">{value}</p>
          {trend && (
            <p className={`${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50">
          <Icon className="w-6 h-6" style={{ color: '#2563eb' }} />
        </div>
      </div>
    </Card>
  );
}
