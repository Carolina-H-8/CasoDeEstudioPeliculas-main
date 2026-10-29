
export const handleRequest = async (
    res,
    serviceMethod,
    status = 200
) => {
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