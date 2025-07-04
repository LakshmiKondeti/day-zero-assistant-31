
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wrench, Ticket, Settings } from 'lucide-react';

interface ServiceNowServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceNowServicePopup: React.FC<ServiceNowServicePopupProps> = ({ isOpen, onClose }) => {
  const handleRedirect = () => {
    window.open('https://servicenow.com', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-lg">
            <div className="bg-purple-600 p-2 rounded-full">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span>ServiceNow</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <Wrench className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access ServiceNow</h3>
            <p className="text-gray-600 mb-6">
              Manage IT service requests, incidents, and workflows with ServiceNow platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <Ticket className="w-5 h-5 text-purple-600 mr-3" />
              <span className="text-sm text-gray-700">Ticket Management</span>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <Settings className="w-5 h-5 text-purple-600 mr-3" />
              <span className="text-sm text-gray-700">Service Automation</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRedirect} className="flex-1 bg-purple-600 hover:bg-purple-700">
            <Wrench className="w-4 h-4 mr-2" />
            Open ServiceNow
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceNowServicePopup;
