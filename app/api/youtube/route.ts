import { NextResponse } from 'next/server';

export async function GET() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCYourChannelIDHere';

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch latest video from channel
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1&type=video`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from YouTube API');
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const latestVideo = data.items[0];
      return NextResponse.json({
        videoId: latestVideo.id.videoId,
        title: latestVideo.snippet.title,
        thumbnail: latestVideo.snippet.thumbnails.high.url,
        publishedAt: latestVideo.snippet.publishedAt,
      });
    }

    return NextResponse.json({ error: 'No videos found' }, { status: 404 });
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest video' },
      { status: 500 }
    );
  }
}
