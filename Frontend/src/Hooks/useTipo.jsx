import { useState, useEffect, useCallback } from 'react';
import { getTypes, createType, updateType, deleteType } from '../Services/tipoService';

export function useTipo() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTypes();
      setTipos(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los tipos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getTypes()
      .then((data) => {
        if (isMounted) {
          setTipos(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error al cargar los tipos');
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

  const addType = async (data) => {
    if (!data?.name?.trim()) return false;

    try {
      setError(null);
      await createType({
        name: data.name.trim(),
        description: data.description?.trim(),
      });
      await reloadTypes();
      return true;
    } catch (err) {
      setError(err.message || 'No se pudo guardar el tipo');
      return false;
    }
  };

  const editType = async (id, data) => {
    try {
      setError(null);
      await updateType(id, data);
      await reloadTypes();
      return true;
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el tipo');
      return false;
    }
  };

  const removeType = async (id) => {
    try {
      setError(null);
      await deleteType(id);
      await reloadTypes();
      return true;
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el tipo');
      return false;
    }
  };

  return {
    tipos,
    loading,
    error,
    addType,
    editType,
    removeType,
    reloadTypes,
  };
}