/**
 * Utility functions for parsing and handling video URLs (YouTube, Vimeo)
 */

export interface VideoUrlInfo {
  isYouTube: boolean;
  isVimeo: boolean;
  videoId: string | null;
  canEmbed: boolean;
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, youtube.com/embed/, and more
 */
export function extractYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // youtu.be format: https://youtu.be/VIDEO_ID
    if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.slice(1).split('?')[0].split('/')[0];
      return videoId || null;
    }
    
    // youtube.com formats
    if (urlObj.hostname.includes('youtube.com')) {
      // youtube.com/watch?v=VIDEO_ID
      const vParam = urlObj.searchParams.get('v');
      if (vParam) {
        return vParam;
      }
      
      // youtube.com/embed/VIDEO_ID or youtube.com/shorts/VIDEO_ID or youtube.com/v/VIDEO_ID
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2 && (pathParts[0] === 'embed' || pathParts[0] === 'shorts' || pathParts[0] === 'v')) {
        return pathParts[1].split('?')[0] || null;
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Extract Vimeo video ID from Vimeo URL
 */
export function extractVimeoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('vimeo.com')) {
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      return pathParts[0] || null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Parse video URL and return information about the video
 */
export function parseVideoUrl(url: string): VideoUrlInfo {
  if (!url) {
    return { isYouTube: false, isVimeo: false, videoId: null, canEmbed: false };
  }

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isVimeo = url.includes('vimeo.com');
  
  let videoId: string | null = null;
  
  if (isYouTube) {
    videoId = extractYouTubeId(url);
  } else if (isVimeo) {
    videoId = extractVimeoId(url);
  }
  
  return {
    isYouTube,
    isVimeo,
    videoId,
    canEmbed: !!videoId && (isYouTube || isVimeo),
  };
}

/**
 * Get ordered list of YouTube thumbnail candidate URLs for fallback
 * Returns URLs from highest to lowest quality
 */
export function getYouTubeThumbnailCandidates(videoId: string): string[] {
  return [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`,
  ];
}

/**
 * Derive YouTube thumbnail URL from video ID (highest quality)
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Auto-derive thumbnail URL from video URL if possible
 */
export function deriveAutoThumbnailUrl(videoUrl: string): string | null {
  const info = parseVideoUrl(videoUrl);
  
  if (info.isYouTube && info.videoId) {
    return getYouTubeThumbnailUrl(info.videoId);
  }
  
  // Vimeo thumbnails require API call, so we don't auto-derive them
  return null;
}

/**
 * Get embeddable URL for video player
 */
export function getEmbedUrl(videoUrl: string): string | null {
  const info = parseVideoUrl(videoUrl);
  
  if (info.isYouTube && info.videoId) {
    return `https://www.youtube.com/embed/${info.videoId}`;
  }
  
  if (info.isVimeo && info.videoId) {
    return `https://player.vimeo.com/video/${info.videoId}`;
  }
  
  return null;
}
