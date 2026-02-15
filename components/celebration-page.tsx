'use client';

import { useEffect, useState } from 'react';

export default function CelebrationPage() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(350_100%_60%)] to-[hsl(280_70%_60%)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed w-2 h-2 pointer-events-none"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`,
            backgroundColor: ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#fff0f5'][Math.floor(Math.random() * 5)],
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Celebration emoji */}
          <div className="text-6xl mb-6 animate-bounce">🎉</div>

          {/* Main message */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[hsl(var(--primary))]">
            YES! 💕
          </h1>

          {/* Subheading */}
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
            You've made me the happiest!
          </p>

          {/* Message */}
          <p className="text-lg text-gray-700 mb-8">
            Let's start from zero and achieve success together in God. Here's to a beautiful journey ahead! ✨
          </p>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-4 mb-8 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💖</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💗</span>
          </div>

          {/* Confirmation message */}
          <div className="bg-[hsl(var(--primary))] bg-opacity-10 border-2 border-[hsl(var(--primary))] rounded-lg p-4 mb-6">
            <p className="text-sm text-[hsl(var(--foreground))] font-semibold">
              ✅ Your response has been sent to jasonvianneys@gmail.com
            </p>
          </div>

          {/* Additional message */}
          <p className="text-gray-600 text-sm italic">
            This is the beginning of something beautiful. Let's make it count! 🌟
          </p>
        </div>
      </div>

      {/* Keyframe animation for confetti */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
