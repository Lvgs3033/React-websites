
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
            🌸 Hello Dhvani! 🌸
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600 mb-4">
            Have a wonderful day!
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-center py-6">
          <div className="mb-6">
            <div className="text-4xl mb-4">💫</div>
            <blockquote className="text-xl text-gray-700 font-medium italic mb-4 px-4">
              "You are the best"
            </blockquote>
          </div>
          
          <Button 
            onClick={onClose}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 text-lg"
          >
            Start My Day! 🌸
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
