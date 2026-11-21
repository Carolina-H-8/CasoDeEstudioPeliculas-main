
import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
}));

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API de Gestión de Medios funcionando'
    });
});

// Rutas de la API
app.use('/api', routes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});