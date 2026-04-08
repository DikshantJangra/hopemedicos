'use client';

import { useEffect, useRef, useState } from 'react';
import { FaTimes, FaMicrophone, FaStop } from 'react-icons/fa';
import { useWebsiteData } from '@/context/WebsiteDataContext';
import { useTTS } from '@/hooks/useTTS';

interface TalkWindowProps {
  onClose: () => void;
}

type TalkState = 'idle' | 'listening' | 'processing' | 'speaking';

export default function TalkWindow({ onClose }: TalkWindowProps) {
  const { shopSettings } = useWebsiteData();
  const [state, setState] = useState<TalkState>('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; 
        recognition.continuous = true; 
        recognition.interimResults = true; 

        let silenceTimer: NodeJS.Timeout;

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          
          if (currentTranscript.trim()) {
            setTranscript(currentTranscript);
            
            // Intelligent silence detection: wait for 2 seconds of silence before auto-sending
            clearTimeout(silenceTimer);
            silenceTimer = setTimeout(() => {
              recognition.stop();
              handleSendToLLM(currentTranscript);
            }, 2000);
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error !== 'network' && event.error !== 'aborted' && event.error !== 'no-speech') {
            console.error('Speech recognition error:', event.error);
            setError('Could not understand. Please try again.');
          }
          if (event.error === 'no-speech') {
            recognition.stop();
            setState('idle');
          }
        };

        recognition.onend = () => {
          if (state === 'listening' && !transcript) {
            setState('idle');
          }
        };

        recognitionRef.current = recognition;
      } else {
        setError('Speech recognition not supported in this browser.');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []); // Run only once on mount

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setResponse('');
      setError('');
      setState('listening');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setState('idle');
    }
  };

  const { speak, stop, isPlaying } = useTTS();

  const handleSendToLLM = async (text: string) => {
    setState('processing');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: text }
          ],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('API Error Response:', text);
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.content);
      speak(data.content);
    } catch (error) {
      console.error('LLM error:', error);
      setError('Failed to get response. Please try again.');
      setState('idle');
    }
  };

  useEffect(() => {
    if (isPlaying) {
      setState('speaking');
    } else if (state === 'speaking') {
      setState('idle');
    }
  }, [isPlaying]);

  const handleStop = () => {
    if (state === 'listening') {
      stopListening();
    } else {
      stop();
    }
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[380px] h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden border border-black/5 animate-slide-up">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-black/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              className="text-black"
            >
              <path
                d="M3 10h2M7 7v6M11 5v10M15 7v6M17 10h2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-sm text-black leading-none">
              {shopSettings.siteName || "Hope Medicos"} AI
            </h3>
            <p className="text-[10px] text-black/40 uppercase tracking-[0.12em] mt-1">Voice Mode</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-black/5 rounded-full text-black/40 hover:text-black transition-colors"
          aria-label="Close talk mode"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Waveform / Status Indicator */}
        <div className="mb-8">
          {state === 'listening' && (
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-black rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 40}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s'
                  }}
                />
              ))}
            </div>
          )}
          
          {state === 'processing' && (
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce"></div>
            </div>
          )}

          {state === 'speaking' && (
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-black rounded-full animate-pulse"
                  style={{
                    height: `${30 + Math.random() * 30}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          )}

          {state === 'idle' && (
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center">
              <FaMicrophone className="w-6 h-6 text-black/40" />
            </div>
          )}
        </div>

        {/* Status Text */}
        <div className="text-center mb-8">
          {state === 'listening' && (
            <p className="text-sm text-black font-medium">Listening...</p>
          )}
          {state === 'processing' && (
            <p className="text-sm text-black font-medium">Processing...</p>
          )}
          {state === 'speaking' && (
            <p className="text-sm text-black font-medium">Speaking...</p>
          )}
          {state === 'idle' && (
            <p className="text-sm text-black/60">Tap to speak</p>
          )}
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="w-full mb-4 p-4 bg-black/5 rounded-2xl">
            <p className="text-xs uppercase tracking-[0.12em] text-black/40 mb-2">You said:</p>
            <p className="text-sm text-black">{transcript}</p>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="w-full mb-4 p-4 bg-black text-white rounded-2xl">
            <p className="text-xs uppercase tracking-[0.12em] text-white/60 mb-2">AI Response:</p>
            <p className="text-sm">{response}</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="w-full mb-4 p-4 bg-red-50 rounded-2xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Control Button */}
        <button
          onClick={state === 'listening' ? stopListening : state === 'speaking' ? handleStop : startListening}
          disabled={state === 'processing'}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl ${
            state === 'listening' || state === 'speaking'
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-[#f58518] hover:bg-[#e07615] text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
        >
          {state === 'listening' || state === 'speaking' ? (
            <FaStop className="w-6 h-6" />
          ) : (
            <FaMicrophone className="w-7 h-7" />
          )}
        </button>

        {/* Hint Text */}
        <p className="text-[10px] text-black/30 mt-4 text-center uppercase tracking-[0.12em]">
          {state === 'idle' ? 'Press and speak' : state === 'listening' ? 'Press to stop' : state === 'speaking' ? 'Press to stop speaking' : 'Processing...'}
        </p>
      </div>

      {/* Language Selector (Optional) */}
      <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-black/5">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              if (recognitionRef.current) recognitionRef.current.lang = 'en-US';
            }}
            className="px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-full text-[10px] uppercase tracking-[0.12em] font-normal text-black/60 hover:text-black transition-all"
          >
            English
          </button>
          <button
            onClick={() => {
              if (recognitionRef.current) recognitionRef.current.lang = 'hi-IN';
            }}
            className="px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-full text-[10px] uppercase tracking-[0.12em] font-normal text-black/60 hover:text-black transition-all"
          >
            हिंदी
          </button>
        </div>
      </div>
    </div>
  );
}
