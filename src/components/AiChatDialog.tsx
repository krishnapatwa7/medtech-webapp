import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, X, Mic, Square, Send, Phone, AlertTriangle, 
  MapPin, RefreshCw, User, Stethoscope, ChevronDown 
} from 'lucide-react';
import { Language } from '../translations';

export interface AiChatDialogProps {
  language: Language;
  onSetKeyword: (keyword: string) => void;
  onSetFilter?: (filter: 'GOV' | 'PRIVATE' | 'NABH_Accredited' | 'DE-EMPANELED' | 'SUSPENDED' | 'BLACKLISTED') => void;
  onSetLocation?: (city: string) => void;
  onEmergency: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionTag?: string;
  isEmergency?: boolean;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') resolve(reader.result.split(',')[1]);
      else reject(new Error('Failed to convert blob to base64'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const AiChatDialog: React.FC<AiChatDialogProps> = ({
  language,
  onSetKeyword,
  onSetFilter,
  onSetLocation,
  onEmergency
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [aiProcessing, setAiProcessing] = useState<boolean>(false);

  const defaultGreeting = language === 'hi'
    ? 'नमस्ते! मैं आपका आयुष्मान एआई स्वास्थ्य सहायक हूँ। आप बोलकर या लिखकर अपने लक्षण, बीमारी या अस्पताल के बारे में पूछ सकते हैं।'
    : 'Namaste! I am your Ayushman AI Health Assistant. Speak or type your symptoms, disease, or hospital needs, and I will guide you to the right care.';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: defaultGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle Voice Recording
  const toggleRecording = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
    if (!apiKey) {
      alert("Missing Gemini API Key! Please add VITE_GEMINI_API_KEY to your .env file.");
      return;
    }

    if (isListening && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const rawMimeType = mediaRecorder.mimeType || 'audio/webm';
        const cleanMimeType = rawMimeType.split(';')[0];
        const audioBlob = new Blob(audioChunksRef.current, { type: cleanMimeType });
        const base64Audio = await blobToBase64(audioBlob);

        await processAudioWithGemini(base64Audio, cleanMimeType);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      alert(language === 'hi' ? 'माइक्रोफ़ोन की अनुमति नहीं मिली।' : 'Microphone permission denied.');
    }
  };

  // Shared processor for AI response
  const handleAiParsedResult = (parsedData: any, userPrompt?: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (parsedData.isEmergency) {
      onEmergency();
      const emergencyReply = language === 'hi' 
        ? '⚠️ गंभीर मेडिकल इमरजेंसी पहचानी गई! कृपया तुरंत 108 डायल करें।'
        : '⚠️ CRITICAL MEDICAL EMERGENCY DETECTED! Please call 108 immediately.';

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: emergencyReply,
          timestamp: nowTime,
          isEmergency: true
        }
      ]);
      return;
    }

    let actionSummaries: string[] = [];
    let responseText = '';

    if (parsedData.location && onSetLocation) {
      onSetLocation(parsedData.location);
      actionSummaries.push(language === 'hi' ? `स्थान: ${parsedData.location}` : `Location: ${parsedData.location}`);
    }

    if (parsedData.filter && onSetFilter) {
      onSetFilter(parsedData.filter);
      actionSummaries.push(language === 'hi' ? `फ़िल्टर: ${parsedData.filter}` : `Filter: ${parsedData.filter}`);
    }

    if (parsedData.keyword && parsedData.keyword.toLowerCase() !== 'unknown') {
      const cleanKeyword = parsedData.keyword.trim();
      onSetKeyword(cleanKeyword);
      actionSummaries.push(language === 'hi' ? `खोज: ${cleanKeyword}` : `Searched: ${cleanKeyword}`);

      responseText = language === 'hi'
        ? `मैंने "${cleanKeyword}" के लिए उपलब्ध अस्पतालों को फ़िल्टर कर दिया है।`
        : `I found matching PM-JAY hospitals for "${cleanKeyword}".`;
    } else {
      responseText = language === 'hi'
        ? 'मैंने आपके प्रश्न का विश्लेषण किया है। नीचे संबंधित अस्पताल सूची देखें।'
        : 'I have analyzed your request. Please review the relevant hospital listings below.';
    }

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: responseText,
        timestamp: nowTime,
        actionTag: actionSummaries.join(' • ')
      }
    ]);

    // TTS output
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(responseText);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Smart Local Fallback Triage (works even if offline or Gemini API key is 401/invalid)
  const performLocalFallbackTriage = (query: string) => {
    const qLower = query.toLowerCase();
    const isEmergency = /emergency|heart attack|chest pain|stroke|massive bleeding|severe accident|आपातकाल|सीने में दर्द|दौरा|दुर्घटना/i.test(qLower);

    let keyword = '';
    if (/heart|cardio|cardiology|chest|दिल|हार्ट/i.test(qLower)) keyword = 'Cardiology';
    else if (/bone|ortho|orthopedic|fracture|हड्डी/i.test(qLower)) keyword = 'Orthopaedics';
    else if (/eye|cataract|vision|नेत्र|आँख/i.test(qLower)) keyword = 'Ophthalmology';
    else if (/kidney|dialysis|renal|गुर्दा|किडनी/i.test(qLower)) keyword = 'Nephrology';
    else if (/cancer|chemo|tumor|oncology|कैंसर/i.test(qLower)) keyword = 'Oncology';
    else if (/child|pediatric|baby|infant|शिशु|बाल रोग/i.test(qLower)) keyword = 'Paediatrics';
    else if (/maternity|pregnancy|delivery|gynecology|प्रसूति/i.test(qLower)) keyword = 'Obstetrics';
    else if (/emergency|आपातकाल/i.test(qLower)) keyword = 'Emergency';
    else keyword = query.trim();

    let filter: 'GOV' | 'PRIVATE' | null = null;
    if (/government|govt|सरकारी/i.test(qLower)) filter = 'GOV';
    else if (/private|प्राइवेट/i.test(qLower)) filter = 'PRIVATE';

    return { isEmergency, keyword, filter, location: null };
  };

  // Process Audio
  const processAudioWithGemini = async (base64Audio: string, mimeType: string) => {
    setAiProcessing(true);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: language === 'hi' ? '🎤 [आवाज़ संदेश भेजा गया]' : '🎤 [Voice message sent]',
        timestamp: nowTime
      }
    ]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
      if (!apiKey || apiKey.startsWith('AQ.')) {
        throw new Error('API_KEY_INVALID_OR_UNAUTHORIZED');
      }

      const targetModel = 'models/gemini-flash-lite-latest';
      const prompt = `
        You are an intelligent medical triage and UI controller for an Indian PM-JAY hospital app.
        Analyze the user's spoken audio (which could be in Hindi, English, Hinglish, or regional dialects).

        TASKS:
        1. EMERGENCY CHECK: Check for life-threatening emergencies (heart attack, massive bleeding, stroke, collapse, severe accidents).
        2. KEYWORD: Extract medical specialty, organ, disease, surgery, or hospital name (e.g., Cardiology, Orthopedics, Apollo, AIIMS, Fortis). If none, output "".
        3. UI FILTER: "GOV", "PRIVATE", "NABH_Accredited", "SUSPENDED", "BLACKLISTED", "DE-EMPANELED", or null.
        4. LOCATION: City/district name or null.

        Output ONLY pure JSON:
        {
          "isEmergency": boolean,
          "keyword": string,
          "filter": string | null,
          "location": string | null
        }
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${targetModel}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType, data: base64Audio } }
            ]
          }]
        })
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('API_KEY_INVALID_OR_UNAUTHORIZED');
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '{}';
      const cleanJsonString = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJsonString);

      handleAiParsedResult(parsedData);
    } catch (error: any) {
      console.warn("AI Voice Processing note:", error?.message || error);
      const isKeyIssue = error?.message === 'API_KEY_INVALID_OR_UNAUTHORIZED';

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: isKeyIssue
            ? (language === 'hi' 
                ? '⚠️ जेमिनी API कुंजी अमान्य (401) है। कृपया .env फ़ाइल में AI Studio (AIzaSy...) कुंजी दर्ज करें। आप नीचे दिए गए बटनों या लिखकर भी खोज सकते हैं।' 
                : '⚠️ Gemini API key is unauthorized (401). Please add a valid Google AI Studio key (starts with AIzaSy...) in your .env file. You can also type or use the quick buttons below.')
            : (language === 'hi' 
                ? 'क्षमा करें, आवाज़ समझ नहीं आई। कृपया दोबारा प्रयास करें या लिखकर पूछें।' 
                : 'Could not process voice audio. Please try again or type your question.'),
          timestamp: nowTime
        }
      ]);
    } finally {
      setAiProcessing(false);
    }
  };

  // Process Typed Text
  const handleSendText = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    setInputText('');
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: query,
        timestamp: nowTime
      }
    ]);

    setAiProcessing(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
      
      // If no key or token starting with AQ. (not an AI studio key), use smart local triage directly
      if (!apiKey || apiKey.startsWith('AQ.')) {
        throw new Error('API_KEY_INVALID_OR_UNAUTHORIZED');
      }

      const targetModel = 'models/gemini-flash-lite-latest';
      const prompt = `
        You are an intelligent medical triage assistant for an Indian PM-JAY hospital search system.
        Analyze the user's typed message: "${query}".

        TASKS:
        1. EMERGENCY CHECK: true if critical life-threatening situation (chest pain, unconscious, heavy bleeding, accident).
        2. KEYWORD: Extract specific medical specialty, disease, organ, surgery, or hospital name (e.g. Cardiology, Orthopedics, Apollo, AIIMS).
        3. UI FILTER: "GOV", "PRIVATE", "NABH_Accredited", "SUSPENDED", "BLACKLISTED", "DE-EMPANELED", or null.
        4. LOCATION: City/district mentioned or null.

        Output ONLY pure JSON:
        {
          "isEmergency": boolean,
          "keyword": string,
          "filter": string | null,
          "location": string | null
        }
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${targetModel}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('API_KEY_INVALID_OR_UNAUTHORIZED');
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '{}';
      const cleanJsonString = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJsonString);

      handleAiParsedResult(parsedData, query);
    } catch (err: any) {
      console.warn("AI Text Processing fallback active:", err?.message || err);

      // Smart local triage fallback executes immediately!
      const fallbackData = performLocalFallbackTriage(query);
      handleAiParsedResult(fallbackData, query);

      // If key is invalid, append a polite reminder to user in chat
      if (err?.message === 'API_KEY_INVALID_OR_UNAUTHORIZED') {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: language === 'hi'
              ? '💡 सूचना: जेमिनी API key (401) अमान्य है, इसलिए स्मार्ट ऑफलाइन ट्राइएज का उपयोग किया गया है। पूर्ण AI सुविधाओं के लिए .env में मान्य AI Studio Key (AIzaSy...) जोड़ें।'
              : '💡 Note: Gemini API key returned 401 (Unauthorized), so smart offline triage was used. To enable full generative AI responses, add a valid Google AI Studio key (starts with AIzaSy...) to your .env file.',
            timestamp: nowTime
          }
        ]);
      }
    } finally {
      setAiProcessing(false);
    }
  };

  return (
    <>
      {/* Standalone Floating Action Button (FAB) */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 hover:from-blue-950 hover:to-indigo-950 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-blue-900/40 hover:scale-105 transition-all duration-200 cursor-pointer border border-blue-400/30"
        title={language === 'hi' ? 'आयुष्मान एआई सहायक' : 'Ayushman AI Assistant'}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-sky-300 animate-pulse" />
          </div>
          {isListening && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
          )}
        </div>

        <div className="text-left pr-1 hidden sm:block">
          <div className="text-xs font-black tracking-wide flex items-center gap-1 text-white">
            <span>Ayush AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-[10px] text-blue-200 font-medium">
            {language === 'hi' ? 'एआई स्वास्थ्य सहायक' : 'Medical Assistant'}
          </div>
        </div>
      </button>

      {/* AI Chat Dialog Box */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold flex items-center gap-1.5">
                  <span>{language === 'hi' ? 'आयुष्मान एआई सहायक' : 'Ayushman AI Assistant'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-blue-200 font-medium">
                  {language === 'hi' ? 'आवाज़ व चैट स्वास्थ्य परामर्श' : 'Voice & Chat Health Triage'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              title={language === 'hi' ? 'बंद करें' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Pill Row */}
          <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              type="button"
              onClick={() => { setInputText('Emergency heart chest pain'); }}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-rose-700 font-semibold border border-rose-200 shadow-2xs whitespace-nowrap cursor-pointer"
            >
              🚨 {language === 'hi' ? 'इमरजेंसी' : 'Emergency'}
            </button>
            <button
              type="button"
              onClick={() => { setInputText('Find heart hospital'); }}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-700 font-semibold border border-slate-200 shadow-2xs whitespace-nowrap cursor-pointer"
            >
              ❤️ {language === 'hi' ? 'हार्ट अस्पताल' : 'Heart Care'}
            </button>
            <button
              type="button"
              onClick={() => { setInputText('Bones orthopedic specialist'); }}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-700 font-semibold border border-slate-200 shadow-2xs whitespace-nowrap cursor-pointer"
            >
              🦴 {language === 'hi' ? 'हड्डी रोग' : 'Orthopedic'}
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4 text-sky-200" />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      msg.isEmergency 
                        ? 'bg-red-50 text-red-800 border-2 border-red-500 font-bold'
                        : msg.sender === 'user'
                        ? 'bg-blue-900 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    
                    {msg.actionTag && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{msg.actionTag}</span>
                      </div>
                    )}
                  </div>

                  <div className={`text-[9px] text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {aiProcessing && (
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50 p-2.5 rounded-xl border border-blue-200 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{language === 'hi' ? 'एआई विश्लेषण कर रहा है...' : 'Ayush AI is analyzing...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Bar Indicator */}
          {isListening && (
            <div className="bg-rose-50 border-t border-rose-200 px-4 py-2 flex items-center justify-between animate-pulse text-xs text-rose-700 font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                <span>{language === 'hi' ? 'सुन रहा हूँ... अपनी समस्या बोलें' : 'Listening... speak your symptoms'}</span>
              </div>
              <button
                type="button"
                onClick={toggleRecording}
                className="text-[11px] bg-rose-600 text-white px-2.5 py-0.5 rounded-md font-bold cursor-pointer"
              >
                {language === 'hi' ? 'रोकें' : 'Stop'}
              </button>
            </div>
          )}

          {/* Input Footer */}
          <form onSubmit={handleSendText} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder={language === 'hi' ? 'लक्षण या सवाल लिखें...' : 'Type symptoms or question...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isListening || aiProcessing}
              className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900 placeholder:text-slate-400"
            />

            {/* Voice Mic Button */}
            <button
              type="button"
              onClick={toggleRecording}
              disabled={aiProcessing}
              className={`p-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 ${
                isListening 
                  ? 'bg-rose-600 text-white shadow-md animate-pulse' 
                  : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white border border-slate-200'
              }`}
              title={language === 'hi' ? 'बोलकर खोजें' : 'Voice Input'}
            >
              {isListening ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isListening || aiProcessing}
              className="p-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
              title={language === 'hi' ? 'भेजें' : 'Send'}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
