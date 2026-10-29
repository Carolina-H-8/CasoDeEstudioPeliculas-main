// Géneros

import * as catalogService from '../service/catalogService.js';
import { handleRequest } from '../utils/handleRequest.js';

export const createGenre = (req, res) => {
    if (!req.body?.name) {
        return res.status(400).json({
            error: 'El campo "name" es obligatorio'
        });
    }

    return handleRequest(
        res,
        () => catalogService.createGenreService(req.body),
        201
    );
};

export const getGenres = (req, res) =>
    handleRequest(res, () => catalogService.getGenresService());