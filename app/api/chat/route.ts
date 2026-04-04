// API route for chat functionality

import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/utils/aiService';
import type { Message } from '@/types/chat';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Call AI service with fallback logic
    const response = await aiService.chat(messages);

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again.',
        provider: 'error',
        success: false,
      },
      { status: 500 }
    );
  }
}
