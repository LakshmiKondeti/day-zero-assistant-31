
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';

interface UrgentEmailsCardProps {
  emails: Array<{
    id: string;
    subject: string;
    sender: string;
    hoursAgo: number;
  }>;
}

const UrgentEmailsCard: React.FC<UrgentEmailsCardProps> = ({ emails }) => {
  return (
    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Mail className="w-4 h-4 text-green-600 mr-2" />
          <h4 className="font-semibold text-green-800">Urgent Emails</h4>
        </div>
        <Badge variant="destructive" className="text-xs">{emails.length} Escalated</Badge>
      </div>
      <div className="space-y-2">
        {emails.slice(0, 2).map((email) => (
          <div key={email.id} className="text-xs">
            <p className="font-medium text-gray-900">{email.subject}</p>
            <p className="text-gray-600">{email.sender} • {email.hoursAgo}h ago</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgentEmailsCard;
