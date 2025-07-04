
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ApprovalsVoiceAssistantProps {
  approvalsData: {
    pending: number;
    awaiting: number;
    urgent: any[];
  };
  onOpenPopup: () => void;
}

const ApprovalsVoiceAssistant: React.FC<ApprovalsVoiceAssistantProps> = ({ approvalsData, onOpenPopup }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognitionAPI();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceCommand(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again.",
          variant: "destructive"
        });
      };
    }

    synthesis.current = window.speechSynthesis;
  }, []);

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

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('approval') || lowerCommand.includes('pending') || lowerCommand.includes('summary')) {
      const oldestRequest = approvalsData.urgent[0];
      const response = `Approvals Summary: You have ${approvalsData.pending} pending approvals with ${approvalsData.urgent.length} urgent requests. The oldest urgent request is "${oldestRequest?.title}" from ${oldestRequest?.requester}, pending for ${oldestRequest?.days} days.`;
      speakText(response);
    } else if (lowerCommand.includes('open') || lowerCommand.includes('show') || lowerCommand.includes('view')) {
      speakText("Opening approval requests details.");
      onOpenPopup();
    } else {
      speakText("I can help you with approval requests. Say 'approval summary' for details or 'open approvals' to view all requests.");
    }
  };

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

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (synthesis.current && isSpeaking) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const giveSummary = () => {
    const response = `Approvals: ${approvalsData.pending} pending, ${approvalsData.urgent.length} urgent requests need your approval.`;
    speakText(response);
  };

  return (
    <Card className="mb-4 border-blue-200 bg-blue-50">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Approvals Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {approvalsData.urgent.length} Urgent
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoice}
              className="text-white hover:bg-white/20 p-1"
            >
              {isVoiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
          </Button>
          
          <Button
            onClick={giveSummary}
            disabled={isSpeaking}
            size="sm"
            variant="outline"
            className="border-blue-300 text-blue-600"
          >
            Summary
          </Button>
          
          <Button
            onClick={onOpenPopup}
            size="sm"
            variant="outline"
            className="border-blue-300 text-blue-600"
          >
            View Details
          </Button>
          
          {isSpeaking && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 animate-pulse text-xs">
              Speaking...
            </Badge>
          )}
          
          {isListening && (
            <Badge variant="secondary" className="bg-blue-800 text-white animate-pulse text-xs">
              Listening...
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalsVoiceAssistant;
