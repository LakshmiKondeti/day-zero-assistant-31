
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Award } from 'lucide-react';

interface LearningServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearningServicePopup: React.FC<LearningServicePopupProps> = ({ isOpen, onClose }) => {
  const handleRedirect = () => {
    window.open('https://learning.company.com', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-lg">
            <div className="bg-orange-600 p-2 rounded-full">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span>Learning Portal</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Learning Portal</h3>
            <p className="text-gray-600 mb-6">
              Complete training courses, track progress, and develop new skills.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <GraduationCap className="w-5 h-5 text-orange-600 mr-3" />
              <span className="text-sm text-gray-700">Course Catalog</span>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <Award className="w-5 h-5 text-orange-600 mr-3" />
              <span className="text-sm text-gray-700">Certifications</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRedirect} className="flex-1 bg-orange-600 hover:bg-orange-700">
            <BookOpen className="w-4 h-4 mr-2" />
            Open Learning
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearningServicePopup;
