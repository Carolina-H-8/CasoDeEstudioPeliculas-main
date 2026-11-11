
import { prisma } from '../lib/prisma.js';
import * as catalogService from '../service/catalogService.js';
import { handleRequest } from '../utils/handleRequest.js';
// Directores
export const createDirector = (req, res) => {
    if (!req.body?.name) {
        return res.status(400).json({
            error: 'El campo "name" es obligatorio'
        });
    }

    return handleRequest(
        res,
        () => catalogService.create(prisma.director, req.body),
        201
    );
};
export const getDirector = (req, res) =>{
    handleRequest(res, () => catalogService.getData(prisma.director));
}
export const updateDirector = (req, res)=>{
    const {id} = req.params
    if(!req.body || Object.keys(req.body).length == 0 ){
        return res.status(400).json({
            error: 'El cuerpo de la solicitud no puede estar vacío para actualizar'
        })
    }
    return handleRequest(
            res,
            () => catalogService.update(prisma.director, id, req.body),
            200 
        );
}
export const deleteDirector = (req,res)=>{
    const { id } = req.params
        return handleRequest(
            res,
            () => catalogService.deleteData(prisma.director, id),
            200
        );
}