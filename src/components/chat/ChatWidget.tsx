'use client';

import { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ChatButton 
        onClick={() => setIsOpen(!isOpen)} 
        isOpen={isOpen}
      />
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}
