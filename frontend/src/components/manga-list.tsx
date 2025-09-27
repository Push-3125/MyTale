'use client';

import type { Manga } from '@/lib/manga-data';
import Image from 'next/image';
import Link from 'next/link';

interface MangaListProps {
  mangas: Manga[];
}

export function MangaList({ mangas }: MangaListProps) {
  return (
    <div className="flex flex-col gap-8">
      {mangas.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
          {mangas.map(manga => (
            <Link key={manga.id} href={`/mangas/${manga.id}`} className="group">
                <div className="overflow-hidden rounded-lg mb-4">
                    <Image
                      src={manga.coverImage}
                      alt={`Cover of ${manga.title}`}
                      width={400}
                      height={600}
                      className="object-cover w-full h-auto aspect-[2/3] group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={manga.coverImageHint}
                    />
                </div>
                <div>
                    <h3 className="font-headline font-semibold text-base leading-tight truncate text-foreground group-hover:text-primary transition-colors">
                      {manga.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{manga.chapters.length} Chapters</p>
                </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No comics found.</p>
        </div>
      )}
    </div>
  );
}
