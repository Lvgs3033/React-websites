
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: { name: string; color: string }) => void;
}

const CategoryModal = ({ isOpen, onClose, onSubmit }: CategoryModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '#ff69b4',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', color: '#ff69b4' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-pink-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            🌸 Add New Category
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name..."
              required
              className="border-pink-200 focus:border-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="categoryColor">Category Color</Label>
            <Input
              id="categoryColor"
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="border-pink-200 focus:border-pink-400 h-12"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
              Add Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
