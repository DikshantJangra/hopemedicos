'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  onSend, 
  disabled = false,
  placeholder = 'Message...'
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
    <div className="flex gap-2 items-end bg-black/5 p-2 rounded-full border border-black/5 focus-within:bg-white focus-within:border-black/10 transition-all duration-300">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 px-4 py-2 bg-transparent resize-none focus:outline-none disabled:cursor-not-allowed text-sm text-black placeholder:text-black/40"
        style={{ maxHeight: '120px' }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="flex-shrink-0 w-8 h-8 bg-[#f58518] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#e07615] hover:scale-105 disabled:opacity-30 disabled:scale-95 active:scale-90 shadow-md hover:shadow-lg"
        aria-label="Send message"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10l14-7-7 14-2-7-5-0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
