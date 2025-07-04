
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, Users, Calendar } from 'lucide-react';

interface TeamsServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamsServicePopup: React.FC<TeamsServicePopupProps> = ({ isOpen, onClose }) => {
  const handleRedirect = () => {
    window.open('https://teams.microsoft.com', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-lg">
            <div className="bg-indigo-600 p-2 rounded-full">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span>Microsoft Teams</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <Video className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Microsoft Teams</h3>
            <p className="text-gray-600 mb-6">
              Join meetings, collaborate with your team, and stay connected with Microsoft Teams.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600 mr-3" />
              <span className="text-sm text-gray-700">Team Collaboration</span>
            </div>
            <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-600 mr-3" />
              <span className="text-sm text-gray-700">Meeting Management</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRedirect} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
            <Video className="w-4 h-4 mr-2" />
            Open Teams
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamsServicePopup;
