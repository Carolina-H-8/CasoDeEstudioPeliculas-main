
import { prisma } from '../lib/prisma.js';

// Géneros
export const createGenreService = async (data) =>
    prisma.genre.create({ data });

export const getGenresService = async () =>
    prisma.genre.findMany({ orderBy: { id: 'desc' } });

// Directores
export const createDirectorService = async (data) =>
    prisma.director.create({ data });

export const getDirectorsService = async () =>
    prisma.director.findMany({ orderBy: { id: 'desc' } });

// Compañías de producción
export const createProductionCompanyService = async (data) =>
    prisma.productionCompany.create({ data });

export const getProductionCompaniesService = async () =>
    prisma.productionCompany.findMany({ orderBy: { id: 'desc' } });

// Tipos
export const createTypeService = async (data) =>
    prisma.type.create({ data });

export const getTypesService = async () =>
    prisma.type.findMany({ orderBy: { id: 'desc' } });
