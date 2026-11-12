// src/services/genreService.js
const API_URL = 'http://localhost:3000/api'; 

export const getGenres = async () => {
  try {
    const response = await fetch(`${API_URL}/genres`); 
    if (!response.ok) throw new Error('Error al obtener los géneros');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createGenre = async (genreData) => {
  try {
    const response = await fetch(`${API_URL}/genres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(genreData), // Aquí mandas { name: "Acción" } como pide tu controlador
    });
    if (!response.ok) throw new Error('Error al crear el género');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGenre = async (id,data)=>{
  const res = await fetch(`${API_URL}/genres/${id}`,
    {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if(!res.ok) throw new Error("Error al actualizar genero");
    return await res.json();

}

export const deleteGenre = async (id) => {
  const res = await fetch(`${API_URL}/genres/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el género");
  return await res.json();
};