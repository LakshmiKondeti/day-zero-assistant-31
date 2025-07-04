
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Inbox, Calendar } from 'lucide-react';

interface OutlookServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const OutlookServicePopup: React.FC<OutlookServicePopupProps> = ({ isOpen, onClose }) => {
  const handleRedirect = () => {
    window.open('https://outlook.office.com', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-lg">
            <div className="bg-green-600 p-2 rounded-full">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span>Microsoft Outlook</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <Mail className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Outlook</h3>
            <p className="text-gray-600 mb-6">
              Manage your emails, calendar, and contacts with Microsoft Outlook.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <Inbox className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-sm text-gray-700">Email Management</span>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-sm text-gray-700">Calendar Integration</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRedirect} className="flex-1 bg-green-600 hover:bg-green-700">
            <Mail className="w-4 h-4 mr-2" />
            Open Outlook
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutlookServicePopup;
