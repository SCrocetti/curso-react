import { useEffect, useState } from 'react';
const CAT_FACT_API_URL = 'https://catfact.ninja/fact';
const CAT_IMAGE_API_BASE_URL = 'https://cataas.com';

export const App = () => {
    const [catFact, setCatFact] = useState(null);
    const [catImage, setCatImage] = useState(null);

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
        }
    }, [catFact]);
    return (
        <main>
            <h1>Cat Fact App</h1>
            {catFact && (
                <section>
                    <p>{catFact}</p>
                    {catImage && <img src={catImage} alt="Cat" />}
                </section>
            )}
        </main>
    );
}