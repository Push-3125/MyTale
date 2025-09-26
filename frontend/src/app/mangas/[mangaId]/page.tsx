import { getMangaById } from '@/lib/manga-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FavoriteButton } from '@/components/favorite-button';

export default function MangaDetailPage({ params }: { params: { mangaId: string } }) {
  const manga = getMangaById(params.mangaId);

  if (!manga) {
    notFound();
  }

  const firstChapter = manga.chapters[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <Image
              src={manga.coverImage}
              alt={`Cover of ${manga.title}`}
              width={400}
              height={600}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              priority
              data-ai-hint={manga.coverImageHint}
            />
          </div>
          <div className="md:col-span-2 pt-4">
            <h1 className="text-4xl lg:text-5xl font-bold font-headline text-foreground mb-2">
              {manga.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">by Jane Doe</p>
            <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="border-border hover:bg-secondary/50">Sci-Fi</Button>
                <Button variant="outline" size="sm" className="border-border hover:bg-secondary/50">Adventure</Button>
                <Button variant="outline" size="sm" className="border-border hover:bg-secondary/50">Mystery</Button>
            </div>
            <p className="text-muted-foreground mb-8 max-w-prose">{manga.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {firstChapter && (
                <Link href={`/mangas/${manga.id}/${firstChapter.id}`} passHref>
                  <Button size="lg" className="w-full sm:w-auto">Đọc Chương Đầu</Button>
                </Link>
              )}
              {/* Nút Add to Library thực sự */}
              <div className="w-full sm:w-auto">
                {/* @ts-expect-error Server Component to Client Component */}
                <FavoriteButton mangaId={manga.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-headline font-semibold text-foreground border-b border-border pb-3 mb-6">
              Chapters
            </h2>
            <div className="flex flex-col">
              {manga.chapters.map((chapter, index) => (
                <Link key={chapter.id} href={`/mangas/${manga.id}/${chapter.id}`} passHref>
                  <div className="border-b border-border hover:bg-secondary/20 transition-colors duration-200 cursor-pointer">
                    <div className="p-4 flex justify-between items-center">
                        <span className="font-medium text-lg text-foreground">{chapter.title}</span>
                        <span className="text-muted-foreground">Chapter {chapter.chapterNumber}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
    const { allMangas } = await import('@/lib/manga-data');
    return allMangas.map(manga => ({
        mangaId: manga.id,
    }));
}
