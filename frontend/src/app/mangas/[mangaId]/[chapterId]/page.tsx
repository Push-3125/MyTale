import { getMangaById, getChapter, allMangas } from '@/lib/manga-data';
import { notFound } from 'next/navigation';
import { Reader } from '@/components/reader';

export default function ReaderPage({ params }: { params: { mangaId: string, chapterId: string } }) {
  const manga = getMangaById(params.mangaId);
  const chapter = getChapter(params.mangaId, params.chapterId);

  if (!manga || !chapter) {
    notFound();
  }

  return <Reader manga={manga} chapter={chapter} />;
}

export async function generateStaticParams() {
    const params = [];
    for (const manga of allMangas) {
        for (const chapter of manga.chapters) {
            params.push({
                mangaId: manga.id,
                chapterId: chapter.id,
            });
        }
    }
    return params;
}
