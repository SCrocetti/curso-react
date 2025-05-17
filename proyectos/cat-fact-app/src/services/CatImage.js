const CAT_IMAGE_API_BASE_URL = 'https://cataas.com';
export const fetchCatImage = (fact)=>{
    console.log(fact)
    const firstWords = fact.split(' ').slice(0, 3).join(' ');
    return fetch(`${CAT_IMAGE_API_BASE_URL}/cat/says/${firstWords}?json=true`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error with cat image resp');
            }
            return response.json();
    })
    .then((data) => {
        const newImage = data.url;
        return newImage;
    })
    .catch((err) => {
        console.error(err);
        return Promise.reject(`Error fetching image: ${err.message}`);
    })
}