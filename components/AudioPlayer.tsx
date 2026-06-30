// components/AudioPlayer.tsx
'use client';

export default function AudioPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white border-t border-gray-800 p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Track Info */}
        <div className="text-center md:text-left flex-shrink-0">
          <p className="text-sm font-bold truncate w-64">Select an episode...</p>
          <p className="text-xs text-gray-400">Sunway Entrepreneur Club</p>
        </div>

        {/* Audio Controls (HTML5 Native for now) */}
        <div className="w-full flex-grow">
          <audio controls className="w-full h-10 outline-none">
            {/* We will dynamically inject the audio source here later */}
            <source src="" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}