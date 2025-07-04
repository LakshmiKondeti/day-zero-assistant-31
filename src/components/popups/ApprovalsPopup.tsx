
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ApprovalsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  approvalsData: {
    pending: number;
    awaiting: number;
    urgent: Array<{ id: string; title: string; requester: string; days: number }>;
  };
}

const ApprovalsPopup: React.FC<ApprovalsPopupProps> = ({ isOpen, onClose, approvalsData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>Approval Requests</span>
            <Badge variant="destructive" className="ml-auto">{approvalsData.pending} Pending</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{approvalsData.pending}</p>
              <p className="text-sm text-blue-800">Pending</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-orange-600">{approvalsData.awaiting}</p>
              <p className="text-sm text-orange-800">Awaiting</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3">Urgent Approvals</h3>
            <div className="space-y-3">
              {approvalsData.urgent.map((approval) => (
                <div key={approval.id} className="border border-blue-300 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{approval.title}</h4>
                    <Badge variant="destructive" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {approval.days} days
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p>Requested by: {approval.requester}</p>
                    <p>Request ID: {approval.id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500 text-red-600">
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Approval Center
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalsPopup;
