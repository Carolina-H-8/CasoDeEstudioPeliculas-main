import { useState,useEffect } from "react";
import { getAllMedia } from "../test/MediaService";

export function useMedia(){
    const [media,setMedia]=useState([]);
    const [loading,setLoading]=useState(true)
    const [error, setError]=useState(null)

    useEffect(()=>{
        const fetchMedia = async()=>{
            try{
                setLoading(true)
                const data = await getAllMedia();
                setMedia(data)
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false)
            }
        }
        fetchMedia();
    },[])
    return{media,loading,error}
}