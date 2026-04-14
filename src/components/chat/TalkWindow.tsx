'use client';

import { useEffect, useCallback, useState } from 'react';
import { FaTimes, FaMicrophone, FaStop } from 'react-icons/fa';
import { useWebsiteData } from '@/context/WebsiteDataContext';
import { useConversation } from '@elevenlabs/react';

interface TalkWindowProps {
  onClose: () => void;
}

export default function TalkWindow({ onClose }: TalkWindowProps) {
  const { shopSettings } = useWebsiteData();
  const [error, setError] = useState('');
  
  const conversation = useConversation({
    onConnect: () => {
      console.log('ElevenLabs Connected');
      setError('');
    },
    onDisconnect: () => {
      console.log('ElevenLabs Disconnected');
    },
    onError: (err) => {
      console.error('ElevenLabs Error:', err);
      setError('Connection error. Please check your API key/Agent ID.');
    },
    onMessage: (message) => {
      console.log('ElevenLabs Message:', message);
    },
  });

  const { status, startSession, endSession } = conversation;

  const handleStart = useCallback(async () => {
    try {
      const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
      if (!agentId || agentId === 'your_elevenlabs_agent_id_here') {
        setError('Agent ID not configured. Please add NEXT_PUBLIC_ELEVENLABS_AGENT_ID to your .env file.');
        return;
      }

      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      await startSession({
        agentId: agentId,
      });
    } catch (err: any) {
      console.error('Failed to start conversation:', err);
      setError(err.message || 'Failed to access microphone or connect to AI.');
    }
  }, [startSession]);

  const handleStop = useCallback(async () => {
    await endSession();
  }, [endSession]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (status === 'connected') {
        endSession();
      }
    };
  }, [status, endSession]);

  const isConnecting = status === 'connecting';
  const isConnected = status === 'connected';

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[380px] h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden border border-black/5 animate-slide-up">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-black/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-black">
                <path d="M3 10h2M7 7v6M11 5v10M15 7v6M17 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            {isConnected && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm text-black leading-none">
              {shopSettings.siteName || "Hope Medicos"} AI
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] text-black/40 uppercase tracking-[0.12em]">Live Talk</p>
              <span className="text-[8px] px-1 py-0.5 bg-black text-white rounded-sm font-bold tracking-widest">BETA</span>
            </div>
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
        <div className="mb-12 h-20 flex items-center justify-center">
          {isConnected ? (
            <div className="flex items-center gap-1.5 h-12">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-black rounded-full animate-[voice-wave_1s_ease-in-out_infinite]"
                  style={{
                    height: '20%',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ) : isConnecting ? (
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce"></div>
            </div>
          ) : (
            <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center scale-110">
              <FaMicrophone className="w-8 h-8 text-black/20" />
            </div>
          )}
        </div>

        {/* Status Text */}
        <div className="text-center mb-10">
          <h4 className="text-xl font-medium text-black mb-2">
            {isConnected ? "I'm Listening" : isConnecting ? 'Connecting...' : 'Ready to Talk?'}
          </h4>
          <p className="text-sm text-black/40 max-w-[200px] mx-auto">
            {isConnected 
              ? "Go ahead, ask me anything about our products or services." 
              : isConnecting 
                ? 'Setting up an encrypted audio channel...' 
                : 'Experience the next generation of AI support with real-time voice.'}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="w-full mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl animate-shake">
            <p className="text-xs text-red-600 text-center font-medium leading-relaxed">{error}</p>
          </div>
        )}

        {/* Control Button */}
        <button
          onClick={isConnected ? handleStop : handleStart}
          disabled={isConnecting}
          className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-xl hover:shadow-2xl relative group ${
            isConnected
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-black hover:bg-zinc-800 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isConnected ? (
            <>
              <FaStop className="w-8 h-8 mb-1" />
              <span className="text-[9px] uppercase font-bold tracking-widest">End</span>
            </>
          ) : (
            <>
              <FaMicrophone className="w-9 h-9 mb-1" />
              <span className="text-[9px] uppercase font-bold tracking-widest">{isConnecting ? '...' : 'Start'}</span>
            </>
          )}
          
          {/* Outer Ring Animation */}
          {isConnected && (
            <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-[ping_2s_infinite] opacity-20" />
          )}
        </button>

        {/* Hint Text */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-medium">
            Powered by ElevenLabs
          </p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-300">
            <span className="flex items-center gap-1"><div className="w-1 h-1 bg-current rounded-full"/> Low Latency</span>
            <span className="flex items-center gap-1"><div className="w-1 h-1 bg-current rounded-full"/> HD Voice</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes voice-wave {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
