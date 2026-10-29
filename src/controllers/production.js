// Compañías de producción
export const createProductionCompany = (req, res) => {
    if (!req.body?.name) {
        return res.status(400).json({
            error: 'El campo "name" es obligatorio'
        });
    }

    return handleRequest(
        res,
        () => catalogService.createProductionCompanyService(req.body),
        201
    );
};

export const getProductionCompanies = (req, res) =>
    handleRequest(
        res,
        () => catalogService.getProductionCompaniesService()
    );