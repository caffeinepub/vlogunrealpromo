import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface RequestConfirmationProps {
  referenceId: string;
}

export function RequestConfirmation({ referenceId }: RequestConfirmationProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(referenceId);
    toast.success('Reference ID copied to clipboard');
  };

  return (
    <Card className="border-primary/50 shadow-glow-sm">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="text-primary" size={32} />
          </div>
        </div>
        <CardTitle className="text-2xl">Request Received!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <p className="text-muted-foreground">
          Thank you for your interest in VlogunrealPromo! We've received your request and will get back to you within 24 hours.
        </p>

        <div className="bg-muted/50 rounded-lg p-6 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Your Reference ID</p>
          <div className="flex items-center justify-center gap-2">
            <code className="text-2xl font-mono font-bold text-primary">
              {referenceId}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="hover:bg-primary/10"
            >
              <Copy size={20} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Save this ID to track your request
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>What happens next?</strong>
          </p>
          <ul className="space-y-1 text-left max-w-md mx-auto">
            <li>• Our team will review your requirements</li>
            <li>• We'll send you a detailed proposal and timeline</li>
            <li>• Once approved, we'll start creating your video</li>
            <li>• You'll receive updates throughout the process</li>
          </ul>
        </div>

        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Submit Another Request
        </Button>
      </CardContent>
    </Card>
  );
}
