// Tipos
export const createType = (req, res) => {
    if (!req.body?.name) {
        return res.status(400).json({
            error: 'El campo "name" es obligatorio'
        });
    }

    return handleRequest(
        res,
        () => catalogService.createTypeService(req.body),
        201
    );
};

export const getTypes = (req, res) =>
    handleRequest(res, () => catalogService.getTypesService());