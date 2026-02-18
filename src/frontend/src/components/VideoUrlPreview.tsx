import { parseVideoUrl, getEmbedUrl } from '../utils/videoUrls';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { VideoThumbnail } from './VideoThumbnail';

interface VideoUrlPreviewProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export function VideoUrlPreview({ videoUrl, thumbnailUrl }: VideoUrlPreviewProps) {
  if (!videoUrl) {
    return null;
  }

  const info = parseVideoUrl(videoUrl);
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Card className="border-muted">
      <CardContent className="p-4">
        <p className="text-sm font-medium mb-3 text-muted-foreground">Preview</p>
        
        {info.canEmbed && embedUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video preview"
            />
          </div>
        ) : (
          <div className="space-y-3">
            {thumbnailUrl ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <VideoThumbnail
                  thumbnailUrl={thumbnailUrl}
                  videoUrl={videoUrl}
                  alt="Video thumbnail preview"
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                <p className="text-sm text-muted-foreground">No thumbnail provided</p>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <span>Video will open in external player</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
