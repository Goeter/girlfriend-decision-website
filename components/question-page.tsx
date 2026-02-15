'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface QuestionPageProps {
  onYes: () => void;
  onNo: () => void;
}

export default function QuestionPage({ onYes, onNo }: QuestionPageProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleYesClick = () => {
    onYes();
    router.push('/next');
  };

  const handleNoClick = () => {
    alert('Are you sure? 😏');
    setYesScale((prev) => prev + 0.2);
    onNo();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!noButtonRef.current) return;

    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Calculate distance and direction from cursor to button
    const distX = buttonCenterX - e.clientX;
    const distY = buttonCenterY - e.clientY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // If cursor is close enough, repel the button away
    const repelDistance = 150;
    if (distance < repelDistance) {
      const angle = Math.atan2(distY, distX);
      const force = (repelDistance - distance) / repelDistance;
      const moveDistance = force * 120;

      const newX = Math.cos(angle) * moveDistance;
      const newY = Math.sin(angle) * moveDistance;

      setNoPosition({
        x: newX,
        y: newY,
      });
    } else {
      // Smoothly return to original position when cursor is far
      setNoPosition((prev) => ({
        x: prev.x * 0.85,
        y: prev.y * 0.85,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(350_100%_95%)] to-[hsl(280_70%_90%)] flex items-center justify-center p-4">
      {/* Floating hearts decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">💕</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>💖</div>
        <div className="absolute bottom-32 left-1/4 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>💝</div>
        <div className="absolute bottom-20 right-1/4 text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>💗</div>
        <div className="absolute top-1/2 right-10 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>💓</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[hsl(var(--primary))]">
            A Question for You ✨
          </h1>

          {/* Subtitle with emoji */}
          <p className="text-lg text-gray-600 mb-8">May we start from zero and achieve success together in God.</p>

          {/* Main question */}
          <div className="my-12">
            <p className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-2">
              Do you want to be my girlfriend?
            </p>
            <p className="text-xl text-[hsl(var(--primary))] font-semibold">💕</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-6 mt-12 relative h-24">
            {/* Yes button */}
            <button
              onClick={handleYesClick}
              className="flex-1 bg-green-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xl animate-gentle-bounce"
              style={{
                transform: `scale(${yesScale})`,
                transition: 'transform 300ms ease-out',
              }}
            >
              YES 💖
            </button>

            {/* No button with evasive movement */}
            <button
              ref={noButtonRef}
              onMouseMove={handleMouseMove}
              onClick={handleNoClick}
              className="flex-1 bg-red-400 text-white font-bold py-4 px-6 rounded-xl text-xl transition-transform duration-200 hover:cursor-pointer"
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              }}
            >
              NO 😢
            </button>
          </div>

          {/* Fun text */}
          <p className="text-sm text-gray-500 mt-8 italic">
            (Hint: The No button is feeling shy and won't cooperate 😉)
          </p>
        </div>
      </div>
    </div>
  );
}
