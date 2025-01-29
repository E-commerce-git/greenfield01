import React, { useState } from 'react';

export default function Carousel() {
  // Define your image array
  const images = [
    'https://i.pinimg.com/originals/53/2f/ce/532fce4a815f90151781b7bc2bd09b98.jpg',
    'https://i.pinimg.com/originals/16/d1/64/16d164cf392078acf23f46933de85a83.png',
    'https://via.placeholder.com/1200x400?text=Image+3',
    'https://via.placeholder.com/1200x400?text=Image+4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Next slide function
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Carousel Images */}
      <div className="overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Carousel image ${currentIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#8594;
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
