import { useCallback, useEffect, useRef, useState } from "react";
import "./CarouselFavorites.css";
import { Link } from "react-router";

function CarouselFavorites({ variant }: { variant: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favoritesDatas, setFavoritesDatas] = useState<FavoritesDatas>([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/favoritesByType/${variant}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFavoritesDatas(data));
  }, [variant]);

  const updateCarousel = useCallback(
    (newIndex: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const normalizedIndex =
        (newIndex + favoritesDatas.length) % favoritesDatas.length;
      setCurrentIndex(normalizedIndex);

      setTimeout(() => {
        console.log("setTimeout déclenché !");
        setIsAnimating(false);
      }, 800);
    },
    [isAnimating, favoritesDatas],
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
      (index - currentIndex + favoritesDatas.length) % favoritesDatas.length;
    let cardClass = "";
    if (offset === 0) {
      cardClass = "center";
    } else if (offset === 1) {
      cardClass = "right-1";
    } else if (offset === favoritesDatas.length - 1) {
      cardClass = "left-1";
    } else {
      cardClass = "hidden";
    }
    return cardClass;
  };

  return (
    <>
      <div className={`dots-carousel-container ${variant}`}>
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
            {favoritesDatas.map((favorite, index) => (
              <Link
                to={`/app/${variant === "artist" ? variant : "concert-place"}/${favorite.id}`}
                key={favorite.id}
                className={`card ${getCardClass(index)}`}
                data-index={index}
              >
                <figure>
                  <img src={favorite.profile_picture} alt={favorite.name} />
                  <figcaption>@{favorite.name}</figcaption>
                </figure>
              </Link>
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
          {favoritesDatas.map((member, index) => (
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

export default CarouselFavorites;
