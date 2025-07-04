
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LearningVoiceAssistantProps {
  learningData: any[];
  onOpenPopup: () => void;
}

const LearningVoiceAssistant: React.FC<LearningVoiceAssistantProps> = ({ learningData, onOpenPopup }) => {
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
    const mandatoryToday = learningData.filter(l => l.mandatory && l.deadline === 'Today');
    
    if (lowerCommand.includes('learning') || lowerCommand.includes('training') || lowerCommand.includes('summary')) {
      const response = `Learning Summary: You have ${learningData.length} learning courses assigned. ${mandatoryToday.length} mandatory courses are due today. The priority course is "${mandatoryToday[0]?.course}" which must be completed today.`;
      speakText(response);
    } else if (lowerCommand.includes('open') || lowerCommand.includes('show') || lowerCommand.includes('view')) {
      speakText("Opening learning and development details.");
      onOpenPopup();
    } else {
      speakText("I can help you with learning courses. Say 'learning summary' for details or 'open learning' to view all courses.");
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
    const mandatoryCount = learningData.filter(l => l.mandatory && l.deadline === 'Today').length;
    const response = `Mandatory Learning: ${mandatoryCount} courses due today out of ${learningData.length} total learning items.`;
    speakText(response);
  };

  return (
    <Card className="mb-4 border-orange-200 bg-orange-50">
      <CardHeader className="bg-orange-600 text-white">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Learning Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {learningData.filter(l => l.mandatory && l.deadline === 'Today').length} Due Today
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
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
          </Button>
          
          <Button
            onClick={giveSummary}
            disabled={isSpeaking}
            size="sm"
            variant="outline"
            className="border-orange-300 text-orange-600"
          >
            Summary
          </Button>
          
          <Button
            onClick={onOpenPopup}
            size="sm"
            variant="outline"
            className="border-orange-300 text-orange-600"
          >
            View Details
          </Button>
          
          {isSpeaking && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 animate-pulse text-xs">
              Speaking...
            </Badge>
          )}
          
          {isListening && (
            <Badge variant="secondary" className="bg-orange-800 text-white animate-pulse text-xs">
              Listening...
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningVoiceAssistant;
