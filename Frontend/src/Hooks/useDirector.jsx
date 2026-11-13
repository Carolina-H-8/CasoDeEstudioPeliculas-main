import { useState, useEffect, useCallback } from 'react';
import { getDirectors, createDirector, updateDirector, deleteDirector } from '../Services/directorService';

export function useDirector() {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadDirectors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDirectors();
      setDirectores(data);
    } catch (err) {
      setError(err.message || "Error al cargar los directores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getDirectors()
      .then((data) => {
        if (isMounted) {
          setDirectores(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Error al cargar los directores");
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

  const addDirector = async (data) => {
    if (!data?.name?.trim()) return false;
    
    try {
      setError(null);
      await createDirector({ 
        name: data.name.trim(), 
        biography: data.biography?.trim() // Cambia o añade los campos que requiera tu director
      });
      await reloadDirectors(); // Actualiza la lista tras crear
      return true;
    } catch (err) {
      setError(err.message || "No se pudo guardar el director");
      return false;
    }
  };

  const editDirector = async (id, data) => {
    try {
      setError(null);
      await updateDirector(id, data);
      await reloadDirectors();
      return true;
    } catch (err) {
      setError(err.message || "No se pudo actualizar el director");
      return false;
    }
  };

  const removeDirector = async (id) => {
    try {
      setError(null);
      await deleteDirector(id);
      await reloadDirectors();
      return true;
    } catch (err) {
      setError(err.message || "No se pudo eliminar el director");
      return false;
    }
  };

  return {
    directores,
    loading,
    error,
    addDirector,
    editDirector,
    removeDirector,
    reloadDirectors,
  };
}