export function youtubeVideoLinkFactory(videoId: string): string | null {
  if (!videoId) {
    return null;
  }

  return 'https://www.youtube.com/watch?v=' + videoId;
}
