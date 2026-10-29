
import {
    createMediaService,
    getMediaService
} from "../service/mediaService.js";

export const createMedia = async (req, res) => {
    try {
        // Recibe los datos enviados por el cliente
        const {
            serial,
            title,
            synopsis,
            url,
            coverImage,
            releaseYear,
            type,
            director,
            productionCompany,
            genreNames = []
        } = req.body;
        // Validar campos obligatorios
        if (
            !serial?.trim() ||
            !title?.trim() ||
            !url?.trim() ||
            releaseYear === undefined ||
            releaseYear === null ||
            !Number.isInteger(Number(releaseYear)) ||
            !type?.trim() ||
            !director?.trim() ||
            !productionCompany?.trim()
        ) {
            return res.status(400).json({
                error: "Validación fallida",
                details: "Los campos serial, title, url, releaseYear, type, director y productionCompany son obligatorios. releaseYear debe ser un año entero."
            });
        }
        if (!Array.isArray(genreNames)) {
            return res.status(400).json({
                error: "Validación fallida",
                details: "genreNames debe ser una lista de nombres de géneros."
            });
        }

        // Enviar los datos al servicio
        const media = await createMediaService({
            serial: serial.trim(),
            title: title.trim(),
            synopsis,
            url: url.trim(),
            coverImage,
            releaseYear: Number(releaseYear),
            type: type.trim(),
            director: director.trim(),
            productionCompany: productionCompany.trim(),
            genreNames
        });

        return res.status(201).json(media);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al registrar película",
            details: error.message
        });
    }
};

export const getMedia = async (req, res) => {
    try {
        const mediaList = await getMediaService();
        return res.status(200).json(mediaList);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al obtener el catálogo de medios",
            details: error.message
        });
    }
};
