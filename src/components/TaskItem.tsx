import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Edit, Trash2 } from 'lucide-react';
import { PriorityTag } from './PriorityTag';

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
    <Card className={`transition-all hover:shadow-md border-gray-200 ${completed ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-base mb-2 ${
              completed ? 'line-through text-muted-foreground' : ''
            }`}>
              {title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <PriorityTag priority={priority} />
              
              {dueDate && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{dueDate}</span>
                </div>
              )}
              
              {category && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Tag className="h-3 w-3" />
                  <Badge variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}