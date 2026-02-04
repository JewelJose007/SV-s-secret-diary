
import React from 'react';
import { JournalEntry } from '../types';

interface ArchiveProps {
  entries: JournalEntry[];
}

const Archive: React.FC<ArchiveProps> = ({ entries }) => {
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "steady_heart_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen pt-12 px-8 pb-32 bg-white">
      <div className="max-w-xl mx-auto">
        <header className="mb-16 flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl font-light italic text-stone-800">Your Journey</h2>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] mt-3">{entries.length} reflections captured</p>
          
          {entries.length > 0 && (
              <button 
                onClick={handleExport}
                className="mt-6 text-[9px] uppercase tracking-widest text-stone-300 hover:text-stone-800 border-b border-stone-50 pb-1 transition-all"
              >
                Export Sanctuary Backup
              </button>
          )}
        </header>

        {entries.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-12 h-12 border border-stone-100 rounded-full mx-auto mb-6 flex items-center justify-center opacity-20">
                <div className="w-1 h-1 bg-stone-800 rounded-full" />
            </div>
            <p className="text-stone-300 text-sm italic font-light">Your archive is empty. Begin when you feel ready.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {sortedEntries.map((entry) => (
              <article key={entry.id} className="relative group animate-in slide-in-from-bottom-4 duration-700">
                <div className="absolute -left-8 top-1 bottom-1 w-[1px] bg-stone-100 group-hover:bg-stone-800 transition-colors" />
                
                <time className="text-[10px] uppercase tracking-[0.3em] text-stone-300 mb-6 block font-medium">
                  {new Date(entry.date).toLocaleDateString(undefined, { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </time>

                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-widest text-stone-500 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full">
                    {entry.mood}
                  </span>
                </div>

                <p className="text-stone-800 leading-[1.8] text-lg font-light mb-6 whitespace-pre-wrap">
                  {entry.content}
                </p>

                {entry.gratitude && (
                  <div className="p-6 bg-stone-50/50 rounded-2xl border border-stone-50 text-xs text-stone-500 italic flex items-start gap-3">
                    <span className="text-stone-300 mt-0.5">✦</span>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Small Gratitude</span>
                        {entry.gratitude}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
