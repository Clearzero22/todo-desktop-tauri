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
    <Card className={`gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${completed ? 'opacity-60' : ''}`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="mt-1 w-5 h-5 border-emerald-300 text-emerald-600 focus:ring-emerald-500"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-lg mb-3 transition-all ${
              completed ? 'line-through text-muted-foreground' : 'text-gray-800'
            }`}>
              {title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <PriorityTag priority={priority} />
              
              {dueDate && (
                <div className="flex items-center gap-1.5 text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{dueDate}</span>
                </div>
              )}
              
              {category && (
                <div className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200"
                  >
                    {category}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              className="h-9 w-9 p-0 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              className="h-9 w-9 p-0 text-destructive hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}