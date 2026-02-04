
import React, { useEffect, useState } from 'react';
import { JournalEntry } from '../types';
import { getGroundingInsight } from '../services/geminiService';

interface ReflectProps {
  entries: JournalEntry[];
}

const Reflect: React.FC<ReflectProps> = ({ entries }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const result = await getGroundingInsight(entries);
      setInsight(result);
      setLoading(false);
    };
    fetchInsight();
  }, [entries]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-stone-50/20">
      <div className="max-w-md w-full">
        <header className="mb-16 text-center">
          <div className="w-16 h-16 bg-white rounded-3xl border border-stone-100 flex items-center justify-center mx-auto mb-8 shadow-sm group">
            <div className="w-3 h-3 bg-stone-800 rounded-full group-hover:scale-125 transition-transform duration-500 animate-pulse" />
          </div>
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-stone-400 pl-[0.6em]">Sanctuary Insight</h2>
        </header>

        <div className="relative group">
            {/* Soft decorative background circles */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-stone-100 to-white rounded-[3rem] -z-10 blur-xl opacity-50 transition-opacity group-hover:opacity-80" />
            
            <div className="bg-white/80 backdrop-blur-md border border-stone-100 p-10 rounded-[2.5rem] shadow-sm min-h-[240px] flex items-center justify-center text-center">
                {loading ? (
                <div className="space-y-4 w-full">
                    <div className="h-2 bg-stone-50 rounded-full animate-pulse w-full" />
                    <div className="h-2 bg-stone-50 rounded-full animate-pulse w-5/6 mx-auto" />
                    <div className="h-2 bg-stone-50 rounded-full animate-pulse w-4/6 mx-auto" />
                </div>
                ) : (
                <p className="font-serif text-2xl font-light italic text-stone-800 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    {insight}
                </p>
                )}
            </div>
        </div>

        <div className="mt-16 text-center">
            <div className="text-stone-300 text-[9px] uppercase tracking-[0.4em] mb-2">
                Derived from your journey
            </div>
            <div className="text-stone-200 text-[8px] italic">
                AI facilitates reflection, but only you hold the meaning.
            </div>
        </div>
      </div>
    </div>
  );
};

export default Reflect;
