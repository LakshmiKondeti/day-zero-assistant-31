
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface UrgentApprovalsCardProps {
  urgentApprovals: Array<{
    id: string;
    title: string;
    requester: string;
    days: number;
  }>;
}

const UrgentApprovalsCard: React.FC<UrgentApprovalsCardProps> = ({ urgentApprovals }) => {
  return (
    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <FileText className="w-4 h-4 text-blue-600 mr-2" />
          <h4 className="font-semibold text-blue-800">Approval Requests</h4>
        </div>
        <Badge variant="destructive" className="text-xs">{urgentApprovals.length} Urgent</Badge>
      </div>
      <div className="space-y-2">
        {urgentApprovals.slice(0, 2).map((request) => (
          <div key={request.id} className="text-xs">
            <p className="font-medium text-gray-900">{request.title}</p>
            <p className="text-gray-600">{request.requester} • {request.days} days pending</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgentApprovalsCard;
