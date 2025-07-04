
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface IncidentsVoiceAssistantProps {
  incidentsData: any[];
  onOpenPopup: () => void;
}

const IncidentsVoiceAssistant: React.FC<IncidentsVoiceAssistantProps> = ({ incidentsData, onOpenPopup }) => {
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
    const criticalIncidents = incidentsData.filter(i => i.severity === 'Critical');
    
    if (lowerCommand.includes('incident') || lowerCommand.includes('critical') || lowerCommand.includes('summary')) {
      const response = `Incidents Summary: You have ${incidentsData.length} total incidents. ${criticalIncidents.length} are critical severity. The most severe incident is "${criticalIncidents[0]?.title}" affecting ${criticalIncidents[0]?.impact} for ${criticalIncidents[0]?.duration}.`;
      speakText(response);
    } else if (lowerCommand.includes('open') || lowerCommand.includes('show') || lowerCommand.includes('view')) {
      speakText("Opening incident management details.");
      onOpenPopup();
    } else {
      speakText("I can help you with incident management. Say 'incident summary' for details or 'open incidents' to view all incidents.");
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
    const criticalCount = incidentsData.filter(i => i.severity === 'Critical').length;
    const response = `Critical Response: ${criticalCount} critical incidents need immediate attention out of ${incidentsData.length} total incidents.`;
    speakText(response);
  };

  return (
    <Card className="mb-4 border-red-200 bg-red-50">
      <CardHeader className="bg-red-600 text-white">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Incidents Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {incidentsData.filter(i => i.severity === 'Critical').length} Critical
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
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
          </Button>
          
          <Button
            onClick={giveSummary}
            disabled={isSpeaking}
            size="sm"
            variant="outline"
            className="border-red-300 text-red-600"
          >
            Summary
          </Button>
          
          <Button
            onClick={onOpenPopup}
            size="sm"
            variant="outline"
            className="border-red-300 text-red-600"
          >
            View Details
          </Button>
          
          {isSpeaking && (
            <Badge variant="secondary" className="bg-red-100 text-red-800 animate-pulse text-xs">
              Speaking...
            </Badge>
          )}
          
          {isListening && (
            <Badge variant="secondary" className="bg-red-800 text-white animate-pulse text-xs">
              Listening...
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentsVoiceAssistant;
