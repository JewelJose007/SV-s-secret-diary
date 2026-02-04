
import React, { useState, useEffect } from 'react';
import { JournalEntry, Mood } from '../types';

interface JournalProps {
  // Fix: Exclude 'userId' from the expected entry type to match the implementation in App.tsx
  onSave: (entry: Omit<JournalEntry, 'id' | 'date' | 'userId'>) => void;
  onCancel: () => void;
}

const Journal: React.FC<JournalProps> = ({ onSave, onCancel }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>('none');
  const [gratitude, setGratitude] = useState('');
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    if (content.length > 50 && !isFocusMode) {
      setIsFocusMode(true);
    }
  }, [content]);

  const moods: { label: Mood; color: string; emoji: string }[] = [
    { label: 'peaceful', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', emoji: '🌿' },
    { label: 'quiet', color: 'bg-stone-50 text-stone-700 border-stone-100', emoji: '☁️' },
    { label: 'scattered', color: 'bg-amber-50 text-amber-700 border-amber-100', emoji: '🍂' },
    { label: 'heavy', color: 'bg-indigo-50 text-indigo-700 border-indigo-100', emoji: '🌊' },
    { label: 'anxious', color: 'bg-rose-50 text-rose-700 border-rose-100', emoji: '🌪️' }
  ];

  return (
    <div className={`min-h-screen pt-12 px-8 pb-32 transition-all duration-1000 ${isFocusMode ? 'bg-white' : 'bg-[#fafafa]'}`}>
      <div className="max-w-xl mx-auto">
        <header className={`mb-12 transition-all duration-1000 ${isFocusMode ? 'opacity-0 scale-95 translate-y-[-10px]' : 'opacity-100'}`}>
          <h2 className="font-serif text-4xl font-light italic text-stone-800 mb-2">Unfold your thoughts</h2>
          <p className="text-stone-400 text-sm font-light">Write without judgment. This space is yours.</p>
        </header>

        <section className="mb-12 relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is on your heart right now?"
            className="w-full h-80 bg-transparent border-none focus:ring-0 text-stone-800 text-xl leading-[1.8] placeholder:text-stone-200 resize-none font-light"
            autoFocus
          />
          {content.length > 0 && (
             <button 
                onClick={() => setIsFocusMode(!isFocusMode)}
                className="absolute -top-10 right-0 text-stone-300 hover:text-stone-600 transition-colors"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {isFocusMode ? <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /> : <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />}
                </svg>
             </button>
          )}
        </section>

        <div className={`transition-all duration-700 ${isFocusMode ? 'opacity-20 hover:opacity-100 translate-y-4' : 'opacity-100'}`}>
            <section className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-6 font-semibold">The color of your mood</p>
            <div className="flex flex-wrap gap-3">
                {moods.map((m) => (
                <button
                    key={m.label}
                    onClick={() => setMood(m.label)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[11px] tracking-wider transition-all duration-300 ${
                    mood === m.label 
                        ? `border-stone-800 bg-stone-800 text-white shadow-lg -translate-y-1` 
                        : `border-transparent ${m.color} opacity-70 hover:opacity-100`
                    }`}
                >
                    <span>{m.emoji}</span>
                    <span className="uppercase tracking-widest">{m.label}</span>
                </button>
                ))}
            </div>
            </section>

            <section className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4 font-semibold">A small gratitude</p>
            <input
                type="text"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="A warm tea, a cool breeze, a kind word..."
                className="w-full bg-transparent border-b border-stone-100 py-4 focus:border-stone-800 transition-all text-stone-700 placeholder:text-stone-200 outline-none text-sm font-light italic"
            />
            </section>

            <div className="flex justify-between items-center pt-8">
            <button 
                onClick={onCancel}
                className="text-stone-400 text-[10px] uppercase tracking-[0.4em] hover:text-stone-800 transition-all hover:tracking-[0.5em]"
            >
                Leave
            </button>
            <button 
                // Fix: Updated call to onSave matches the new interface
                onClick={() => onSave({ content, mood, gratitude })}
                disabled={!content.trim()}
                className="bg-stone-800 text-white px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] disabled:bg-stone-100 disabled:text-stone-300 transition-all shadow-xl shadow-stone-200 active:scale-95"
            >
                Capture Reflection
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
