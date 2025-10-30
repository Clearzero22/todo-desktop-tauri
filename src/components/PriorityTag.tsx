import { Badge } from '@/components/ui/badge';

export interface PriorityTagProps {
  priority: 'low' | 'medium' | 'high';
}

export function PriorityTag({ priority }: PriorityTagProps) {
  const getVariant = () => {
    switch (priority) {
      case 'high':
        return 'destructive' as const;
      case 'medium':
        return 'default' as const;
      case 'low':
        return 'secondary' as const;
      default:
        return 'default' as const;
    }
  };

  const getIcon = () => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <Badge 
      variant={getVariant()} 
      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 shadow-sm ${
        priority === 'high' 
          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
          : priority === 'medium'
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
          : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
      }`}
    >
      <span className="mr-1">{getIcon()}</span>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}