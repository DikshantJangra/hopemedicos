'use client';

import { useState, KeyboardEvent } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  onSend, 
  disabled = false,
  placeholder = 'Message Hope AI...'
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2.5 items-end bg-[#f2f2f2] p-2.5 rounded-[1.5rem] border border-gray-200/50 shadow-inner group focus-within:bg-white focus-within:shadow-md transition-all duration-300">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 px-4 py-3 bg-transparent resize-none focus:outline-none disabled:cursor-not-allowed text-[15px] font-medium text-gray-700 placeholder:text-gray-400"
        style={{ maxHeight: '120px' }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="flex-shrink-0 w-11 h-11 bg-brand text-white rounded-[1rem] flex items-center justify-center transition-all duration-300 shadow-brand/20 hover:shadow-brand/40 disabled:opacity-30 disabled:grayscale disabled:scale-95 group-focus-within:bg-brand active:scale-90"
        aria-label="Send message"
      >
        <FaPaperPlane className="w-5 h-5" />
      </button>
    </div>
  );
}
