import { useState, useEffect, useCallback } from 'react';
import { getGenres, createGenre } from '../Services/generoService';

export function useGenero() {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reloadGenres = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGenres();
      setGeneros(data);
    } catch (err) {
      setError(err.message || "Error al cargar los géneros");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    let isMounted = true;

    getGenres()
      .then((data) => {
        if (isMounted) {
          setGeneros(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar los géneros");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const addGenre = async (name) => {
    if (!name.trim()) return false;
    await reloadGenres(); // Actualiza la tabla tras crear
    try {
      setError(null);
      await createGenre({ name: name.trim() });
      return true;
    } catch (err) {
      setError(err.message || "No se pudo guardar el género");
      return false;
    }
  };

  return {
    generos,
    loading,
    error,
    addGenre,
    reloadGenres,
  };
}