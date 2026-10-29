
import * as catalogService from '../service/catalogService.js';
import { handleRequest } from '../utils/handleRequest.js';
// Compañías de producción
export const createProductionCompany = (req, res) => {
    if (!req.body?.name) {
        return res.status(400).json({
            error: 'El campo "name" es obligatorio'
        });
    }

    return handleRequest(
        res,
        () => catalogService.create(prisma.productionCompany, req.body),
        201
    );
};
export const getProductionCompany= (req, res) => {
    handleRequest(
        res,
        () => catalogService.getData(prisma.productionCompany)
    );
};
export const updateProductionCompany= (req, res) => {
    const { id } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'El cuerpo de la solicitud no puede estar vacío para actualizar'
        });
    }

    return handleRequest(
        res,
        () => catalogService.update(prisma.productionCompany, id, req.body),
        200
    );
};
export const deleteProductionCompany= (req, res) => {
    const { id } = req.params
    return handleRequest(
        res,
        () => catalogService.deleteData(prisma.productionCompany, id),
        200
    );
};