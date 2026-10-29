
import * as catalogService from '../service/catalogService.js';

// Recibe las solicitudes HTTP, llama al servicio y devuelve JSON.
const handleRequest = async (res, serviceMethod, status = 200) => {
    try {
        const result = await serviceMethod();
        return res.status(status).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Error procesando solicitud',
            details: error.message
        });
    }
};



