import { useEffect, useState } from 'react';
import {fetchCatFact} from '../services/CatFact';
export const useCatFact = () => { 
    const [catFact, setCatFact] = useState(null);
    const [error, setError] = useState(null);
    const refreshCatFact = () => {
        setError(null);
        fetchCatFact().then((fact) => {
            setCatFact(fact);
        }).catch((err) => {
            setError(err);
        });
    }
    useEffect(() =>{
        refreshCatFact();
    },[]);
    return { catFact, error, refreshCatFact};
}