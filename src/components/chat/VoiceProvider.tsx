'use client';

import { ConversationProvider } from '@elevenlabs/react';
import React from 'react';

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConversationProvider>
      {children}
    </ConversationProvider>
  );
}
