
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wrench } from 'lucide-react';

interface EscalatedTicketsCardProps {
  tickets: Array<{
    id: string;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    escalated: boolean;
    customer: string;
  }>;
}

const EscalatedTicketsCard: React.FC<EscalatedTicketsCardProps> = ({ tickets }) => {
  const escalatedTickets = tickets.filter(t => t.escalated);
  
  return (
    <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Wrench className="w-4 h-4 text-purple-600 mr-2" />
          <h4 className="font-semibold text-purple-800">ServiceNow Tickets</h4>
        </div>
        <Badge variant="destructive" className="text-xs">
          {escalatedTickets.length} Escalated
        </Badge>
      </div>
      <div className="space-y-2">
        {escalatedTickets.slice(0, 2).map((ticket) => (
          <div key={ticket.id} className="text-xs">
            <p className="font-medium text-gray-900">{ticket.title}</p>
            <p className="text-gray-600">{ticket.customer} • {ticket.priority} Priority</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscalatedTicketsCard;
