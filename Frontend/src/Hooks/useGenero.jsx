import { useState, useEffect, useCallback } from 'react';
import { getGenres, createGenre, updateGenre, deleteGenre } from '../Services/generoService';

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

  const addGenre = async (data) => {
    if (!data?.name?.trim()) return false;
    
    try {
      setError(null);
      await createGenre({ name: data.name.trim(), description: data.description?.trim()});
      await reloadGenres(); // Actualiza la tabla tras crear
      return true;
    } catch (err) {
      setError(err.message || "No se pudo guardar el género");
      return false;
    }
  };

  const editGenre = async (id, data) => {
    try {
      setError(null);
      await updateGenre(id, data);
      await reloadGenres();
      return true;
    } catch (err) {
      setError(err.message || "No se pudo actualizar el género");
      return false;
    }
  };

  const removeGenre = async (id) => {
    try {
      setError(null);
      await deleteGenre(id);
      await reloadGenres();
      return true;
    } catch (err) {
      setError(err.message || "No se pudo eliminar el género");
      return false;
    }
  };

  return {
    generos,
    loading,
    error,
    addGenre,
    editGenre,
    removeGenre,
    reloadGenres,
  };
}