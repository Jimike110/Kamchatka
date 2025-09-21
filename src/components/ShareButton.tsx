import { useState } from 'react';
import { Button } from './ui/button';
import { Share2, Copy, Check, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

interface ShareButtonProps {
  serviceId: string;
  title: string;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function ShareButton({ 
  serviceId, 
  title, 
  variant = "outline", 
  size = "sm",
  className = "" 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const getServiceUrl = () => {
    return `${window.location.origin}?page=service&serviceId=${serviceId}`;
  };

  const handleCopyLink = async () => {
    const url = getServiceUrl();
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this amazing adventure: ${title}`,
          url: getServiceUrl()
        });
      } catch (error) {
        // User cancelled or error occurred, fall back to copy
        if (error.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getServiceUrl())}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(getServiceUrl())}&text=${encodeURIComponent(`Check out this amazing adventure: ${title}`)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out this amazing adventure: ${title} ${getServiceUrl()}`)}`
  };

  const openShareUrl = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Check if device supports native sharing (usually mobile)
  const supportsNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {/* Native share option for mobile devices */}
        {supportsNativeShare && (
          <>
            <DropdownMenuItem onClick={handleNativeShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        {/* Copy link option */}
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy Link'}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Social media sharing options */}
        <DropdownMenuItem onClick={() => openShareUrl(shareUrls.facebook)}>
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Facebook
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => openShareUrl(shareUrls.twitter)}>
          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
          Twitter
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => openShareUrl(shareUrls.whatsapp)}>
          <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
          WhatsApp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}