
import { useState, useEffect, useRef } from 'react';
import { Copy, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface StoryOutputProps {
  title?: string;
  content: string;
  isLoading?: boolean;
  className?: string;
}

const StoryOutput: React.FC<StoryOutputProps> = ({
  title,
  content,
  isLoading = false,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (navigator.clipboard && content) {
      try {
        await navigator.clipboard.writeText(title ? `${title}\n\n${content}` : content);
        setCopied(true);
        toast.success('Story copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy text');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share && content) {
      try {
        await navigator.share({
          title: title || 'My Generated Story',
          text: title ? `${title}\n\n${content}` : content,
        });
        toast.success('Story shared successfully');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Failed to share story');
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className={cn('relative rounded-2xl overflow-hidden glass-panel', className)}>
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={handleCopy}
          className="p-2 rounded-full transition-all duration-200 bg-background/50 hover:bg-background/80 text-foreground"
          aria-label="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded-full transition-all duration-200 bg-background/50 hover:bg-background/80 text-foreground"
          aria-label="Share story"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
      
      <div 
        ref={storyRef}
        className={cn(
          'p-6 min-h-[300px] max-h-[500px] overflow-auto transition-opacity duration-300',
          isLoading ? 'opacity-50' : 'opacity-100'
        )}
      >
        {title && (
          <h3 className="text-xl md:text-2xl font-medium mb-4">{title}</h3>
        )}
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {content.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index} className="my-3 text-foreground/90">{paragraph}</p> : <br key={index} />
          ))}
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-xs">
            <div className="gradient-animate w-full h-full absolute opacity-10"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryOutput;
