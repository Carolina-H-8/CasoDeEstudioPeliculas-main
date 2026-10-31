
import { prisma } from '../lib/prisma.js';

export const createMediaService = async (data) => {
    const {
        genreIds = [],
        genreNames = [],
        type,
        director,
        productionCompany,
        ...mediaData
    } = data;

    // Buscar o crear el tipo
    const typeRecord = await prisma.type.upsert({
        where: { name: type },
        update: {},
        create: { name: type }
    });

    // Buscar o crear el director
    let directorRecord = await prisma.director.findFirst({
        where: { name: director }
    });

    if (!directorRecord) {
        directorRecord = await prisma.director.create({
            data: { name: director }
        });
    }

    // Buscar o crear la compañía
    let companyRecord = await prisma.productionCompany.findFirst({
        where: { name: productionCompany }
    });

    if (!companyRecord) {
        companyRecord = await prisma.productionCompany.create({
            data: { name: productionCompany }
        });
    }

    // Convertir los nombres de géneros a relaciones
    const genresToConnect = [];

    for (const name of genreNames) {
        const genre = await prisma.genre.findUnique({
            where: { name }
        });

        if (!genre) {
            throw new Error(`El género "${name}" no existe`);
        }

        genresToConnect.push({
            genre: { connect: { id: genre.id } }
        });
    }

    return prisma.media.create({
        data: {
            ...mediaData,

            type: {
                connect: { id: typeRecord.id }
            },

            director: {
                connect: { id: directorRecord.id }
            },

            productionCompany: {
                connect: { id: companyRecord.id }
            },

            genres: {
                create: [
                    ...genreIds.map((id) => ({
                        genre: { connect: { id } }
                    })),
                    ...genresToConnect
                ]
            }
        },

        include: {
            type: true,
            director: true,
            productionCompany: true,
            genres: {
                include: { genre: true }
            }
        }
    });
};

export const getMediaService = async () => {
    return await prisma.media.findMany({
        include: {
            type: true,
            director: true,
            productionCompany: true,
            genres: {
                include: {
                    genre: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};


export const updateMediaService = async (id,data)=>{
    const {
        genreIds,
        genreNames,
        type,
        director,
        productionCompany,
        ...mediaData
    } = data;

    const relations = {}

    if(type !== undefined){
        relations.type={
            connect:{
                id:(await prisma.type.upsert({
                    where: { name: type },
                    update: {},
                    create: { name: type }
                })).id
            }
        }
    }
    if (director !== undefined){
        let directorRecord = await prisma.director.findFirst({
            where:{name:director}
        })
        if (!directorRecord) {
            directorRecord = await prisma.director.create({
                data: { name: director }
            });
        }

        relations.director = {
            connect: { id: directorRecord.id }
        };

    }


    if(productionCompany !== undefined){
        let companyRecord = await prisma.productionCompany.findFirst({
            where : {name:productionCompany}
        })
        if(!companyRecord){
            companyRecord = await prisma.productionCompany.create({
                data:{ name:productionCompany}
            })
        }
        relations.productionCompany= {
            connect:{id:companyRecord.id}
        }
    }


    if(genreIds !== undefined || genreNames !== undefined){
        const ids = [...(genreIds || [])];
        for (const name of (genreNames || [])){
            const genre = await prisma.genre.findUnique({
                where : {name}
            })

            if(!genre){
                throw new Error(`El genero "${name}" no existe`)
            }
            ids.push(genre.id);
        }
        const uniqueIds = [...new Set(ids)];

        relations.genres = {
            deleteMany: {},
            create: uniqueIds.map((genreId) => ({
                genre: {
                    connect: { id: genreId }
                }
            }))
        };

    }

    return prisma.media.update({
        where: { id },
        data: {
            ...mediaData,
            ...relations
        },
        include: {
            type: true,
            director: true,
            productionCompany: true,
            genres: {
                include: { genre: true }
            }
        }
    });


}

export const deleteMediaService = async (id) => {
    return prisma.media.delete({
        where: { id }
    });
};