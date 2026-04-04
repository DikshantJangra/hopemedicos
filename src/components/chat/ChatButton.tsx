'use client';

import { useState } from 'react';
import { AiOutlineRobot } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { useWebsiteData } from '@/context/WebsiteDataContext';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
}

export default function ChatButton({ onClick, isOpen, unreadCount = 0 }: ChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { aiSettings, shopSettings, loading } = useWebsiteData();

  if (loading || aiSettings.enabled === false) return null;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 ${isOpen ? 'bg-gray-100 text-gray-600' : 'bg-white text-brand'} rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 active:scale-95`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <FaTimes className="w-5 h-5" />
      ) : (
        <>
          <AiOutlineRobot className="w-7 h-7" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </>
      )}
      
      {!isOpen && isHovered && (
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-md">
          Ask {shopSettings.siteName || "Hope Medicos"} AI
        </div>
      )}
    </button>
  );
}
