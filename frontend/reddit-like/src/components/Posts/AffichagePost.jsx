import '../index.css';
import { useEffect, useState } from 'react';

function AffichagePost() {

    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchTest() {
        setLoading(true);
        try {
            const url = "http://localhost:1337/api/posts?populate=*";

            // Ajout des en-têtes si nécessaire
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + import.meta.env.VITE_TOKEN ,
                },
            });

            if (!response.ok) {
                throw new Error("API introuvable ou erreur réseau");
            }

            const data = await response.json();
            setTest(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTest();
    }, []);

    return (
        <div>
            {loading && <p>Chargement...</p>}
            {error && <p>Erreur : {error.message}</p>}
            <div>
                {/* {test.map( (el) => {
                return (
                    <div>
                        <p>{el.title}</p>
                        <p>{el.username}</p>
                        <p>{el.description}</p>
                        <img src={"http://localhost:1337" + el.media[0].url}></img>
                        <img src={"http://localhost:1337" + el.profil_pictures[0].url}></img>
                    </div>)})} */}
                </div>
        </div>
    );
}

export default AffichagePost;