
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Video } from 'lucide-react';

interface NextMeetingCardProps {
  meeting: {
    title: string;
    time: string;
    attendees: number;
    channel: string;
  };
  hasUrgentMeetings: boolean;
}

const NextMeetingCard: React.FC<NextMeetingCardProps> = ({ meeting, hasUrgentMeetings }) => {
  return (
    <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Video className="w-4 h-4 text-indigo-600 mr-2" />
          <h4 className="font-semibold text-indigo-800">Next Teams Meeting</h4>
        </div>
        {hasUrgentMeetings && (
          <Badge variant="destructive" className="text-xs">Urgent</Badge>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
        <p className="text-xs text-gray-600">
          {meeting.time} • {meeting.attendees} attendees
        </p>
        <p className="text-xs text-indigo-600">Channel: {meeting.channel}</p>
      </div>
    </div>
  );
};

export default NextMeetingCard;
