
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface LoginVoiceGreetingProps {
  employeeName: string;
  dashboardData: any;
  criticalCount: number;
}

const LoginVoiceGreeting: React.FC<LoginVoiceGreetingProps> = ({ 
  employeeName, 
  dashboardData, 
  criticalCount 
}) => {
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synthesis.current = window.speechSynthesis;

    // Auto-speak greeting on login (only once)
    if (!hasSpoken && isVoiceEnabled) {
      setTimeout(() => {
        speakLoginGreeting();
        setHasSpoken(true);
      }, 1000); // Delay to ensure page is loaded
    }
  }, []);

  const speakLoginGreeting = () => {
    if (synthesis.current && isVoiceEnabled) {
      const nextMeeting = dashboardData.teamseMeetings[0];
      const urgentEmails = dashboardData.outlookMails.urgent;
      const criticalIncidents = dashboardData.incidents.filter((i: any) => i.severity === 'Critical').length;
      const urgentApprovals = dashboardData.approvalRequests.urgent.length;
      const mandatoryTraining = dashboardData.learning.filter((l: any) => l.mandatory && l.deadline === 'Today').length;
      const escalatedTickets = dashboardData.serviceNowTickets.filter((t: any) => t.escalated).length;

      const greeting = `Welcome back, ${employeeName}! Here's your priority briefing: You have ${criticalCount} critical items requiring immediate attention. Next Teams meeting: "${nextMeeting?.title}" at ${nextMeeting?.time}. ${urgentEmails} urgent emails, ${criticalIncidents} critical incidents, ${urgentApprovals} urgent approvals, ${mandatoryTraining} mandatory training courses due today, and ${escalatedTickets} escalated ServiceNow tickets. Your individual service assistants are ready to help with detailed information. Have a productive day!`;

      const utterance = new SpeechSynthesisUtterance(greeting);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      synthesis.current.speak(utterance);
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (synthesis.current) {
      synthesis.current.cancel();
    }
  };

  const replayGreeting = () => {
    speakLoginGreeting();
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleVoice}
        className={`${isVoiceEnabled ? 'bg-green-50 border-green-300 text-green-700' : 'bg-red-50 border-red-300 text-red-700'}`}
      >
        {isVoiceEnabled ? <Volume2 className="w-4 h-4 mr-1" /> : <VolumeX className="w-4 h-4 mr-1" />}
        Voice {isVoiceEnabled ? 'On' : 'Off'}
      </Button>
      
      {isVoiceEnabled && (
        <Button
          variant="outline"
          size="sm"
          onClick={replayGreeting}
          className="border-blue-300 text-blue-700"
        >
          Replay Greeting
        </Button>
      )}
    </div>
  );
};

export default LoginVoiceGreeting;
