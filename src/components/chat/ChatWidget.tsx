'use client';

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import ChatWindow from './ChatWindow';
import TalkWindow from './TalkWindow';
import { VoiceProvider } from './VoiceProvider';
import { useWebsiteData } from '@/context/WebsiteDataContext';

type Mode = 'chat' | 'talk' | null;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInitial, setShowInitial] = useState(true);
  const [isShimmering, setIsShimmering] = useState(true);
  const [hoveredMode, setHoveredMode] = useState<Mode>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { aiSettings } = useWebsiteData();

  useEffect(() => {
    setIsMounted(true);
    
    // Initial expansion effect
    const timer = setTimeout(() => {
      setShowInitial(false);
      setIsShimmering(false);
      setIsExpanded(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || aiSettings.enabled === false) {
    return null;
  }

  const handleModeSelect = (selectedMode: Mode) => {
    setIsExpanded(false); // Collapse after selection
    setMode(selectedMode);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Don't reset mode immediately - show icon first
    setTimeout(() => setMode(null), 300);
  };

  const toggleMode = () => {
    if (mode === 'chat') {
      setMode('talk');
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 300);
    } else if (mode === 'talk') {
      setMode('chat');
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 300);
    }
  };

  return (
    <VoiceProvider>
      {/* Floating AI Button - Center Bottom - Always Visible */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className={`transition-all duration-500 ease-out ${
            (isExpanded || showInitial || isShimmering) && !mode
              ? 'w-56 h-12'
              : mode && isOpen
                ? 'w-12 h-12'
                : mode && isExpanded
                  ? 'w-32 h-12'
                  : 'w-12 h-12'
          }`}
          onMouseEnter={() => !mode && setIsExpanded(true)}
          onMouseLeave={() => {
            setIsExpanded(false);
            setHoveredMode(null);
          }}
        >
          {/* Main Container */}
          <div className={`w-full h-full backdrop-blur-md bg-white/80 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-black/5 flex items-center justify-center overflow-hidden transition-all duration-500 ${
            isShimmering ? 'animate-pulse' : ''
          }`}>
            
            {/* Expanded State - Chat | Talk (Maya Style) */}
            {(isExpanded || showInitial || isShimmering) && !mode ? (
              <div className="w-full h-full flex items-center">
                <button
                  onClick={() => handleModeSelect('chat')}
                  onMouseEnter={() => setHoveredMode('chat')}
                  onMouseLeave={() => setHoveredMode(null)}
                  className={`h-full flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer ${
                    hoveredMode === 'chat' 
                      ? 'flex-[2] bg-black/5 text-black' 
                      : hoveredMode === 'talk'
                        ? 'flex-[0.5] text-black/20'
                        : 'flex-1 text-black/50'
                  }`}
                >
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
                    hoveredMode === 'talk' ? 'scale-90 opacity-40' : 'scale-100 opacity-100'
                  }`}>Chat</span>
                </button>

                <div className={`w-[1px] h-4 bg-black/10 transition-opacity duration-300 ${hoveredMode ? 'opacity-0' : 'opacity-100'}`} />

                <button
                  onClick={() => handleModeSelect('talk')}
                  onMouseEnter={() => setHoveredMode('talk')}
                  onMouseLeave={() => setHoveredMode(null)}
                  className={`h-full flex items-center justify-center gap-1 transition-all duration-500 ease-in-out cursor-pointer ${
                    hoveredMode === 'talk' 
                      ? 'flex-[2] bg-black/5 text-black' 
                      : hoveredMode === 'chat'
                        ? 'flex-[0.5] text-black/20'
                        : 'flex-1 text-black/50'
                  }`}
                >
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
                    hoveredMode === 'chat' ? 'scale-90 opacity-40' : 'scale-100 opacity-100'
                  }`}>Talk</span>
                  <span className="text-[8px] px-1 py-0.5 bg-[#f58518] text-white rounded font-bold">BETA</span>
                </button>
              </div>
            ) : mode && isOpen ? (
              /* Close Button State */
              <button
                onClick={() => {
                  setIsOpen(false);
                  setMode(null);
                  setIsExpanded(false);
                }}
                className="w-full h-full flex items-center justify-center hover:bg-black/5 transition-colors group"
                aria-label="Close"
              >
                <FaTimes className="w-4 h-4 text-black/40 group-hover:text-black group-hover:rotate-90 transition-all duration-300" />
              </button>
            ) : mode ? (
              /* Selected Mode (But Window Closed) - Icon + Text on hover */
              <button
                onClick={() => setIsOpen(true)}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className="w-full h-full flex items-center justify-center gap-2 cursor-pointer"
              >
                {mode === 'chat' ? (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V6z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 3v14M10 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span className={`text-[10px] uppercase tracking-[0.2em] font-medium overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-w-[60px] opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0'
                }`}>
                  {mode === 'chat' ? 'Chat' : 'Talk'}
                </span>
              </button>
            ) : (
              /* Idle Icon */
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-black">
                  <path d="M2 10h2M6 7v6M10 5v10M14 7v6M18 10h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && mode === 'chat' && <ChatWindow onClose={handleClose} />}
      
      {/* Talk Window */}
      {isOpen && mode === 'talk' && <TalkWindow onClose={handleClose} />}
    </VoiceProvider>
  );
}
