import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Mail, BookOpen, Wrench, FileText, Video, User, Mic, MicOff, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import VoiceAssistant from '@/components/VoiceAssistant';
import DashboardSummary from '@/components/DashboardSummary';
import OutlookPopup from '@/components/popups/OutlookPopup';
import TeamsPopup from '@/components/popups/TeamsPopup';
import ServiceNowPopup from '@/components/popups/ServiceNowPopup';
import IncidentsPopup from '@/components/popups/IncidentsPopup';
import ApprovalsPopup from '@/components/popups/ApprovalsPopup';
import LearningPopup from '@/components/popups/LearningPopup';
import TeamsServicePopup from '@/components/popups/TeamsServicePopup';
import OutlookServicePopup from '@/components/popups/OutlookServicePopup';
import ServiceNowServicePopup from '@/components/popups/ServiceNowServicePopup';
import IncidentsServicePopup from '@/components/popups/IncidentsServicePopup';
import ApprovalsServicePopup from '@/components/popups/ApprovalsServicePopup';
import LearningServicePopup from '@/components/popups/LearningServicePopup';

interface DashboardData {
  approvalRequests: {
    pending: number;
    awaiting: number;
    urgent: Array<{ id: string; title: string; requester: string; days: number }>;
  };
  incidents: Array<{ id: string; title: string; severity: 'Critical' | 'High' | 'Medium'; impact: string; duration: string }>;
  learning: Array<{ id: string; course: string; deadline: string; mandatory: boolean }>;
  serviceNowTickets: Array<{ id: string; title: string; priority: 'High' | 'Medium' | 'Low'; escalated: boolean; customer: string }>;
  outlookMails: {
    urgent: number;
    escalated: Array<{ id: string; subject: string; sender: string; hoursAgo: number }>;
  };
  teamseMeetings: Array<{ id: string; title: string; time: string; attendees: number; urgent: boolean; channel: string }>;
}

const Index = () => {
  const [employeeName] = useState("Alex Johnson");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Popup states
  const [outlookPopupOpen, setOutlookPopupOpen] = useState(false);
  const [teamsPopupOpen, setTeamsPopupOpen] = useState(false);
  const [serviceNowPopupOpen, setServiceNowPopupOpen] = useState(false);
  const [incidentsPopupOpen, setIncidentsPopupOpen] = useState(false);
  const [approvalsPopupOpen, setApprovalsPopupOpen] = useState(false);
  const [learningPopupOpen, setLearningPopupOpen] = useState(false);

  // Service popup states
  const [teamsServicePopupOpen, setTeamsServicePopupOpen] = useState(false);
  const [outlookServicePopupOpen, setOutlookServicePopupOpen] = useState(false);
  const [serviceNowServicePopupOpen, setServiceNowServicePopupOpen] = useState(false);
  const [incidentsServicePopupOpen, setIncidentsServicePopupOpen] = useState(false);
  const [approvalsServicePopupOpen, setApprovalsServicePopupOpen] = useState(false);
  const [learningServicePopupOpen, setLearningServicePopupOpen] = useState(false);

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    approvalRequests: {
      pending: 7,
      awaiting: 3,
      urgent: [
        { id: "AP001", title: "Budget Approval - Q4 Marketing", requester: "Sarah Chen", days: 3 },
        { id: "AP002", title: "New Hire Authorization", requester: "Mike Torres", days: 5 },
        { id: "AP003", title: "Equipment Purchase Request", requester: "Lisa Wang", days: 2 }
      ]
    },
    incidents: [
      { id: "INC001", title: "Database Connection Failure", severity: "Critical", impact: "Customer Portal Down", duration: "45 mins" },
      { id: "INC002", title: "API Rate Limiting Issues", severity: "High", impact: "Mobile App Performance", duration: "1.2 hours" },
      { id: "INC003", title: "Email Service Degradation", severity: "High", impact: "Internal Communications", duration: "30 mins" }
    ],
    learning: [
      { id: "LRN001", course: "Cybersecurity Awareness 2024", deadline: "Today", mandatory: true },
      { id: "LRN002", course: "Data Privacy Compliance", deadline: "2 days", mandatory: true },
      { id: "LRN003", course: "Leadership Development", deadline: "1 week", mandatory: false }
    ],
    serviceNowTickets: [
      { id: "SNT001", title: "Login Issues - Customer Portal", priority: "High", escalated: true, customer: "Enterprise Corp" },
      { id: "SNT002", title: "Performance Degradation", priority: "High", escalated: true, customer: "Tech Solutions Inc" },
      { id: "SNT003", title: "Feature Request Implementation", priority: "Medium", escalated: false, customer: "Startup LLC" }
    ],
    outlookMails: {
      urgent: 12,
      escalated: [
        { id: "MAIL001", subject: "URGENT: Client Meeting Rescheduling", sender: "CEO Office", hoursAgo: 2 },
        { id: "MAIL002", subject: "Critical System Update Required", sender: "IT Security", hoursAgo: 4 },
        { id: "MAIL003", subject: "Budget Review - Immediate Action", sender: "Finance Team", hoursAgo: 6 }
      ]
    },
    teamseMeetings: [
      { id: "MTG001", title: "Critical Incident Response - Production Down", time: "9:00 AM", attendees: 12, urgent: true, channel: "Incident Response" },
      { id: "MTG002", title: "Weekly Leadership Sync", time: "10:30 AM", attendees: 8, urgent: false, channel: "Leadership Team" },
      { id: "MTG003", title: "Client Escalation Review", time: "2:00 PM", attendees: 6, urgent: true, channel: "Customer Success" }
    ]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const criticalCount = 
    dashboardData.incidents.filter(i => i.severity === 'Critical').length +
    dashboardData.teamseMeetings.filter(m => m.urgent).length +
    dashboardData.approvalRequests.urgent.length +
    dashboardData.serviceNowTickets.filter(t => t.escalated).length +
    dashboardData.outlookMails.escalated.length +
    dashboardData.learning.filter(l => l.mandatory && l.deadline === 'Today').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Good Morning, {employeeName}</h1>
                <p className="text-gray-600">{currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-gray-900">
                {currentTime.toLocaleTimeString()}
              </div>
              <p className="text-sm text-gray-600">AI-Powered Dashboard Assistant</p>
            </div>
          </div>
        </div>

        {/* Voice Assistant Module */}
        <VoiceAssistant 
          dashboardData={dashboardData}
          employeeName={employeeName}
          criticalCount={criticalCount}
        />

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Button 
            onClick={() => setOutlookServicePopupOpen(true)}
            className="h-16 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700"
          >
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-xs">Outlook</span>
          </Button>
          
          <Button 
            onClick={() => setTeamsServicePopupOpen(true)}
            className="h-16 flex flex-col items-center justify-center bg-indigo-600 hover:bg-indigo-700"
          >
            <Video className="w-5 h-5 mb-1" />
            <span className="text-xs">Teams</span>
          </Button>
          
          <Button 
            onClick={() => setServiceNowServicePopupOpen(true)}
            className="h-16 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700"
          >
            <Wrench className="w-5 h-5 mb-1" />
            <span className="text-xs">ServiceNow</span>
          </Button>
          
          <Button 
            onClick={() => setIncidentsServicePopupOpen(true)}
            className="h-16 flex flex-col items-center justify-center bg-red-600 hover:bg-red-700"
          >
            <AlertTriangle className="w-5 h-5 mb-1" />
            <span className="text-xs">Incidents</span>
          </Button>
          
          <Button 
            onClick={() => setApprovalsServicePopupOpen(true)}
            className="h-16 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs">Approvals</span>
          </Button>
          
          <Button 
            onClick={() => setLearningServicePopupOpen(true)}
            className="h-16 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700"
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs">Learning</span>
          </Button>
        </div>

        {/* Dashboard Summary */}
        <DashboardSummary 
          dashboardData={dashboardData}
          criticalCount={criticalCount}
        />

        {/* Service Popups */}
        <TeamsServicePopup 
          isOpen={teamsServicePopupOpen}
          onClose={() => setTeamsServicePopupOpen(false)}
        />
        
        <OutlookServicePopup 
          isOpen={outlookServicePopupOpen}
          onClose={() => setOutlookServicePopupOpen(false)}
        />
        
        <ServiceNowServicePopup 
          isOpen={serviceNowServicePopupOpen}
          onClose={() => setServiceNowServicePopupOpen(false)}
        />
        
        <IncidentsServicePopup 
          isOpen={incidentsServicePopupOpen}
          onClose={() => setIncidentsServicePopupOpen(false)}
        />
        
        <ApprovalsServicePopup 
          isOpen={approvalsServicePopupOpen}
          onClose={() => setApprovalsServicePopupOpen(false)}
        />
        
        <LearningServicePopup 
          isOpen={learningServicePopupOpen}
          onClose={() => setLearningServicePopupOpen(false)}
        />

        {/* Individual Data Popups */}
        <OutlookPopup 
          isOpen={outlookPopupOpen}
          onClose={() => setOutlookPopupOpen(false)}
          outlookData={dashboardData.outlookMails}
        />
        
        <TeamsPopup 
          isOpen={teamsPopupOpen}
          onClose={() => setTeamsPopupOpen(false)}
          teamsData={dashboardData.teamseMeetings}
        />
        
        <ServiceNowPopup 
          isOpen={serviceNowPopupOpen}
          onClose={() => setServiceNowPopupOpen(false)}
          serviceNowData={dashboardData.serviceNowTickets}
        />
        
        <IncidentsPopup 
          isOpen={incidentsPopupOpen}
          onClose={() => setIncidentsPopupOpen(false)}
          incidentsData={dashboardData.incidents}
        />
        
        <ApprovalsPopup 
          isOpen={approvalsPopupOpen}
          onClose={() => setApprovalsPopupOpen(false)}
          approvalsData={dashboardData.approvalRequests}
        />
        
        <LearningPopup 
          isOpen={learningPopupOpen}
          onClose={() => setLearningPopupOpen(false)}
          learningData={dashboardData.learning}
        />

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>AI Assistant updates in real-time • Last updated: {currentTime.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
