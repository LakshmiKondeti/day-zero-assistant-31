
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Wrench } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ServiceNowVoiceAssistantProps {
  serviceNowData: any[];
  onOpenPopup: () => void;
}

const ServiceNowVoiceAssistant: React.FC<ServiceNowVoiceAssistantProps> = ({ serviceNowData, onOpenPopup }) => {
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
    const escalatedTickets = serviceNowData.filter(t => t.escalated);
    
    if (lowerCommand.includes('servicenow') || lowerCommand.includes('ticket') || lowerCommand.includes('summary')) {
      const response = `ServiceNow Summary: You have ${serviceNowData.length} total tickets. ${escalatedTickets.length} are escalated and need immediate attention. The priority escalated ticket is "${escalatedTickets[0]?.title}" from ${escalatedTickets[0]?.customer} with ${escalatedTickets[0]?.priority} priority.`;
      speakText(response);
    } else if (lowerCommand.includes('open') || lowerCommand.includes('show') || lowerCommand.includes('view')) {
      speakText("Opening ServiceNow ticket management.");
      onOpenPopup();
    } else {
      speakText("I can help you with ServiceNow tickets. Say 'ticket summary' for details or 'open ServiceNow' to view all tickets.");
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
    const escalatedCount = serviceNowData.filter(t => t.escalated).length;
    const response = `ServiceNow: ${escalatedCount} escalated tickets out of ${serviceNowData.length} total tickets need attention.`;
    speakText(response);
  };

  return (
    <Card className="mb-4 border-purple-200 bg-purple-50">
      <CardHeader className="bg-purple-600 text-white">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Wrench className="w-4 h-4" />
            <span>ServiceNow Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {serviceNowData.filter(t => t.escalated).length} Escalated
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
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
          </Button>
          
          <Button
            onClick={giveSummary}
            disabled={isSpeaking}
            size="sm"
            variant="outline"
            className="border-purple-300 text-purple-600"
          >
            Summary
          </Button>
          
          <Button
            onClick={onOpenPopup}
            size="sm"
            variant="outline"
            className="border-purple-300 text-purple-600"
          >
            View Details
          </Button>
          
          {isSpeaking && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 animate-pulse text-xs">
              Speaking...
            </Badge>
          )}
          
          {isListening && (
            <Badge variant="secondary" className="bg-purple-800 text-white animate-pulse text-xs">
              Listening...
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceNowVoiceAssistant;
