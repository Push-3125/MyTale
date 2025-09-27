import Image from 'next/image';
import Link from 'next/link';
import { allMangas } from '@/lib/manga-data';
import { useFavorites } from '@/hooks/use-favorites';

export default function Library() {
  const { favorites } = useFavorites();
  const favoriteMangas = allMangas.filter(m => favorites.includes(m.id));
  return (
    <div className="min-h-screen bg-white">
      {/* Header + Avatar */}
      <div className="relative bg-[#FBF3E8] flex flex-col items-center pt-12 pb-16 border-b border-gray-200 mb-4">
        <Link href="/">
          <h1 className="font-headline text-4xl font-bold text-[#B88B4A] mt-2 mb-1 cursor-pointer">My Tale</h1>
        </Link>
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center border-4 border-white shadow-md"
        >
          <svg width="48" height="48" fill="currentColor" className="text-black/80" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
      </div>
       <p className="font-semibold text-center text-gray-500 text-lg mb-8 pt-12">Đang theo dõi</p>


      {/* Manga cards */}
      <div className="p-4">
        {favoriteMangas.length === 0 ? (
          <div className="text-center text-gray-400 py-16">Chưa có truyện nào trong thư viện.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {favoriteMangas.map(manga => (
              <Link key={manga.id} href={`/mangas/${manga.id}`} className="flex items-center bg-white rounded-lg border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="w-24 h-24 flex-shrink-0">
                  <Image src={manga.coverImage} alt={manga.title} width={96} height={96} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-center">
                  <div className="font-semibold text-base text-gray-800 line-clamp-2">{manga.title}</div>
                  <div className="text-sm text-gray-500 mt-1">Chapter {manga.chapters.length}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
