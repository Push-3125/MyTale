'use client';

import { useState, useMemo } from 'react';
import { AppHeader } from '@/components/app-header';
import { MangaList } from '@/components/manga-list';
import { Button } from '@/components/ui/button';
import { allMangas } from '@/lib/manga-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const mangas = allMangas;

  const filteredMangas = useMemo(() => {
    if (!searchTerm) return mangas;
    return mangas.filter(manga =>
      manga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mangas, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Truyện tranh</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <MangaList mangas={filteredMangas} />
      </main>
    </div>
  );
}
