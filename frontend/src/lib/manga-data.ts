export interface Page {
  id: string;
  pageNumber: number;
  imageUrl: string;
  imageHint: string;
  text: string;
}

export interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  pages: Page[];
}

export interface Manga {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  coverImageHint: string;
  chapters: Chapter[];
}

import { sieuNangLapPhuong } from './sieu-nang-lap-phuong';

const mangas: Manga[] = [
  sieuNangLapPhuong,
  {
    id: 'one-piece',
    title: 'One Piece',
    description: 'Follow the adventures of Monkey D. Luffy, a boy whose body gained the properties of rubber after unintentionally eating a Devil Fruit. With his crew of pirates, named the Straw Hat Pirates, Luffy explores the Grand Line in search of the ultimate treasure known as "One Piece" in order to become the next Pirate King.',
    coverImage: 'https://picsum.photos/seed/opcover/400/600',
    coverImageHint: 'pirate ship',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Romance Dawn',
        chapterNumber: 1,
        pages: [
            { id: 'p1', pageNumber: 1, imageUrl: 'https://picsum.photos/seed/opc1p1/800/1200', imageHint: 'manga panel', text: 'I\'m Monkey D. Luffy! The man who will become the Pirate King!' },
            { id: 'p2', pageNumber: 2, imageUrl: 'https://picsum.photos/seed/opc1p2/800/1200', imageHint: 'manga panel', text: 'Luffy meets Coby, a young boy who wants to be a Marine.' },
        ],
      },
    ],
  },
    {
    id: 'naruto',
    title: 'Naruto',
    description: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village\'s leader and strongest ninja.',
    coverImage: 'https://picsum.photos/seed/ncover/400/600',
    coverImageHint: 'ninja village',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Uzumaki Naruto',
        chapterNumber: 1,
        pages: [
            { id: 'p1', pageNumber: 1, imageUrl: 'https://picsum.photos/seed/nc1p1/800/1200', imageHint: 'manga drawing', text: 'In the village of Konoha, a great demon fox was sealed inside a young boy named Naruto.' },
            { id: 'p2', pageNumber: 2, imageUrl: 'https://picsum.photos/seed/nc1p2/800/1200', imageHint: 'manga drawing', text: 'Naruto, an orphan, is ostracized by the villagers. He pulls pranks to get attention.' },
        ],
      },
    ],
  },
];

export const allMangas = mangas;

export function getMangaById(id: string): Manga | undefined {
  return mangas.find(manga => manga.id === id);
}

export function getChapter(mangaId: string, chapterId: string): Chapter | undefined {
  const manga = getMangaById(mangaId);
  return manga?.chapters.find(chapter => chapter.id === chapterId);
}
