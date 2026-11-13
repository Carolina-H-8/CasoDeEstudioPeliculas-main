const API_URL = 'http://localhost:3000/api';

export const getProducers = async () => {
  try {
    const response = await fetch(`${API_URL}/producers`);
    if (!response.ok) throw new Error('Error al obtener las productoras');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createProducer = async (producerData) => {
  try {
    const response = await fetch(`${API_URL}/producers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producerData),
    });
    if (!response.ok) throw new Error('Error al crear la productora');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProducer = async (id, data) => {
  const res = await fetch(`${API_URL}/producers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar la productora');
  return await res.json();
};

export const deleteProducer = async (id) => {
  const res = await fetch(`${API_URL}/producers/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar la productora');
  return await res.json();
};