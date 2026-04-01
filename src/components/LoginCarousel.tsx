'use client';

import { useEffect, useState } from 'react';

const IMAGES = [
  {
    src: '/images/login/carousel-1.png',
    title: 'Drip Note',
    description: '기록하고 공유하는 당신만의 커피 취향',
  },
  {
    src: '/images/login/carousel-2.png',
    title: 'Explore Beans',
    description: '전 세계의 다양한 원두 정보를 한눈에',
  },
  {
    src: '/images/login/carousel-3.png',
    title: 'Perfect Brewing',
    description: '당신만의 최적의 레시피를 찾아보세요',
  },
];

export default function LoginCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900 rounded-2xl md:rounded-r-none">
      <div key={index} className="absolute inset-0 animate-fade-in">
        <img
          src={IMAGES[index].src}
          alt="Coffee Carousel"
          className="h-full w-full object-cover brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-16 left-12 right-12 z-10">
          <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up [animation-delay:300ms] opacity-0 fill-mode-forwards">
            {IMAGES[index].title}
          </h2>
          <p className="text-lg text-white/80 max-w-sm animate-slide-up [animation-delay:500ms] opacity-0 fill-mode-forwards">
            {IMAGES[index].description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-12 flex space-x-2 z-20">
        {IMAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[#C08552]' : 'w-4 bg-[#FFF8F0]/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
