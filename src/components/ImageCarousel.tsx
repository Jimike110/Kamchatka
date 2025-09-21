import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent } from './ui/dialog';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
  showThumbnails = true 
}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  return (
    <>
      <div className={`relative group ${className}`}>
        {/* Main Image */}
        <div className="relative h-48 rounded-lg overflow-hidden cursor-pointer">
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={() => openLightbox(currentImageIndex)}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} className="bg-black/50 text-white border-0">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Zoom indicator */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-black/30 hover:bg-black/50 text-white"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(currentImageIndex);
              }}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation arrows (only show if more than 1 image) */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {showThumbnails && images.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                  index === currentImageIndex 
                    ? 'border-primary opacity-100' 
                    : 'border-transparent opacity-60 hover:opacity-80'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-50 h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Main lightbox image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <ImageWithFallback
                src={images[lightboxImageIndex]}
                alt={`${title} - Full size image ${lightboxImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 p-0 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevLightboxImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 p-0 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextLightboxImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">
              {lightboxImageIndex + 1} of {images.length}
            </div>

            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-8 rounded overflow-hidden border transition-all ${
                      index === lightboxImageIndex 
                        ? 'border-white opacity-100' 
                        : 'border-white/30 opacity-60 hover:opacity-80'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}