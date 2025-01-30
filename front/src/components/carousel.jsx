import React, { useState, useEffect } from 'react';

export default function Carousel() {
  // Image Array
  const images = [
    'https://cdn.mos.cms.futurecdn.net/pY7Q5zV9vb6QovWr9WdaDj-1200-80.jpg',
    'https://via.placeholder.com/1200x400?text=Image+3',
    'https://via.placeholder.com/1200x400?text=Image+4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Set up auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); // Move to the next slide every 3 seconds
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clean up interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="relative max-w-full mx-auto overflow-hidden">
      {/* Carousel Images */}
      <div className="w-full transition-transform duration-500 ease-in-out">
        <img
          src={images[currentIndex]}
          alt={`Carousel image ${currentIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-200"
      >
        &#8594;
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-500'} transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}
