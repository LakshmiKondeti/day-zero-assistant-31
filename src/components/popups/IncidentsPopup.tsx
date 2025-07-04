
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';

interface IncidentsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  incidentsData: Array<{ 
    id: string; 
    title: string; 
    severity: 'Critical' | 'High' | 'Medium'; 
    impact: string; 
    duration: string 
  }>;
}

const IncidentsPopup: React.FC<IncidentsPopupProps> = ({ isOpen, onClose, incidentsData }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-full">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <span>System Incidents</span>
            <Badge variant="destructive" className="ml-auto">{incidentsData.length} Active</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-3">Active Incidents</h3>
            <div className="space-y-3">
              {incidentsData.map((incident) => (
                <div key={incident.id} className="border border-red-300 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{incident.title}</h4>
                    <Badge variant={getSeverityColor(incident.severity)} className="text-xs">
                      {incident.severity}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Impact: {incident.impact}</p>
                    <p className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Duration: {incident.duration}
                    </p>
                    <p>Incident ID: {incident.id}</p>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Assign Team
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Incident Management
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncidentsPopup;
