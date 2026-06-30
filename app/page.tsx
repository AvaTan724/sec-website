// app/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function Home() {
  const { data: episodes, error } = await supabase
    .from('episodes')
    .select('id, title, created_at')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans pb-24">
      <header className="py-10 px-6 max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-serif italic font-bold text-white tracking-tight">SEC Founders</h1>
      </header>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 tracking-tight">
          Learn from Sunway's greatest entrepreneurs
        </h2>
        
        <div className="space-y-1">
          {episodes && episodes.map((episode) => {
            const dateObj = new Date(episode.created_at);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return (
              <Link 
                href={`/episode?id=${episode.id}`} 
                key={episode.id}
                className="group flex justify-between items-center py-4 px-2 hover:bg-[#151515] rounded-md transition-colors cursor-pointer"
              >
                <span className="text-base md:text-lg text-gray-300 group-hover:text-white transition-colors">{episode.title}</span>
                <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{formattedDate}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}