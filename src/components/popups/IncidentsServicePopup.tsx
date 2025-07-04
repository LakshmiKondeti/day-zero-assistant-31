
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

interface IncidentsServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const IncidentsServicePopup: React.FC<IncidentsServicePopupProps> = ({ isOpen, onClose }) => {
  const handleRedirect = () => {
    window.open('https://incidents.company.com', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-lg">
            <div className="bg-red-600 p-2 rounded-full">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <span>Incident Management</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Incident Management</h3>
            <p className="text-gray-600 mb-6">
              Monitor, track, and resolve system incidents and outages efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-sm text-gray-700">Security Monitoring</span>
            </div>
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <Activity className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-sm text-gray-700">System Health</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRedirect} className="flex-1 bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Open Incidents
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncidentsServicePopup;
