// Tipos
import { prisma } from '../lib/prisma.js';
import * as catalogService from '../service/catalogService.js';
import { handleRequest } from '../utils/handleRequest.js';

export const createType = (req, res) => {
    if (!req.body?.name) {
        return res.status(400).json({
            error: 'El campo "name" es obligatorio'
        });
    }

    return handleRequest(
        res,
        () => catalogService.create(prisma.type, req.body),
        201
    );
};
export const getType = (req, res) =>{
    handleRequest(res, () => catalogService.getData(prisma.type));
}
// Actualizar Tipo
export const updateType = (req, res) => {
    const { id } = req.params; 
    
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'El cuerpo de la solicitud no puede estar vacío para actualizar'
        });
    }

    return handleRequest(
        res,
        () => catalogService.update(prisma.type,id, req.body),
        200 
    );
};
// Eliminar Tipo
export const deleteType = (req, res) => {
    const { id } = req.params; 

    return handleRequest(
        res,
        () => catalogService.deleteData(prisma.type,id),
        200 
    );
};