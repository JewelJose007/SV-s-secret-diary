
import React, { useState } from 'react';

const Pause: React.FC = () => {
  const [text, setText] = useState('');
  const [isFading, setIsFading] = useState(false);
  const [hasReleased, setHasReleased] = useState(false);

  const handleRelease = () => {
    setIsFading(true);
    setTimeout(() => {
      setText('');
      setIsFading(false);
      setHasReleased(true);
      setTimeout(() => setHasReleased(false), 5000);
    }, 4500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-stone-50/30">
      {!hasReleased ? (
        <div className="max-w-md w-full animate-in fade-in duration-1000">
          <h2 className="font-serif text-3xl font-light italic text-stone-800 mb-6">Permission to Pause</h2>
          <p className="text-stone-400 text-sm mb-12">Type something you want to let go of. Just for a moment.</p>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isFading}
            placeholder="A worry, a deadline, a thought..."
            className={`w-full h-48 bg-transparent border-none focus:ring-0 text-stone-600 text-center text-lg italic leading-relaxed placeholder:text-stone-200 resize-none transition-all duration-1000 ${isFading ? 'fade-out' : ''}`}
          />

          {!isFading && text.trim() && (
            <button
              onClick={handleRelease}
              className="mt-12 text-[10px] uppercase tracking-[0.4em] text-stone-400 border border-stone-200 px-8 py-3 rounded-full hover:bg-stone-50 transition-all"
            >
              Exhale
            </button>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in duration-1000 text-stone-400 italic">
          It's okay to put it down for now.
        </div>
      )}
    </div>
  );
};

export default Pause;
