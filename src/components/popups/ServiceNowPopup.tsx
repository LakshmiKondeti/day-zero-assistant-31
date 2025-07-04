
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, AlertCircle } from 'lucide-react';

interface ServiceNowPopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceNowData: Array<{ 
    id: string; 
    title: string; 
    priority: 'High' | 'Medium' | 'Low'; 
    escalated: boolean; 
    customer: string 
  }>;
}

const ServiceNowPopup: React.FC<ServiceNowPopupProps> = ({ isOpen, onClose, serviceNowData }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="bg-purple-600 p-2 rounded-full">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span>ServiceNow - Support Tickets</span>
            <Badge variant="secondary" className="ml-auto">{serviceNowData.length} Tickets</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-3">Active Support Tickets</h3>
            <div className="space-y-3">
              {serviceNowData.map((ticket) => (
                <div key={ticket.id} className="border border-purple-300 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                    <div className="flex space-x-1">
                      <Badge variant={getPriorityColor(ticket.priority)} className="text-xs">
                        {ticket.priority}
                      </Badge>
                      {ticket.escalated && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Escalated
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Customer: {ticket.customer}</p>
                    <p>Ticket ID: {ticket.id}</p>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      View Ticket
                    </Button>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
            <Wrench className="w-4 h-4 mr-2" />
            Open ServiceNow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceNowPopup;
