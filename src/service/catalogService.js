import { prisma } from '../lib/prisma.js';

//Funcion reusable para los controllers
export const create = async (model,data) =>{
    return model.create({ data });
}
export const getData = async(model)=>{
    return model.findMany({orderBy:{id:'desc'}})
}   
export const update = async(model,id,data)=>{
    return model.update({where:{id},data})
}
export const deleteData = async(model, id)=>{
    return model.delete({where:{id}})
}
