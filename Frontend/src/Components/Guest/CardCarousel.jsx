import React, { useState } from 'react';

const CardCarousel = ({ cards }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + visibleCount, cards.length - visibleCount));
  };

  const visibleCards = cards.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="w-full max-w-5xl mx-auto relative flex justify-between items-center">
      {/* Left arrow */}
      <button onClick={handlePrev} disabled={startIndex === 0} className="left-button">
        &#8592;
      </button>

      {/* Cards container */}
      <div className="w-[90%] mx-auto flex gap-4 ">
        {visibleCards.map((card, index) => (
          <div key={index} className="card ">
            <div>
              <span className="w-[150px] h-[150px] bg-gray-800 block rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={handleNext}
        disabled={startIndex + visibleCount >= cards.length}
        className="right-button"
      >
        &#8594;
      </button>
    </div>
  );
};

export default CardCarousel;
