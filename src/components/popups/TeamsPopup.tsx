
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Users } from 'lucide-react';

interface TeamsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  teamsData: Array<{ 
    id: string; 
    title: string; 
    time: string; 
    attendees: number; 
    urgent: boolean; 
    channel: string 
  }>;
}

const TeamsPopup: React.FC<TeamsPopupProps> = ({ isOpen, onClose, teamsData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-full">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span>Microsoft Teams - Meetings</span>
            <Badge variant="secondary" className="ml-auto">{teamsData.length} Meetings</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-800 mb-3">Today's Meetings</h3>
            <div className="space-y-3">
              {teamsData.map((meeting) => (
                <div key={meeting.id} className="border border-indigo-300 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                    {meeting.urgent && (
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Time: {meeting.time}</p>
                    <p className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {meeting.attendees} attendees
                    </p>
                    <p>Channel: {meeting.channel}</p>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      Join Meeting
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
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700">
            <Video className="w-4 h-4 mr-2" />
            Open Teams
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamsPopup;
