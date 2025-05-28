
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-500',
  children,
  className,
  loading = false
}) => {
  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      
      {loading ? (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
