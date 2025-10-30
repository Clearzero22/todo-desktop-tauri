export interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TaskItem({ 
  id, 
  title, 
  completed, 
  priority, 
  dueDate, 
  category,
  onToggle,
  onDelete,
  onEdit 
}: TaskItemProps) {
  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className="task-title">{title}</span>
      {dueDate && <span className="due-date">{dueDate}</span>}
      {category && <span className="category">{category}</span>}
      <button onClick={() => onEdit(id)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}