
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, CheckSquare, Clock } from 'lucide-react';

interface ApprovalsServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApprovalsServicePopup: React.FC<ApprovalsServicePopupProps> = ({ isOpen, onClose }) => {
  const handleRedirect = () => {
    window.open('https://approvals.company.com', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-lg">
            <div className="bg-blue-600 p-2 rounded-full">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>Approval System</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Approval System</h3>
            <p className="text-gray-600 mb-6">
              Review, approve, or reject requests and manage approval workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <CheckSquare className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-sm text-gray-700">Request Reviews</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-sm text-gray-700">Workflow Management</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRedirect} className="flex-1 bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Open Approvals
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalsServicePopup;
