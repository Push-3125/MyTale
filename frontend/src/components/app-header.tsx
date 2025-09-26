'use client';

import { Bookmark, Search } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export function AppHeader({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-[#F5F1E9]/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg font-headline text-foreground">MyTale</span>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/library">
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Thư viện</span>
            </Button>
          </Link>
          <Link href="/library">
            <Button variant="ghost" className="hidden sm:flex">
              <Bookmark className="mr-2 h-4 w-4" />
              Thư viện
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-black/5 hover:bg-black/10">
                <Search className="h-5 w-5 text-foreground/80" />
                <span className="sr-only">Tìm kiếm</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/useravatar/40/40" alt="User avatar" />
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline font-medium text-sm">Đoàn Bảo Khanh</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}