
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, X } from 'lucide-react';

interface OutlookPopupProps {
  isOpen: boolean;
  onClose: () => void;
  outlookData: {
    urgent: number;
    escalated: Array<{ id: string; subject: string; sender: string; hoursAgo: number }>;
  };
}

const OutlookPopup: React.FC<OutlookPopupProps> = ({ isOpen, onClose, outlookData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-full">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span>Outlook - Urgent Messages</span>
            <Badge variant="destructive" className="ml-auto">{outlookData.urgent} Total</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-3">Escalated Messages</h3>
            <div className="space-y-3">
              {outlookData.escalated.map((email) => (
                <div key={email.id} className="border border-green-300 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{email.subject}</h4>
                    <Badge variant="outline" className="text-xs">{email.hoursAgo}h ago</Badge>
                  </div>
                  <p className="text-sm text-gray-600">From: {email.sender}</p>
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Forward
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
            <Mail className="w-4 h-4 mr-2" />
            Open Outlook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutlookPopup;
