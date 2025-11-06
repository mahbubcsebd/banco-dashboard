'use client';
import { cn } from '@/lib/utils'; // যদি তোমার কাছে না থাকে নিচে দিয়েছি

const Banner = ({
  image,
  title = 'Welcome to Our Site',
  text = 'We’re glad to have you here.',
  className,
}) => {
  const bgImage =
    image ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80';

  return (
    <div
      className={cn(
        'relative h-[350px] flex items-center justify-center text-center overflow-hidden',
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Orangish Overlay */}
      <div className="absolute inset-0 bg-orange-500/40 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-white max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-md">
          {title}
        </h1>
        {text && <p className="mt-3 text-base sm:text-lg opacity-90">{text}</p>}
      </div>
    </div>
  );
};

export default Banner;
