// Directores
export const createDirector = (req, res) => {
    if (!req.body?.name) {
        return res.status(400).json({
            error: 'El campo "name" es obligatorio'
        });
    }

    return handleRequest(
        res,
        () => catalogService.createDirectorService(req.body),
        201
    );
};

export const getDirectors = (req, res) =>
    handleRequest(res, () => catalogService.getDirectorsService());