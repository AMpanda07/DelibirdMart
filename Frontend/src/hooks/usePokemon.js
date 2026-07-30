/**
 * usePokemonPage.js
 * Custom hook: fetches one paginated page of Pokémon from PokeAPI.
 * Automatically refetches when `page` changes.
 * Returns: { pokemon, total, hasMore, loading, error }
 */
import { useState, useEffect, useRef } from 'react';
import { fetchPokemonPage } from '../services/pokemonService';

export function usePokemonPage(page = 0, limit = 20) {
  const [pokemon,  setPokemon]  = useState([]);
  const [total,    setTotal]    = useState(0);
  const [hasMore,  setHasMore]  = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    // cancel previous in-flight request on re-run
    abortRef.current?.abort?.();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    fetchPokemonPage(page, limit)
      .then(res => {
        if (ctrl.signal.aborted) return;
        setPokemon(res.pokemon);
        setTotal(res.total);
        setHasMore(res.hasMore);
      })
      .catch(err => {
        if (ctrl.signal.aborted) return;
        setError(err.message ?? 'Failed to load Pokémon');
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });

    return () => ctrl.abort();
  }, [page, limit]);

  return { pokemon, total, hasMore, loading, error };
}

/* ── Hook: load-more accumulator ─────────────────────────────────
   Fetches pages incrementally; each new page is appended.
   Call `loadMore()` to append the next page.
──────────────────────────────────────────────────────────────── */
export function usePokemonInfinite(limit = 20) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [page,       setPage]       = useState(0);
  const [total,      setTotal]      = useState(0);
  const [hasMore,    setHasMore]    = useState(true);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const fetchingRef = useRef(false);

  const fetchPage = async (pageNum) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPokemonPage(pageNum, limit);
      setAllPokemon(prev => pageNum === 0 ? res.pokemon : [...prev, ...res.pokemon]);
      setTotal(res.total);
      setHasMore(res.hasMore);
    } catch (err) {
      setError(err.message ?? 'Failed to load Pokémon');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  // Initial fetch
  useEffect(() => { fetchPage(0); }, []); // eslint-disable-line

  const loadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage);
  };

  const reset = () => {
    setAllPokemon([]);
    setPage(0);
    setHasMore(true);
    fetchPage(0);
  };

  return { allPokemon, total, hasMore, loading, error, loadMore, reset };
}
