
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (routine: { title: string; time: string; description: string; frequency: string }) => void;
}

const RoutineModal = ({ isOpen, onClose, onSubmit }: RoutineModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    description: '',
    frequency: 'daily',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', time: '', description: '', frequency: 'daily' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-pink-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            🌅 Add Daily Routine
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="routineTitle">Routine Title</Label>
            <Input
              id="routineTitle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter routine name..."
              required
              className="border-pink-200 focus:border-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="routineTime">Time</Label>
            <Input
              id="routineTime"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              className="border-pink-200 focus:border-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="routineDescription">Description</Label>
            <Textarea
              id="routineDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description..."
              rows={2}
              className="border-pink-200 focus:border-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="routineFrequency">Frequency</Label>
            <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
              <SelectTrigger className="border-pink-200 focus:border-pink-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">🌸 Daily</SelectItem>
                <SelectItem value="weekdays">💼 Weekdays</SelectItem>
                <SelectItem value="weekends">🌺 Weekends</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
              Add Routine
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoutineModal;
