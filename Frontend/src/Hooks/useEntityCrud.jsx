import { useState, useEffect, useCallback } from "react";


export function useEntityCrud({ getAll,
    createItem,
    updateItem,
    deleteItem,
    entityName = "registro",
    formatPayload = (data) => data,
}) {
    const [items,setItems]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error,setError]=useState(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAll();
            setItems(data);
        } catch (err) {
            setError(err.message || `Error al cargar ${entityName}`);
        } finally {
            setLoading(false);
        }
    }, [getAll, entityName]);

    useEffect(() => {
        let isMounted = true;

        getAll()
            .then((data) => {
                if (isMounted) {
                    setItems(data);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message || `Error al cargar ${entityName}`);
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
    }, [getAll, entityName]);

    const addItem = async (data) => {
        if (!data?.name?.trim()) return false;

        try {
            setError(null);
            await createItem(formatPayload(data));
            await reload();
            return true;
        } catch (err) {
            setError(err.message || `No se pudo guardar ${entityName}`);
            return false;
        }
    };

    const editItem = async (id, data) => {
        try {
            setError(null);
            await updateItem(id, formatPayload(data));
            await reload();
            return true;
        } catch (err) {
            setError(err.message || `No se pudo actualizar ${entityName}`);
            return false;
        }
    };

    const removeItem = async (id) => {
        try {
            setError(null);
            await deleteItem(id);
            await reload();
            return true;
        } catch (err) {
            setError(err.message || `No se pudo eliminar ${entityName}`);
            return false;
        }
    };

    return {
        items,
        loading,
        error,
        addItem,
        editItem,
        removeItem,
        reload,
    };




}