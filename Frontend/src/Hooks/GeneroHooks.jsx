import React, { useState, useEffect } from 'react';
import { getGenres, createGenre } from '../services/genreService';

export default function Generos() {
  const [genres, setGenres] = useState([]);
  const [newGenreName, setNewGenreName] = useState('');

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  // Manejar el envío del formulario para crear un género
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newGenreName.trim()) return;

    try {
      await createGenre({ name: newGenreName }); 
      setNewGenreName('');
      loadGenres(); 
    } catch (error) {
      alert('No se pudo guardar el género');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Géneros</h2>

      {/* Formulario de creación */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del género..."
          value={newGenreName}
          onChange={(e) => setNewGenreName(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>

      {/* Listado de géneros */}
      <ul>
        {genres.map((genre) => (
          <li key={genre.id || genre._id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
}