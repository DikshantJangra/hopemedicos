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
  
  // Set initial message from aiSettings if available, or fallback
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: aiSettings.welcomeMessage || `Hello there! 👋 I'm ${shopSettings.siteName || 'Hope Medicos'} AI, your personal healthcare assistant. How can I help you today?`,
        timestamp: Date.now(),
        provider: 'system',
      },
    ]);
  }, [aiSettings.welcomeMessage, shopSettings.siteName]);
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
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Chat history cleared. How else can I assist you?',
        timestamp: Date.now(),
        provider: 'system',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[580px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
            <AiOutlineRobot className="text-xl text-brand" />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 leading-none">
                {shopSettings.siteName || "Hope Medicos"} AI
            </h3>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight mt-1">Pharmacy Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <FaTrash className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"
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
        className="flex-1 overflow-y-auto p-4 bg-white"
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex gap-2.5 items-end opacity-70">
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                <AiOutlineRobot className="text-brand text-sm" />
              </div>
              <div className="bg-gray-50 px-3 py-2 rounded-xl rounded-bl-none border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-50">
        <ChatInput 
          onSend={handleSend} 
          disabled={isLoading}
          placeholder={isLoading ? 'Thinking...' : 'How can I help you?'}
        />
        <p className="text-[10px] text-gray-300 mt-2 text-center">
          AI Assistant • Hope Medicos
        </p>
      </div>
    </div>
  );
}
