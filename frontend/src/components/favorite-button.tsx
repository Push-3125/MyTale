'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export function FavoriteButton({ mangaId }: { mangaId: string }) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <Skeleton className="h-10 w-full" />
    );
  }

  const favorite = isFavorite(mangaId);

  return (
    <Button
      variant="outline"
      className="w-full justify-center gap-2"
      onClick={() => toggleFavorite(mangaId)}
    >
      <Heart className={cn("h-4 w-4", favorite && "fill-accent text-accent")} />
      {favorite ? 'Đã yêu thích' : 'Thêm vào Yêu thích'}
    </Button>
  );
}
