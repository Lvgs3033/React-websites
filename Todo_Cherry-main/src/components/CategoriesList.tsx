
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Category } from '@/pages/Index';

interface CategoriesListProps {
  categories: Category[];
  onAddCategory: () => void;
}

const CategoriesList = ({ categories, onAddCategory }: CategoriesListProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">🌸 Categories</h3>
        <div className="space-y-2 mb-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-gray-700">{category.name}</span>
            </div>
          ))}
        </div>
        <Button 
          onClick={onAddCategory}
          variant="outline"
          size="sm"
          className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoriesList;
