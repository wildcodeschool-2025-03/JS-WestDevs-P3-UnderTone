import type React from "react";
import { useCallback, useRef, useState } from "react";
import "./Carousel.css";

function Carousel({ photosDatas }: { photosDatas: Photo[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCarousel = useCallback(
    (newIndex: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const normalizedIndex =
        (newIndex + photosDatas.length) % photosDatas.length;
      setCurrentIndex(normalizedIndex);

      setTimeout(() => {
        console.log("setTimeout déclenché !");
        setIsAnimating(false);
      }, 800);
    },
    [isAnimating, photosDatas],
  );

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
  };

  const getCardClass = (index: number) => {
    const offset =
      (index - currentIndex + photosDatas.length) % photosDatas.length;
    let cardClass = "";
    if (offset === 0) {
      cardClass = "center";
    } else if (offset === 1) {
      cardClass = "right-1";
    } else if (offset === photosDatas.length - 1) {
      cardClass = "left-1";
    } else {
      cardClass = "hidden";
    }
    return cardClass;
  };

  return (
    <>
      <div className="dots-carousel-container">
        <div
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="nav-arrow left"
            onClick={() => updateCarousel(currentIndex - 1)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <div className="carousel-track">
            {photosDatas.map((photo, index) => (
              <button
                type="button"
                key={photo.id}
                className={`card ${getCardClass(index)}`}
                data-index={index}
                onClick={() => updateCarousel(index)}
              >
                <img src={photo.image} alt={`Postée le ${photo.date}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="nav-arrow right"
            onClick={() => updateCarousel(currentIndex + 1)}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        <div className="dots">
          {photosDatas.map((member, index) => (
            <button
              type="button"
              key={member.id}
              className={`dot${index === currentIndex ? " active" : ""}`}
              data-index={index}
              onClick={() => updateCarousel(index)}
              aria-label={`Go to slide ${index}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Carousel;
