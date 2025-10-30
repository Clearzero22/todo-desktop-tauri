export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function isOverdue(dueDate: string | Date): boolean {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const now = new Date();
  return due < now;
}

export function getDaysUntilDue(dueDate: string | Date): number {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getRelativeDueDate(dueDate: string | Date): string {
  const daysUntil = getDaysUntilDue(dueDate);
  
  if (daysUntil < 0) {
    return `${Math.abs(daysUntil)} days overdue`;
  } else if (daysUntil === 0) {
    return 'Due today';
  } else if (daysUntil === 1) {
    return 'Due tomorrow';
  } else if (daysUntil <= 7) {
    return `Due in ${daysUntil} days`;
  } else {
    return `Due ${formatDate(dueDate)}`;
  }
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function getStartOfDay(date?: Date): Date {
  const d = date || new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getEndOfDay(date?: Date): Date {
  const d = date || new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}