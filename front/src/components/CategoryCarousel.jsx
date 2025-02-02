import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function CategoryCarousel({ categories, selectedCategory, onCategoryClick }) {
  // Debug log to check categories
  console.log('Categories in carousel:', categories);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
        }}
      >
        {categories && categories.map((category) => (
          <SwiperSlide key={category.id}>
            <button
              onClick={() => onCategoryClick(category.id)}
              className={`w-full p-4 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id.toString()
                  ? 'bg-[#DB4444] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {getCategoryIcon(category.name)}
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const getCategoryIcon = (categoryName) => {
  const icons = {
    'Phones': (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M38.9375 6.125H17.0625C15.5523 6.125 14.3125 7.36484 14.3125 8.875V47.125C14.3125 48.6352 15.5523 49.875 17.0625 49.875H38.9375C40.4477 49.875 41.6875 48.6352 41.6875 47.125V8.875C41.6875 7.36484 40.4477 6.125 38.9375 6.125Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'Computers': (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M46.6667 9.33334H9.33333C8.04467 9.33334 7 10.378 7 11.6667V35C7 36.2887 8.04467 37.3333 9.33333 37.3333H46.6667C47.9553 37.3333 49 36.2887 49 35V11.6667C49 10.378 47.9553 9.33334 46.6667 9.33334Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'SmartWatch': (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M35 14H21C17.134 14 14 17.134 14 21V35C14 38.866 17.134 42 21 42H35C38.866 42 42 38.866 42 35V21C42 17.134 38.866 14 35 14Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Add default icon for other categories
    'default': (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="8" y="8" width="40" height="40" rx="20" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  };

  return icons[categoryName] || icons['default'];
}; 