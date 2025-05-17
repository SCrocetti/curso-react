const CAT_FACT_API_URL = 'https://catfact.ninja/fact';
export const fetchCatFact = () => {
    return fetch(CAT_FACT_API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error with cat fact resp');
            }
            return response.json();
        })
        .then((data) => {
            const newFact = data.fact;
            return newFact;
        })
        .catch((err) => {
            console.error(err);
            return Promise.reject(`Error fetching fact: ${err.message}`);
        });
}