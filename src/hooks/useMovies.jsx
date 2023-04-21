import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../service/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const previousSearch = useRef(search);

  // const getMovies = useMemo(() => {
  //   return async ({ search }) => {
  //     if (search === previousSearch.current) return;

  //     try {
  //       setLoading(true);
  //       setError(null);
  //       previousSearch.current = search;
  //       const newMovies = await searchMovies({ search });
  //       setMovies(newMovies);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       // se ejecuta el finally tanto en el try como en el catch.
  //       setLoading(false);
  //     }
  //   };
  // }, []);

  const getMovies = useCallback(async ({ search }) => {
    // Hace lo mismo que el useMemo
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      // se ejecuta el finally tanto en el try como en el catch.
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    // console.log("render");
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
