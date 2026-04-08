'use client';

import { useEffect, useRef, useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { AiOutlineRobot } from 'react-icons/ai';
import Message from './Message';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import type { Message as MessageType } from '@/types/chat';

import { useWebsiteData } from '@/context/WebsiteDataContext';

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { aiSettings, shopSettings } = useWebsiteData();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Set initial message from aiSettings if available, or fallback
  useEffect(() => {
    // Only initialize once
    if (!hasInitialized) {
      const savedMessages = sessionStorage.getItem('chatMessages');
      
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          // If parsing fails, set default message
          setMessages([
            {
              id: '1',
              role: 'assistant',
              content: aiSettings.welcomeMessage || `Hello there! 👋 I'm ${shopSettings.siteName || 'Hope Medicos'} AI, your personal healthcare assistant. How can I help you today?`,
              timestamp: Date.now(),
              provider: 'system',
            },
          ]);
        }
      } else {
        setMessages([
          {
            id: '1',
            role: 'assistant',
            content: aiSettings.welcomeMessage || `Hello there! 👋 I'm ${shopSettings.siteName || 'Hope Medicos'} AI, your personal healthcare assistant. How can I help you today?`,
            timestamp: Date.now(),
            provider: 'system',
          },
        ]);
      }
      
      setHasInitialized(true);
    }
  }, [aiSettings.welcomeMessage, shopSettings.siteName, hasInitialized]);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    if (hasInitialized && messages.length > 0) {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages, hasInitialized]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Chat API Error:', errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: Date.now(),
        provider: data.provider,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: Date.now(),
        provider: 'error',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    if (!isLoading) {
      handleSend(prompt);
    }
  };

  const handleClearChat = () => {
    const newMessages: MessageType[] = [
      {
        id: '1',
        role: 'assistant',
        content: 'Chat history cleared. How else can I assist you?',
        timestamp: Date.now(),
        provider: 'system',
      },
    ];
    setMessages(newMessages);
    sessionStorage.setItem('chatMessages', JSON.stringify(newMessages));
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
            <p className="text-[10px] text-black/40 uppercase tracking-[0.12em] mt-1">Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="p-2 hover:bg-black/5 rounded-full text-black/40 hover:text-black transition-colors"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <FaTrash className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full text-black/40 hover:text-black transition-colors"
            aria-label="Close chat"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions onActionClick={handleQuickAction} disabled={isLoading} />

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-transparent custom-scrollbar"
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-end opacity-70">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-black/5 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
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
              <div className="bg-black/5 px-3 py-2 rounded-xl rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-black/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-black/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-black/30 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-black/5">
        <ChatInput
          onSend={handleSend}
          disabled={isLoading}
          placeholder={isLoading ? 'Thinking...' : 'How can I help you?'}
        />
        <p className="text-[10px] text-black/30 mt-2 text-center uppercase tracking-[0.12em]">
          AI Assistant
        </p>
      </div>
    </div>
  );
}
