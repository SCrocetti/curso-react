import { useEffect, useState } from 'react';
import { fetchCatImage } from '../services/CatImage';
export const useCatImage = (fact) =>{
    const [catImage, setCatImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const stopLoading= ()=>{
        setLoading(false);
    }
    useEffect(() => {
        if(fact){
            setLoading(true);
            fetchCatImage(fact).then((newImage) => {
                console.log(newImage)
                setCatImage(newImage);
            }).catch((err) => {
                setError(err);
                stopLoading();
            });
        }
    }, [fact]);
    return {catImage,loading,stopLoading,error}
}