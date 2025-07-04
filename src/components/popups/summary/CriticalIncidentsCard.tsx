
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface CriticalIncidentsCardProps {
  incidents: Array<{
    id: string;
    title: string;
    severity: 'Critical' | 'High' | 'Medium';
    impact: string;
    duration: string;
  }>;
}

const CriticalIncidentsCard: React.FC<CriticalIncidentsCardProps> = ({ incidents }) => {
  const criticalIncidents = incidents.filter(i => i.severity === 'Critical');
  
  return (
    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
          <h4 className="font-semibold text-red-800">Critical Incidents</h4>
        </div>
        <Badge variant="destructive" className="text-xs">
          {criticalIncidents.length} Critical
        </Badge>
      </div>
      <div className="space-y-2">
        {criticalIncidents.slice(0, 2).map((incident) => (
          <div key={incident.id} className="text-xs">
            <p className="font-medium text-gray-900">{incident.title}</p>
            <p className="text-gray-600">Impact: {incident.impact} • {incident.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriticalIncidentsCard;
