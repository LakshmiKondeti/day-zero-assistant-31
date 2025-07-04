
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award } from 'lucide-react';

interface LearningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  learningData: Array<{ 
    id: string; 
    course: string; 
    deadline: string; 
    mandatory: boolean 
  }>;
}

const LearningPopup: React.FC<LearningPopupProps> = ({ isOpen, onClose, learningData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="bg-orange-600 p-2 rounded-full">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span>Learning & Development</span>
            <Badge variant="secondary" className="ml-auto">{learningData.length} Courses</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-3">Required Training</h3>
            <div className="space-y-3">
              {learningData.map((course) => (
                <div key={course.id} className="border border-orange-300 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{course.course}</h4>
                    <div className="flex space-x-1">
                      {course.mandatory && (
                        <Badge variant="destructive" className="text-xs">
                          Mandatory
                        </Badge>
                      )}
                      <Badge 
                        variant={course.deadline === 'Today' ? 'destructive' : 'outline'} 
                        className="text-xs"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {course.deadline}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p>Course ID: {course.id}</p>
                    <p>Type: {course.mandatory ? 'Mandatory Training' : 'Optional Development'}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Start Course
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={onClose} className="bg-orange-600 hover:bg-orange-700">
            <Award className="w-4 h-4 mr-2" />
            Learning Portal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearningPopup;
