import React, { useState, useEffect } from 'react';

export default function CategoryCarousel({ categoryId }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Category-specific carousel images
  const categoryImages = {
    women: [
      'https://example.com/women-fashion-1.jpg',
      'https://example.com/women-fashion-2.jpg',
      'https://example.com/women-fashion-3.jpg',
    ],
    men: [
      'https://example.com/men-fashion-1.jpg',
      'https://example.com/men-fashion-2.jpg',
      'https://example.com/men-fashion-3.jpg',
    ],
    kids: [
      'https://example.com/kids-fashion-1.jpg',
      'https://example.com/kids-fashion-2.jpg',
      'https://example.com/kids-fashion-3.jpg',
    ],
  };

  useEffect(() => {
    setImages(categoryImages[categoryId] || []);
  }, [categoryId]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative max-w-full mx-auto overflow-hidden">
      <div className="w-full transition-transform duration-500 ease-in-out">
        <img
          src={images[currentIndex]}
          alt={`${categoryId} fashion ${currentIndex + 1}`}
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
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-500'
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
} 