
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TeamsVoiceAssistantProps {
  teamsData: any[];
  onOpenPopup: () => void;
}

const TeamsVoiceAssistant: React.FC<TeamsVoiceAssistantProps> = ({ teamsData, onOpenPopup }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
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
    
    if (lowerCommand.includes('meeting') || lowerCommand.includes('teams') || lowerCommand.includes('summary')) {
      const nextMeeting = teamsData[0];
      const urgentCount = teamsData.filter(m => m.urgent).length;
      const response = `You have ${teamsData.length} Teams meetings today. Your next meeting is "${nextMeeting?.title}" at ${nextMeeting?.time} with ${nextMeeting?.attendees} attendees. You have ${urgentCount} urgent meetings requiring immediate attention.`;
      speakText(response);
    } else if (lowerCommand.includes('open') || lowerCommand.includes('show') || lowerCommand.includes('view')) {
      speakText("Opening Teams meeting details for you.");
      onOpenPopup();
    } else {
      speakText("I can help you with Teams meetings. Say 'meeting summary' for details or 'open Teams' to view all meetings.");
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
    const nextMeeting = teamsData[0];
    const urgentCount = teamsData.filter(m => m.urgent).length;
    const response = `Teams Meeting Summary: You have ${teamsData.length} meetings today. Next meeting is "${nextMeeting?.title}" at ${nextMeeting?.time}. ${urgentCount} urgent meetings need attention.`;
    speakText(response);
  };

  return (
    <Card className="mb-4 border-indigo-200 bg-indigo-50">
      <CardHeader className="bg-indigo-600 text-white">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>Teams Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {teamsData.length} Meetings
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
          </Button>
          
          <Button
            onClick={giveSummary}
            disabled={isSpeaking}
            size="sm"
            variant="outline"
            className="border-indigo-300 text-indigo-600"
          >
            Summary
          </Button>
          
          <Button
            onClick={onOpenPopup}
            size="sm"
            variant="outline"
            className="border-indigo-300 text-indigo-600"
          >
            View Details
          </Button>
          
          {isSpeaking && (
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 animate-pulse text-xs">
              Speaking...
            </Badge>
          )}
          
          {isListening && (
            <Badge variant="secondary" className="bg-indigo-800 text-white animate-pulse text-xs">
              Listening...
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamsVoiceAssistant;
