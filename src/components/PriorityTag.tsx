export interface PriorityTagProps {
  priority: 'low' | 'medium' | 'high';
}

export function PriorityTag({ priority }: PriorityTagProps) {
  const getPriorityClass = () => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <span className={`priority-tag ${getPriorityClass()}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}