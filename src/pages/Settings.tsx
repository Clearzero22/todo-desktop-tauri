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
    <div className="space-y-8 fade-in">
      <div className="flex items-center gap-3 slide-in">
        <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
          <SettingsIcon className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gradient tracking-tight mb-2">
            Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Customize your task management experience
          </p>
        </div>
      </div>

      <Card className="gradient-card border-0 shadow-xl slide-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
              <Palette className="h-5 w-5 text-purple-600" />
            </div>
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-semibold text-gray-800">{category.name}</span>
                  <Badge 
                    variant="outline" 
                    className="ml-2 bg-gray-50 border-gray-300 text-gray-600"
                  >
                    {category.color}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-destructive hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Add New Category</h4>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="h-11 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Input
                    type="color"
                    value={newCategoryColor}
                    onChange={(e) => setNewCategoryColor(e.target.value)}
                    className="w-16 h-11 p-1 cursor-pointer border-emerald-200 rounded-lg"
                  />
                </div>
                <Button 
                  onClick={handleAddCategory} 
                  disabled={!newCategoryName.trim()}
                  className="gradient-button shadow-glow-hover"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-card border-0 shadow-xl slide-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
              <Bell className="h-5 w-5 text-amber-600" />
            </div>
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
            <div className="space-y-1">
              <Label className="text-base font-semibold text-gray-800">Enable notifications</Label>
              <p className="text-sm text-blue-700">
                Receive reminders for your tasks
              </p>
            </div>
            <Button
              variant={notifications ? "default" : "outline"}
              size="sm"
              onClick={() => setNotifications(!notifications)}
              className={notifications ? "gradient-button" : "hover:bg-white/70 border-blue-200"}
            >
              {notifications ? "Enabled" : "Disabled"}
            </Button>
          </div>

          {notifications && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl slide-in">
              <div className="space-y-1">
                <Label htmlFor="reminder-time" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  Default reminder time
                </Label>
                <p className="text-sm text-green-700">
                  Set default time for task reminders
                </p>
              </div>
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-32 h-11 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}