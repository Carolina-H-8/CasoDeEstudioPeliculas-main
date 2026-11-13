const API_URL = 'http://localhost:3000/api'; 

export const getDirectors = async () => {
  try {
    const response = await fetch(`${API_URL}/directors`); 
    if (!response.ok) throw new Error('Error al obtener los directores');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createDirector = async (directorData) => {
  try {
    const response = await fetch(`${API_URL}/directors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(directorData), // Aquí mandas los datos del director (ej. { name: "Christopher Nolan" })
    });
    if (!response.ok) throw new Error('Error al crear el director');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDirector = async (id, data) => {
  const res = await fetch(`${API_URL}/directors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el director");
  return await res.json();
};

export const deleteDirector = async (id) => {
  const res = await fetch(`${API_URL}/directors/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el director");
  return await res.json();
};