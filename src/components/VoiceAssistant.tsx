
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Send, Mail, Video, AlertTriangle, Clock, FileText, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface VoiceAssistantProps {
  dashboardData: any;
  employeeName: string;
  criticalCount: number;
  onOutlookClick: () => void;
  onTeamsClick: () => void;
  onIncidentsClick: () => void;
  onApprovalsClick: () => void;
  onLearningClick: () => void;
  onServiceNowClick: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  dashboardData, 
  employeeName, 
  criticalCount,
  onOutlookClick,
  onTeamsClick,
  onIncidentsClick,
  onApprovalsClick,
  onLearningClick,
  onServiceNowClick
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognitionAPI();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserInput(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or use text input.",
          variant: "destructive"
        });
      };
    }

    // Initialize speech synthesis
    synthesis.current = window.speechSynthesis;

    // Add initial greeting with service breakdown
    const initialMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Hello ${employeeName}! I'm PAL, your Personal Assistant Lite. You have ${criticalCount} critical items requiring immediate attention. Click on the service buttons below to get detailed information about each service.`,
      timestamp: new Date()
    };
    setMessages([initialMessage]);

    if (isVoiceEnabled) {
      speakText(initialMessage.content);
    }
  }, []);

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesis.current && isVoiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      synthesis.current.speak(utterance);
    }
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('critical') || input.includes('urgent')) {
      return `You have ${criticalCount} critical items requiring immediate attention. Click on the service buttons below to see detailed information.`;
    }
    
    if (input.includes('meeting') || input.includes('teams')) {
      const nextMeeting = dashboardData.teamseMeetings[0];
      return `Your next meeting is "${nextMeeting.title}" at ${nextMeeting.time} with ${nextMeeting.attendees} attendees.`;
    }
    
    if (input.includes('email') || input.includes('mail')) {
      return `You have ${dashboardData.outlookMails.urgent} urgent emails requiring attention.`;
    }
    
    if (input.includes('approval')) {
      return `You have ${dashboardData.approvalRequests.pending} pending approvals with ${dashboardData.approvalRequests.urgent.length} urgent requests.`;
    }
    
    if (input.includes('incident')) {
      const criticalIncidents = dashboardData.incidents.filter((i: any) => i.severity === 'Critical');
      return `There are ${criticalIncidents.length} critical incidents requiring immediate attention.`;
    }
    
    if (input.includes('training') || input.includes('learning')) {
      const dueTodayCount = dashboardData.learning.filter((l: any) => l.deadline === 'Today').length;
      return `You have ${dueTodayCount} mandatory courses due today.`;
    }
    
    if (input.includes('ticket') || input.includes('servicenow')) {
      const escalatedCount = dashboardData.serviceNowTickets.filter((t: any) => t.escalated).length;
      return `You have ${escalatedCount} escalated ServiceNow tickets requiring attention.`;
    }
    
    return `I'm PAL, your Personal Assistant Lite. Click on the service buttons below to get detailed information about your tasks.`;
  };

  const handleUserInput = (input: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    const response = generateResponse(input);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    
    if (isVoiceEnabled) {
      speakText(response);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleUserInput(textInput);
      setTextInput('');
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (synthesis.current && isSpeaking) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <Card className="mb-6 border-2 border-red-500 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-red-600 to-black text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>PAL - Personal Assistant Lite</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white">
              {criticalCount} Critical Items
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoice}
              className="text-white hover:bg-white/20"
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Voice Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? 'Stop Listening' : 'Voice Input'}</span>
          </Button>
          
          {isSpeaking && (
            <Badge variant="secondary" className="bg-red-100 text-red-800 animate-pulse border-red-300">
              Speaking...
            </Badge>
          )}
          
          {isListening && (
            <Badge variant="secondary" className="bg-black text-white animate-pulse">
              Listening...
            </Badge>
          )}
        </div>

        {/* Service Summary Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            onClick={onOutlookClick}
            className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white"
          >
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">Outlook Mails</span>
            <Badge variant="secondary" className="text-xs mt-1 bg-white text-green-600">
              {dashboardData.outlookMails.urgent}
            </Badge>
          </Button>
          
          <Button 
            onClick={onTeamsClick}
            className="h-20 flex flex-col items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Video className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">Teams Meetings</span>
            <Badge variant="secondary" className="text-xs mt-1 bg-white text-indigo-600">
              {dashboardData.teamseMeetings.filter((m: any) => m.urgent).length}
            </Badge>
          </Button>
          
          <Button 
            onClick={onIncidentsClick}
            className="h-20 flex flex-col items-center justify-center bg-red-600 hover:bg-red-700 text-white"
          >
            <AlertTriangle className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">Critical Incidents</span>
            <Badge variant="secondary" className="text-xs mt-1 bg-white text-red-600">
              {dashboardData.incidents.filter((i: any) => i.severity === 'Critical').length}
            </Badge>
          </Button>
          
          <Button 
            onClick={onApprovalsClick}
            className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">Approvals</span>
            <Badge variant="secondary" className="text-xs mt-1 bg-white text-blue-600">
              {dashboardData.approvalRequests.urgent.length}
            </Badge>
          </Button>
          
          <Button 
            onClick={onLearningClick}
            className="h-20 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 text-white"
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">Learning</span>
            <Badge variant="secondary" className="text-xs mt-1 bg-white text-orange-600">
              {dashboardData.learning.filter((l: any) => l.mandatory && l.deadline === 'Today').length}
            </Badge>
          </Button>
          
          <Button 
            onClick={onServiceNowClick}
            className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Clock className="w-5 h-5 mb-1" />
            <span className="text-xs text-center">ServiceNow</span>
            <Badge variant="secondary" className="text-xs mt-1 bg-white text-purple-600">
              {dashboardData.serviceNowTickets.filter((t: any) => t.escalated).length}
            </Badge>
          </Button>
        </div>

        {/* Text Input */}
        <div className="flex space-x-2">
          <Input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Ask PAL about your services..."
            className="flex-1 border-red-300 focus:border-red-500 focus:ring-red-500"
            onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
          />
          <Button
            variant="default"
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Conversation History */}
        <ScrollArea className="h-32 w-full rounded-md border-2 border-red-200 bg-gray-50 p-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-black text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
