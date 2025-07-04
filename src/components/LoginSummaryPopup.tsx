
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Mail, BookOpen, Wrench, FileText, Video, User } from 'lucide-react';
import NextMeetingCard from './popups/summary/NextMeetingCard';
import UrgentApprovalsCard from './popups/summary/UrgentApprovalsCard';
import CriticalIncidentsCard from './popups/summary/CriticalIncidentsCard';
import MandatoryTrainingCard from './popups/summary/MandatoryTrainingCard';
import EscalatedTicketsCard from './popups/summary/EscalatedTicketsCard';
import UrgentEmailsCard from './popups/summary/UrgentEmailsCard';

interface LoginSummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardData: any;
  employeeName: string;
}

const LoginSummaryPopup: React.FC<LoginSummaryPopupProps> = ({ 
  isOpen, 
  onClose, 
  dashboardData, 
  employeeName 
}) => {
  const criticalCount = 
    dashboardData.incidents.filter((i: any) => i.severity === 'Critical').length +
    dashboardData.teamseMeetings.filter((m: any) => m.urgent).length +
    dashboardData.approvalRequests.urgent.length +
    dashboardData.serviceNowTickets.filter((t: any) => t.escalated).length +
    dashboardData.outlookMails.escalated.length +
    dashboardData.learning.filter((l: any) => l.mandatory && l.deadline === 'Today').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl">
            <div className="bg-blue-600 p-2 rounded-full">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <span>Daily Briefing - {employeeName}</span>
              <p className="text-sm text-gray-600 font-normal">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Critical Alert Summary */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="font-semibold text-red-800">Critical Items Requiring Immediate Attention</h3>
            <Badge variant="destructive" className="ml-auto">{criticalCount} Total</Badge>
          </div>
          <p className="text-sm text-red-700">
            You have {criticalCount} critical items that need your immediate attention today.
          </p>
        </div>

        {/* Grid Layout for Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NextMeetingCard 
            meeting={dashboardData.teamseMeetings[0]}
            hasUrgentMeetings={dashboardData.teamseMeetings.filter((m: any) => m.urgent).length > 0}
          />
          
          <UrgentApprovalsCard urgentApprovals={dashboardData.approvalRequests.urgent} />
          
          <CriticalIncidentsCard incidents={dashboardData.incidents} />
          
          <MandatoryTrainingCard learning={dashboardData.learning} />
          
          <EscalatedTicketsCard tickets={dashboardData.serviceNowTickets} />
          
          <UrgentEmailsCard emails={dashboardData.outlookMails.escalated} />
        </div>

        <Separator className="my-4" />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Video className="w-4 h-4 mr-1" />
            Join Meeting
          </Button>
          <Button size="sm" variant="outline" className="border-blue-500 text-blue-600">
            <FileText className="w-4 h-4 mr-1" />
            Review Approvals
          </Button>
          <Button size="sm" variant="outline" className="border-red-500 text-red-600">
            <AlertTriangle className="w-4 h-4 mr-1" />
            View Incidents
          </Button>
          <Button size="sm" variant="outline" className="border-green-500 text-green-600">
            <Mail className="w-4 h-4 mr-1" />
            Check Emails
          </Button>
        </div>

        <div className="text-center mt-4">
          <Button variant="ghost" onClick={onClose} className="text-gray-600">
            Continue to Full Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginSummaryPopup;
