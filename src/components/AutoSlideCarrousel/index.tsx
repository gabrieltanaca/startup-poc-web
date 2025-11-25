import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AutoSlidingCarouselProps {
  items: React.ReactNode[];
  interval?: number;
  className?: string;
  visibleItems?: number;
  slideBy?: number;
}

const AutoSlidingCarousel: React.FC<AutoSlidingCarouselProps> = ({
  items,
  interval = 5000,
  className = '',
  visibleItems = 1,
  slideBy = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = items.length;

  const maxIndex = Math.max(0, totalItems - visibleItems);

  const translateAmount = (currentIndex * 100) / visibleItems;

  const itemWidth = `calc(${100 / visibleItems}% - 1rem)`;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + slideBy;

      if (nextIndex > maxIndex) {
        return 0;
      }
      return nextIndex;
    });
  }, [slideBy, maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - slideBy;

      if (nextIndex < 0) {
        return maxIndex;
      }
      return nextIndex;
    });
  }, [slideBy, maxIndex]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isHovered && totalItems > visibleItems) {
      intervalRef.current = setInterval(nextSlide, interval);
    }
  }, [interval, nextSlide, isHovered, totalItems, visibleItems]);

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startInterval]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startInterval();
  };

  if (totalItems === 0) return null;

  if (totalItems <= visibleItems) {
    return (
      <div className={`flex gap-4 ${className}`}>
        {items.map((item, index) => (
          <div key={index} className="min-w-0 flex-1">
            {item}
          </div>
        ))}
      </div>
    );
  }

  const dotCount = Math.floor(maxIndex / slideBy) + 1;
  const dotIndices = Array.from({ length: dotCount }, (_, i) => i * slideBy);

  return (
    <div
      className={`relative mb-[48px] w-full px-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(calc(-${translateAmount * (visibleItems / totalItems)}%))`,
            width: `${(totalItems / visibleItems) * 100}%`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} style={{ width: itemWidth }} className="p-2">
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50 disabled:opacity-50"
        aria-label="Previous slide"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50 disabled:opacity-50"
        aria-label="Next slide"
        disabled={currentIndex >= maxIndex}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {dotIndices.map((dotIndex) => (
          <div
            key={dotIndex}
            className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
              dotIndex === currentIndex ? 'bg-primary' : 'bg-gray-400/50 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlidingCarousel;
