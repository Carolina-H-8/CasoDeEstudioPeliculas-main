import { useState, useEffect, useCallback } from 'react';
import { getProducers, createProducer, updateProducer, deleteProducer } from '../Services/productoraService';

export function useProductora() {
  const [productoras, setProductoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadProducers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducers();
      setProductoras(data);
    } catch (err) {
      setError(err.message || 'Error al cargar las productoras');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getProducers()
      .then((data) => {
        if (isMounted) {
          setProductoras(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error al cargar las productoras');
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

  const addProducer = async (data) => {
    if (!data?.name?.trim()) return false;

    try {
      setError(null);
      await createProducer({
        name: data.name.trim(),
        slogan: data.slogan?.trim(),
        description: data.description?.trim(),
      });
      await reloadProducers();
      return true;
    } catch (err) {
      setError(err.message || 'No se pudo guardar la productora');
      return false;
    }
  };

  const editProducer = async (id, data) => {
    try {
      setError(null);
      await updateProducer(id, data);
      await reloadProducers();
      return true;
    } catch (err) {
      setError(err.message || 'No se pudo actualizar la productora');
      return false;
    }
  };

  const removeProducer = async (id) => {
    try {
      setError(null);
      await deleteProducer(id);
      await reloadProducers();
      return true;
    } catch (err) {
      setError(err.message || 'No se pudo eliminar la productora');
      return false;
    }
  };

  return {
    productoras,
    loading,
    error,
    addProducer,
    editProducer,
    removeProducer,
    reloadProducers,
  };
}