import './App.css';
import { useCatFact } from './hooks/useCatFact';
import { useCatImage } from './hooks/useCatImage';


export const App = () => {
    const { catFact, error: catFactError, refreshCatFact }  = useCatFact();
    const { catImage, loading, stopLoading,error:catImageError} =useCatImage(catFact);
    
    const handleClick = () => {
        refreshCatFact();
    };
    const handleLoading = () => {  
        stopLoading();
    }
    const imageClass = !loading ? 'cat-image' : 'cat-image hidden';
    return (
        <main>
            <h1>Cat Fact App</h1>
            {catFactError && <p className="error">{catFactError}</p>}
            {catImageError && <p className="error">{catImageError}</p>}
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