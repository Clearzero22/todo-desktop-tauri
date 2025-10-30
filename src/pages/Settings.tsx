import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Bell, Clock, Plus, Trash2, Palette } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export function Settings() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Work', color: '#ff6b6b' },
    { id: '2', name: 'Personal', color: '#4ecdc4' },
    { id: '3', name: 'Shopping', color: '#45b7d1' },
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#ff6b6b');

  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      color: newCategoryColor,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryColor('#ff6b6b');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-6 w-6" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-600 mt-2">
            Customize your task management experience
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {categories.map(category => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="outline">{category.color}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Add New Category</h4>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders for your tasks
              </p>
            </div>
            <Button
              variant={notifications ? "default" : "outline"}
              size="sm"
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? "Enabled" : "Disabled"}
            </Button>
          </div>

          {notifications && (
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-0.5">
                <Label htmlFor="reminder-time" className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Default reminder time
                </Label>
                <p className="text-sm text-muted-foreground">
                  Set default time for task reminders
                </p>
              </div>
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-32"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}