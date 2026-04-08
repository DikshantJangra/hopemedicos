'use client';

import { useState, useRef, useEffect } from 'react';

const globalAudioRef: { current: HTMLAudioElement | null } = { current: null };

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);

  const stop = () => {
    if (globalAudioRef.current) {
      globalAudioRef.current.pause();
      globalAudioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentText(null);
  };

  const speak = async (text: string) => {
    // If already playing the SAME text, just stop
    if (isPlaying && currentText === text) {
      stop();
      return;
    }

    // Stop any current playback
    stop();

    setIsPlaying(true);
    setCurrentText(text);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('TTS API failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      globalAudioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentText(null);
        URL.revokeObjectURL(url);
      };

      audio.onerror = () => {
        // Fallback to native on audio playback error
        speakNative(text);
      };

      await audio.play();
    } catch (error) {
      console.warn('Neural TTS failed, falling back to native engine:', error);
      speakNative(text);
    }
  };

  const speakNative = (text: string) => {
    if (typeof window === 'undefined') return;
    
    // Stop any physical audio still lingering
    stop();
    
    setIsPlaying(true);
    setCurrentText(text);

    const ut = new SpeechSynthesisUtterance(text);
    const isHindi = /[\u0900-\u097F]/.test(text);
    
    // Pick best system voices
    const voices = window.speechSynthesis.getVoices();
    let voice = null;
    
    if (isHindi) {
      voice = voices.find(v => v.lang.startsWith('hi') && v.name.includes('Google')) ||
              voices.find(v => v.lang.startsWith('hi') && v.name.includes('Veena')) ||
              voices.find(v => v.lang.startsWith('hi'));
    } else {
      voice = voices.find(v => v.name.includes('Google US')) ||
              voices.find(v => v.name.includes('Samantha')) ||
              voices.find(v => v.lang.startsWith('en'));
    }

    if (voice) ut.voice = voice;
    ut.rate = isHindi ? 0.85 : 0.9;
    
    ut.onend = () => {
      setIsPlaying(false);
      setCurrentText(null);
    };
    
    ut.onerror = () => {
      setIsPlaying(false);
      setCurrentText(null);
    };

    window.speechSynthesis.speak(ut);
  };

  // Cleanup on unmount (only if this specific instance started the audio)
  useEffect(() => {
    return () => {
      // We don't necessarily want to stop global audio on local unmount 
      // unless we want to "stop when closing window".
    };
  }, []);

  return { speak, stop, isPlaying, currentText };
}
