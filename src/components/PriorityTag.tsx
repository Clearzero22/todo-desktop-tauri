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
    <Badge variant={getVariant()} className="text-xs">
      {getIcon()} {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}