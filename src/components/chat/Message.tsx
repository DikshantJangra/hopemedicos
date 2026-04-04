'use client';

import { AiOutlineRobot, AiOutlineUser } from 'react-icons/ai';
import type { Message as MessageType } from '@/types/chat';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border ${
        isUser ? 'bg-gray-50 border-gray-100 text-gray-400' : 'bg-white border-gray-100 text-brand'
      }`}>
        {isUser ? <AiOutlineUser className="w-4 h-4" /> : <AiOutlineRobot className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-2 rounded-xl text-sm leading-relaxed ${
          isUser 
            ? 'bg-brand text-white' 
            : 'bg-gray-50 text-gray-800'
        }`}>
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
        
        <div className="mt-1 px-1">
          <span className="text-[9px] text-gray-300 font-medium uppercase">{time}</span>
        </div>
      </div>
    </div>
  );
}
