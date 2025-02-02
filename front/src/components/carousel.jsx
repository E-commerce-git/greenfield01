import React, { useState, useEffect } from 'react';
import img1 from "../assets/femme 2.png"
import img2 from "../assets/fille 2.png"
import img3 from "../assets/homme 2.png"
import img4 from "../assets/homme_2.png"
import img5 from "../assets/filles.png"

export default function Carousel() {

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5
  ]

  const [currentIndex, setCurrentIndex] = useState(0);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

 
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); 
    }, 1000); 


    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-full mx-auto overflow-hidden">
     
      <div className="w-full transition-transform duration-500 ease-in-out">
        <img
          src={images[currentIndex]}
          alt={`Carousel image ${currentIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

   
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
