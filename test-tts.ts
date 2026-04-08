import { tts } from 'edge-tts';
import fs from 'node:fs';

async function test() {
    console.log("Starting TTS test...");
    try {
        const buffer = await tts("Hello, this is a test.", {
            voice: "en-US-JennyNeural"
        });
        console.log("TTS Success, buffer size:", buffer.length);
        fs.writeFileSync('test.mp3', buffer);
    } catch (err) {
        console.error("TTS Test Error:", err);
    }
}

test();
