import { useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useLanguage } from "../contexts/LanguageContext";

interface ShareButtonProps extends ButtonProps {
  serviceId: string;
  title: string;
  variant?: string;
  size?: string;
  className: string;
}

export function ShareButton({
  serviceId,
  title,
  variant = "outline",
  size = "sm",
  className = "",
  ...props
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const getServiceUrl = () => {
    // Construct a URL that can be handled by the app's router
    return `${window.location.origin}/service/${serviceId}`;
  };

  const handleCopyLink = async () => {
    const url = getServiceUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(t("share.copied"));

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error(t("share.copyFailed"));
    }
  };

  const handleNativeShare = async () => {
    const url = getServiceUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: t("share.text", { title }),
          url: url,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share failed:", error);
          toast.error(t("share.shareFailed"));
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink();
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      getServiceUrl()
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      getServiceUrl()
    )}&text=${encodeURIComponent(t("share.text", { title }))}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${t("share.text", { title })} ${getServiceUrl()}`
    )}`,
  };

  const openShareUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          title={t("common.share")}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={handleNativeShare}>
          <Share2 className="mr-2 h-4 w-4" />
          {t("share.native")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? t("share.copied") : t("share.copyLink")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openShareUrl(shareUrls.facebook)}>
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShareUrl(shareUrls.twitter)}>
          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
          Twitter / X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShareUrl(shareUrls.whatsapp)}>
          <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
          WhatsApp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
