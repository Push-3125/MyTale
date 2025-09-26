'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'manga-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  const updateFavorites = useCallback((newFavorites: string[]) => {
    setFavorites(newFavorites);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  }, []);

  const addFavorite = useCallback((mangaId: string) => {
    updateFavorites([...new Set([...favorites, mangaId])]);
  }, [favorites, updateFavorites]);

  const removeFavorite = useCallback((mangaId: string) => {
    updateFavorites(favorites.filter(id => id !== mangaId));
  }, [favorites, updateFavorites]);

  const isFavorite = useCallback((mangaId: string) => {
    return favorites.includes(mangaId);
  }, [favorites]);

  const toggleFavorite = useCallback((mangaId: string) => {
    if (isFavorite(mangaId)) {
      removeFavorite(mangaId);
    } else {
      addFavorite(mangaId);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
