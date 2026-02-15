'use client';

export default function NextPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(350_100%_95%)] to-[hsl(280_70%_90%)] flex items-center justify-center p-4">
      {/* Floating hearts decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-5xl animate-bounce">💕</div>
        <div className="absolute top-20 right-20 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>💖</div>
        <div className="absolute bottom-32 left-1/4 text-5xl animate-bounce" style={{ animationDelay: '1s' }}>💝</div>
        <div className="absolute bottom-20 right-1/4 text-6xl animate-bounce" style={{ animationDelay: '0.3s' }}>💗</div>
        <div className="absolute top-1/2 right-10 text-5xl animate-bounce" style={{ animationDelay: '1.5s' }}>💓</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[hsl(var(--primary))]">
            I knew you'd say yes! 💕
          </h1>

          {/* Celebration text */}
          <p className="text-lg text-gray-600 mb-8">
            This is the beginning of something beautiful. May we start from zero and achieve success together in God.
          </p>

          {/* Decorative hearts */}
          <div className="text-5xl mb-8">💕 💖 💝</div>

          {/* Button to go back */}
          <button
            onClick={() => window.location.href = '/'}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition-all duration-200 text-lg"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
