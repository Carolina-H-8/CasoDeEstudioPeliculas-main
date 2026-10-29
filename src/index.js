
import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API de Gestión de Medios funcionando'
    });
});

// Rutas de la API
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
