import { useState, useEffect } from 'react';
import { parseVideoUrl, getYouTubeThumbnailCandidates } from '../utils/videoUrls';

interface VideoThumbnailProps {
  thumbnailUrl: string;
  videoUrl: string;
  alt: string;
  className?: string;
}

export function VideoThumbnail({ thumbnailUrl, videoUrl, alt, className = '' }: VideoThumbnailProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(thumbnailUrl);
  const [candidateUrls, setCandidateUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    // Reset state when thumbnailUrl or videoUrl changes
    setCurrentSrc(thumbnailUrl);
    setCurrentIndex(0);
    setShowPlaceholder(false);

    // Prepare fallback candidates if it's a YouTube video
    const info = parseVideoUrl(videoUrl);
    if (info.isYouTube && info.videoId) {
      const candidates = getYouTubeThumbnailCandidates(info.videoId);
      setCandidateUrls(candidates);
    } else {
      setCandidateUrls([]);
    }
  }, [thumbnailUrl, videoUrl]);

  const handleImageError = () => {
    // Try next candidate URL if available
    if (candidateUrls.length > 0 && currentIndex < candidateUrls.length) {
      const nextUrl = candidateUrls[currentIndex];
      setCurrentSrc(nextUrl);
      setCurrentIndex(currentIndex + 1);
    } else {
      // All candidates exhausted, show placeholder
      setShowPlaceholder(true);
    }
  };

  if (showPlaceholder) {
    return (
      <div className={`w-full h-full bg-muted flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <svg
            className="mx-auto h-12 w-12 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-muted-foreground">Video thumbnail</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={handleImageError}
    />
  );
}
