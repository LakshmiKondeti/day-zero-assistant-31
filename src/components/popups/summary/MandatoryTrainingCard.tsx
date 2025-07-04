
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface MandatoryTrainingCardProps {
  learning: Array<{
    id: string;
    course: string;
    deadline: string;
    mandatory: boolean;
  }>;
}

const MandatoryTrainingCard: React.FC<MandatoryTrainingCardProps> = ({ learning }) => {
  const dueTodayCount = learning.filter(l => l.deadline === 'Today').length;
  const mandatoryDueToday = learning.filter(l => l.mandatory && l.deadline === 'Today');
  
  return (
    <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 text-orange-600 mr-2" />
          <h4 className="font-semibold text-orange-800">Mandatory Training</h4>
        </div>
        <Badge variant="destructive" className="text-xs">
          {dueTodayCount} Due Today
        </Badge>
      </div>
      <div className="space-y-2">
        {mandatoryDueToday.slice(0, 2).map((course) => (
          <div key={course.id} className="text-xs">
            <p className="font-medium text-gray-900">{course.course}</p>
            <p className="text-gray-600">Deadline: {course.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandatoryTrainingCard;
