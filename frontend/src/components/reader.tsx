'use client';

import { useState, useEffect, useRef } from 'react';
import type { Manga, Chapter } from '@/lib/manga-data';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home,
  Book,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';



interface ReaderProps {
  manga: Manga;
  chapter: Chapter;
}


export function Reader({ manga, chapter }: ReaderProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
            setShowHeader(false); // scroll down
          } else if (currentScrollY < lastScrollY.current) {
            setShowHeader(true); // scroll up
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToNextChapter = () => {
    const currentChapterIndex = manga.chapters.findIndex((c: any) => c.id === chapter.id);
    if (currentChapterIndex < manga.chapters.length - 1) {
      const nextChapter = manga.chapters[currentChapterIndex + 1];
      router.push(`/mangas/${manga.id}/${nextChapter.id}`);
    } else {
      toast({ title: "Bạn đã đến chương cuối cùng!", duration: 1000 });
    }
  };

  const goToPrevChapter = () => {
    const currentChapterIndex = manga.chapters.findIndex((c: any) => c.id === chapter.id);
    if (currentChapterIndex > 0) {
      const prevChapter = manga.chapters[currentChapterIndex - 1];
      router.push(`/mangas/${manga.id}/${prevChapter.id}`);
    } else {
      toast({ title: "Đây là chương đầu tiên.", duration: 1000 });
    }
  };

  return (
  <div className="min-h-screen bg-black flex flex-col">
      <title>MyTale</title>
      <header className={`w-full bg-background/90 backdrop-blur-sm p-4 text-foreground z-10 transition-transform duration-300 ${showHeader ? '' : '-translate-y-full'}`}> 
        <div className="container mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center text-sm text-muted-foreground flex-wrap justify-center">
            <span className="font-bold text-lg">MyTale</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={`/mangas/${manga.id}`} className="hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-xs">{manga.title}</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-semibold text-foreground truncate max-w-[150px] sm:max-w-xs">{chapter.title}</span>
          </div>
        </div>
      </header>
      {/* Header chuyển chương và list, chỉ hiện khi scroll lên */}
      <div className={`w-full bg-background/90 backdrop-blur-sm text-foreground z-10 transition-transform duration-300 ${showHeader ? '' : '-translate-y-full'}`} style={{ position: 'sticky', top: 0 }}>
        <div className="container mx-auto flex justify-around items-center gap-4 w-full max-w-xs py-2">
          <Button variant="ghost" onClick={goToPrevChapter} className="flex flex-col h-auto p-1">
            <ChevronLeft className="h-6 w-6" />
            <span className="text-xs">TRƯỚC</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-col h-auto p-1">
                <Menu className="h-6 w-6" />
                <span className="text-xs">CHƯƠNG</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {manga.chapters.map((c: any) => (
                <DropdownMenuItem key={c.id} onClick={() => router.push(`/mangas/${manga.id}/${c.id}`)}>
                  {c.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" onClick={goToNextChapter} className="flex flex-col h-auto p-1">
            <ChevronRight className="h-6 w-6" />
            <span className="text-xs">SAU</span>
          </Button>
        </div>
      </div>
  <div className="flex-1 w-full">
        <div className="flex flex-col items-center">
          {chapter.pages.map((page: any, index: number) => (
            <div key={page.id} className="relative w-full max-w-3xl">
              <Image
                src={page.imageUrl}
                alt={`Page ${page.pageNumber}`}
                width={800}
                height={1200}
                className="w-full h-auto object-contain"
                priority={index < 2}
                data-ai-hint={page.imageHint}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ))}
        </div>
        <div className="py-8 px-4 text-center text-white">
          <p className="text-lg font-semibold mb-4">Hết {chapter.title}</p>
          <div className="flex justify-center items-center gap-4">
            <Button variant="secondary" onClick={goToPrevChapter} className="flex-1 max-w-xs">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Chương Trước
            </Button>
            <Button variant="secondary" size="icon" onClick={() => router.push(`/mangas/${manga.id}`)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="secondary" onClick={goToNextChapter} className="flex-1 max-w-xs">
              Chương Sau
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
