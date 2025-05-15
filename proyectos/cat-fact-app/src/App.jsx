import { useEffect, useState } from 'react';
import './App.css';
const CAT_FACT_API_URL = 'https://catfact.ninja/fact';
const CAT_IMAGE_API_BASE_URL = 'https://cataas.com';

export const App = () => {
    const [catFact, setCatFact] = useState(null);
    const [catImage, setCatImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchCatFact = () => {
        fetch(CAT_FACT_API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error with cat fact resp');
                }
                return response.json();
            })
            .then((data) => {
                const newFact = data.fact;
                setCatFact(newFact);
            })
            .catch((err) => {
                console.error(err);
                setError(`Error fetching fact: ${err.message}`);
                setCatFact(null);
            });
    }
    useEffect(() =>{
        fetchCatFact();
    },[]);
    useEffect(() => {
        if (catFact) {
            setError(null);
            const firstWords = catFact.split(' ').slice(0, 3).join(' ');
            setLoading(true);
            fetch(`${CAT_IMAGE_API_BASE_URL}/cat/says/${firstWords}?json=true`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error with cat image resp');
                    }
                    return response.json();
                })
                .then((data) => {
                    const newImage = data.url;
                    setCatImage(newImage);
                })
                .catch((err) => {
                    console.error(err);
                    setError(`Error fetching image: ${err.message}`);
                    setCatImage(null);
                    setLoading(false);
                })
        }
    }, [catFact]);
    const handleClick = () => {
        fetchCatFact();
    };
    const handleLoading = () => {  
        setLoading(false);
    }
    const imageClass = !loading ? 'cat-image' : 'cat-image hidden';
    return (
        <main>
            <h1>Cat Fact App</h1>
            {error && <p className="error">{error}</p>}
            <button onClick={handleClick}>Get new cat fact</button>
            {catFact && (
                <section className="cat-fact">
                    <p >{catFact}</p>
                    {loading && <div className="spinner" />}
                    {(catImage) && <img src={catImage} className={imageClass} onLoad={handleLoading} alt="Cat image generated with the first words of the fact" />}
                </section> )}
            
        </main>
    );
}