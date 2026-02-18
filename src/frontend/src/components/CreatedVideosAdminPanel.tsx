import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useCreatePortfolioItem, useDeletePortfolioItem, useIsCallerAdmin } from '../hooks/usePortfolioAdmin';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import type { PromoVideo } from '../backend';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { VideoUrlPreview } from './VideoUrlPreview';
import { deriveAutoThumbnailUrl, parseVideoUrl } from '../utils/videoUrls';

interface CreatedVideosAdminPanelProps {
  portfolioItems: PromoVideo[];
}

export function CreatedVideosAdminPanel({ portfolioItems }: CreatedVideosAdminPanelProps) {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const createMutation = useCreatePortfolioItem();
  const deleteMutation = useDeletePortfolioItem();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailAutoFilled, setThumbnailAutoFilled] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<bigint | null>(null);

  // Auto-fill thumbnail URL when video URL changes (YouTube only)
  useEffect(() => {
    if (!videoUrl) {
      if (thumbnailAutoFilled) {
        setThumbnailUrl('');
        setThumbnailAutoFilled(false);
      }
      return;
    }

    const autoThumbnail = deriveAutoThumbnailUrl(videoUrl);
    
    if (autoThumbnail) {
      // Only auto-fill if the current thumbnail was also auto-filled or empty
      if (thumbnailAutoFilled || !thumbnailUrl) {
        setThumbnailUrl(autoThumbnail);
        setThumbnailAutoFilled(true);
      }
    } else {
      // Not a YouTube URL, clear auto-fill flag
      if (thumbnailAutoFilled) {
        setThumbnailAutoFilled(false);
      }
    }
  }, [videoUrl]);

  // Track manual edits to thumbnail URL
  const handleThumbnailChange = (value: string) => {
    setThumbnailUrl(value);
    setThumbnailAutoFilled(false);
  };

  if (!identity || isAdminLoading) return null;
  if (!isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missingFields: string[] = [];
    
    if (!title.trim()) missingFields.push('Title');
    if (!description.trim()) missingFields.push('Description');
    if (!videoUrl.trim()) missingFields.push('Video URL');
    
    // Thumbnail is required only for non-YouTube URLs
    const videoInfo = parseVideoUrl(videoUrl);
    const thumbnailRequired = !videoInfo.isYouTube || !videoInfo.videoId;
    
    if (thumbnailRequired && !thumbnailUrl.trim()) {
      missingFields.push('Thumbnail URL');
    }

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    const referenceId = BigInt(Date.now());

    try {
      await createMutation.mutateAsync({
        referenceId,
        title: title.trim(),
        description: description.trim(),
        url: videoUrl.trim(),
        thumbnailUrl: thumbnailUrl.trim(),
      });

      toast.success('Portfolio item created successfully');
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setThumbnailAutoFilled(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create portfolio item');
    }
  };

  const handleDelete = async () => {
    if (!deleteItemId) return;

    try {
      await deleteMutation.mutateAsync(deleteItemId);
      toast.success('Portfolio item deleted successfully');
      setDeleteItemId(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete portfolio item');
    }
  };

  const videoInfo = parseVideoUrl(videoUrl);
  const thumbnailRequired = !videoInfo.isYouTube || !videoInfo.videoId;

  return (
    <>
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Admin Panel - Add Created Video
          </CardTitle>
          <CardDescription>
            Add a new video to your portfolio. YouTube thumbnails are auto-filled from the video URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Luxury Hotel Resort"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL *</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">
                Thumbnail URL {thumbnailRequired && '*'}
                {thumbnailAutoFilled && (
                  <span className="ml-2 text-xs text-muted-foreground">(auto-filled from YouTube)</span>
                )}
              </Label>
              <Input
                id="thumbnailUrl"
                type="url"
                value={thumbnailUrl}
                onChange={(e) => handleThumbnailChange(e.target.value)}
                placeholder={videoInfo.isYouTube ? "Auto-filled for YouTube videos" : "https://example.com/thumbnail.jpg"}
              />
              {!thumbnailRequired && (
                <p className="text-xs text-muted-foreground">
                  Optional for YouTube videos (auto-derived if not provided)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the video..."
                rows={3}
              />
            </div>

            {videoUrl && (
              <VideoUrlPreview videoUrl={videoUrl} thumbnailUrl={thumbnailUrl} />
            )}

            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Portfolio Item
                </>
              )}
            </Button>
          </form>

          {portfolioItems.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-semibold mb-3">Manage Existing Items</h3>
              <div className="space-y-2">
                {portfolioItems.map((item) => (
                  <div
                    key={item.referenceId.toString()}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteItemId(item.referenceId)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteItemId} onOpenChange={(open) => !open && setDeleteItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Portfolio Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this portfolio item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
