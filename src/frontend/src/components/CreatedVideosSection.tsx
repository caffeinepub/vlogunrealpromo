import { useState } from 'react';
import { Section } from './Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Play } from 'lucide-react';
import { useGetPortfolio } from '../hooks/usePortfolio';
import { CreatedVideoViewer } from './CreatedVideoViewer';
import { CreatedVideosAdminPanel } from './CreatedVideosAdminPanel';
import { VideoThumbnail } from './VideoThumbnail';
import type { PromoVideo } from '../backend';

export function CreatedVideosSection() {
  const { data: portfolioItems, isLoading, isError } = useGetPortfolio();
  const [selectedVideo, setSelectedVideo] = useState<PromoVideo | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleCardClick = (video: PromoVideo) => {
    setSelectedVideo(video);
    setViewerOpen(true);
  };

  return (
    <Section id="portfolio" className="bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Created Videos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of professionally crafted promotional videos
          </p>
        </div>

        <CreatedVideosAdminPanel portfolioItems={portfolioItems || []} />

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load portfolio items. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && portfolioItems && portfolioItems.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Videos Yet</AlertTitle>
            <AlertDescription>
              No portfolio items have been added yet. Check back soon!
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && portfolioItems && portfolioItems.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((video) => (
              <Card
                key={video.referenceId.toString()}
                className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group cursor-pointer"
                onClick={() => handleCardClick(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <VideoThumbnail
                    thumbnailUrl={video.thumbnailUrl}
                    videoUrl={video.url}
                    alt={video.title}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-4 shadow-glow">
                      <Play className="h-8 w-8" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{video.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <CreatedVideoViewer
          video={selectedVideo}
          open={viewerOpen}
          onOpenChange={setViewerOpen}
        />
      </div>
    </Section>
  );
}
