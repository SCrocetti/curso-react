import { useEffect, useState } from 'react';
import './App.css';
const CAT_FACT_API_URL = 'https://catfact.ninja/fact';
const CAT_IMAGE_API_BASE_URL = 'https://cataas.com';

export const App = () => {
    const [catFact, setCatFact] = useState(null);
    const [catImage, setCatImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>{
        fetch(CAT_FACT_API_URL)
            .then((response)=> {
                if (!response.ok) {
                    throw new Error('Error with cat fact resp');
                }
                return response.json()
            })
            .then((data) => {
                const newFact= data.fact;
                setCatFact(newFact);
            })
            .catch((err) => {
                console.error(err);
                setError(`Error fetching fact: ${err.message}`);
            });
    },[]);
    useEffect(() => {
        if (catFact) {
            const firstWord = catFact.split(' ')[0];
            fetch(`${CAT_IMAGE_API_BASE_URL}/cat/says/${firstWord}?json=true&`)
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
                });
        }
    }, [catFact]);
    return (
        <main>
            <h1>Cat Fact App</h1>
            {error && <p className="error">{error}</p>}
            {catFact && (
                <section className="cat-fact">
                    <p>{catFact}</p>
                    {catImage && <img src={catImage} className="cat-image" alt="Cat image generated with the first word of the fact" />}
                </section>
            )}
        </main>
    );
}