const API_URL = 'http://localhost:3000/api';

export const getTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/types`);
    if (!response.ok) throw new Error('Error al obtener los tipos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createType = async (typeData) => {
  try {
    const response = await fetch(`${API_URL}/types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeData),
    });
    if (!response.ok) throw new Error('Error al crear el tipo');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateType = async (id, data) => {
  const res = await fetch(`${API_URL}/types/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar el tipo');
  return await res.json();
};

export const deleteType = async (id) => {
  const res = await fetch(`${API_URL}/types/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar el tipo');
  return await res.json();
};