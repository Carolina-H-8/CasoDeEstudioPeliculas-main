const APIURL = "http://localhost:3000/api"

export const getAllMedia = async()=>{
    const response = await fetch (`${APIURL}/media`);
    if(!response.ok){
        throw new Error("Error al obtener catalogo de media");
    }
    return await response.json();

}

export const createMedia = async (mediaData)=>{
    const response = await fetch(`${APIURL}/media`,{
        method :"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(mediaData),
    });
    if (!response.ok) {
        throw new Error("Error al crear la produccion");
    }
    return await response.json();
}

export const updateMedia = async (id, mediaData) => {
    const response = await fetch(`${APIURL}/media/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mediaData),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Error al actualizar la producción");
    }
    return await response.json();
};

export const deleteMedia = async (id) => {
    const response = await fetch(`${APIURL}/media/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Error al eliminar la producción");
    }
    return await response.json();
};