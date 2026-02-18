import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { PromoVideo } from '../backend';
import { getEmbedUrl } from '../utils/videoUrls';
import { VideoThumbnail } from './VideoThumbnail';

interface CreatedVideoViewerProps {
  video: PromoVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatedVideoViewer({ video, open, onOpenChange }: CreatedVideoViewerProps) {
  if (!video) return null;

  const embedUrl = getEmbedUrl(video.url);
  const canEmbed = !!embedUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{video.title}</DialogTitle>
          <DialogDescription>{video.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {canEmbed ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <VideoThumbnail
                  thumbnailUrl={video.thumbnailUrl}
                  videoUrl={video.url}
                  alt={video.title}
                />
              </div>
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  This video cannot be embedded directly. Click the button below to watch it in a new tab.
                </p>
                <Button asChild className="w-full" size="lg">
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Video in New Tab
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
