import { useTTS } from '@/hooks/useTTS';
import type { Message as MessageType } from '@/types/chat';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const { speak, stop, isPlaying, currentText } = useTTS();
  const isThisPlaying = isPlaying && currentText === message.content;
  
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleListen = () => {
    if (isThisPlaying) {
      stop();
    } else {
      speak(message.content);
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
        isUser ? 'bg-[#f58518] text-white' : 'bg-black/5 text-black'
      }`}>
        {isUser ? (
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="7" r="3" />
            <path d="M4 18c0-3.5 2.5-6 6-6s6 2.5 6 6" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 10h2M7 7v6M11 5v10M15 7v6M17 10h2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-[#f58518] text-white rounded-br-none'
            : 'bg-black/5 text-black rounded-bl-none'
        }`}>
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        <div className="mt-1 px-1 flex items-center gap-2">
          <span className="text-[9px] text-black/30 uppercase tracking-[0.1em]">{time}</span>
          
          {/* Listen button for AI messages */}
          {!isUser && (
            <>
              <span className="text-black/20">•</span>
              <button
                onClick={handleListen}
                className="text-[9px] text-[#f58518] hover:text-[#e07615] uppercase tracking-[0.1em] flex items-center gap-1 transition-colors font-medium"
              >
                {isThisPlaying ? (
                  <>
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                      <rect x="5" y="4" width="4" height="12" rx="1" />
                      <rect x="11" y="4" width="4" height="12" rx="1" />
                    </svg>
                    Stop
                  </>
                ) : (
                  <>
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 4l10 6-10 6V4z" />
                    </svg>
                    Listen
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

