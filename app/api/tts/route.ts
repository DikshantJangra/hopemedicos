import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * ELEVENLABS ENGINE (Premium)
 * Uses ElevenLabs API for high-quality voice synthesis.
 */
async function generateElevenLabsAudio(text: string): Promise<Buffer> {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  const VOICE_ID = 'JBFqnCBv7St9H0tZ33Cg'; // Default premium female voice (Aria)

  if (!ELEVENLABS_API_KEY) {
    throw new Error('ElevenLabs API key missing');
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY,
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs API failed: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * FALLBACK GOOGLE ENGINE (Zero-Key)
 */
async function generateGoogleAudio(text: string, lang: string): Promise<Buffer> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      'Referer': 'https://translate.google.com/',
    }
  });

  if (!response.ok) {
    throw new Error(`Google TTS failed: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const isHindi = /[\u0900-\u097F]/.test(text);
    const lang = isHindi ? "hi" : "en-US";

    try {
      if (process.env.ELEVENLABS_API_KEY) {
        console.log(`[TTS] ElevenLabs Engine: Generating ${isHindi ? 'Hindi' : 'English'} voice...`);
        const audioBuffer = await generateElevenLabsAudio(text);
        return new NextResponse(new Uint8Array(audioBuffer), {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'no-cache',
            'Content-Length': audioBuffer.length.toString(),
          },
        });
      }
    } catch (e) {
      console.warn('[TTS] ElevenLabs failed, falling back to Google:', e);
    }

    // Fallback to Google
    console.log(`[TTS] Fallback Engine: Generating ${isHindi ? 'Hindi' : 'English'} voice...`);
    const audioBuffer = await generateGoogleAudio(text, lang);

    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
        'Content-Length': audioBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error('[TTS ERROR]:', error.message || error);
    return NextResponse.json(
      { error: 'TTS Unavailable', message: error.message }, 
      { status: 503 }
    );
  }
}
