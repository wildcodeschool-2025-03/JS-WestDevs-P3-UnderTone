import type React from "react";
import { useCallback, useRef, useState } from "react";
// import "./TeamCarousel.css"; // Assurez-vous que le chemin est correct
import "./Carousel.css";

const teamMembers = [
  {
    name: "Emily Kim",
    id: 1,
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Michael Steward",
    id: 2,
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Emma Rodriguez",
    id: 3,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Julia Gimmel",
    id: 4,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Lisa Anderson",
    id: 5,
    img: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2Zlc3Npb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "James Wilson",
    id: 6,
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCarousel = useCallback(
    (newIndex: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const normalizedIndex =
        (newIndex + teamMembers.length) % teamMembers.length;
      setCurrentIndex(normalizedIndex);

      setTimeout(() => {
        console.log("setTimeout déclenché !");
        setIsAnimating(false);
      }, 800);
    },
    [isAnimating],
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
      (index - currentIndex + teamMembers.length) % teamMembers.length;
    let cardClass = "";
    if (offset === 0) {
      cardClass = "center";
    } else if (offset === 1) {
      cardClass = "right-1";
    } else if (offset === teamMembers.length - 1) {
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
            {teamMembers.map((member, index) => (
              <button
                type="button"
                key={member.id}
                className={`card ${getCardClass(index)}`}
                data-index={index}
                onClick={() => updateCarousel(index)}
              >
                <img src={member.img} alt={`Team Member ${index + 1}`} />
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
          {teamMembers.map((member, index) => (
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
