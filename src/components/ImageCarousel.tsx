import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent } from "./ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

interface ImageCarouselProps {
  images: string[];
  title: string;
  tags?: string[];
  className?: string;
  showThumbnails?: boolean;
}

export function ImageCarousel({
  images,
  title,
  tags = [],
  className = "",
  showThumbnails = true,
}: ImageCarouselProps) {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div
        className={`relative h-48 rounded-lg overflow-hidden bg-muted flex items-center justify-center ${className}`}
      >
        <span className="text-muted-foreground">{t("common.noImages")}</span>
      </div>
    );
  }

  return (
    <>
      <div className={`relative group ${className}`}>
        {/* Main Image */}
        <div
          className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-lg overflow-hidden cursor-pointer"
          onClick={(e) => openLightbox(currentImageIndex, e)}
        >
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt={t("imageCarousel.alt", {
              title,
              index: currentImageIndex + 1,
            })}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {tags.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  className="bg-black/50 text-white border-0 text-xs sm:text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="absolute top-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8 p-0 bg-black/30 hover:bg-black/50 text-white"
              onClick={(e) => openLightbox(currentImageIndex, e)}
              title={t("common.zoomIn")}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-black/30 hover:bg-black/50 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
                title={t("common.previous")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-black/30 hover:bg-black/50 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
                title={t("common.next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl w-full h-full max-h-screen p-0 bg-black/95 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-50 h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsLightboxOpen(false)}
              title={t("common.close")}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
              <ImageWithFallback
                src={images[lightboxImageIndex]}
                alt={t("imageCarousel.alt", {
                  title,
                  index: lightboxImageIndex + 1,
                })}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 p-0 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevLightboxImage}
                  title={t("common.previous")}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 p-0 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextLightboxImage}
                  title={t("common.next")}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </>
            )}

            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 sm:px-4 sm:py-2 text-sm rounded-lg">
              {lightboxImageIndex + 1} {t("common.of")} {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
