import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

export default function ModifierPost() {
    const { id } = useParams();
    const [modifier, setModifier] = useState('')
    const [image, setImage] = useState([])
    const [newimage, setNewImage] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    let navigate = useNavigate();
    const token = localStorage.getItem('token');


    async function fetchModifier() {
        setLoading(true)
        try {
            const url = `http://localhost:1337/api/posts/${id}?populate=*`;


            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            const data = await response.json()
            setModifier(data.data)
            if (data.data.media == null) {
              setImage(null)
            } else {
                setImage(data.media[0].url)
            }
        } catch (error) {
            setError(error)
            return
        } finally {
            setLoading(false)
        }
    }

    const [error2, setError2] = useState({});


    const handleChange = (event) => {
        const { name, value } = event.target;
        setModifier(prevModifier => ({ ...prevModifier, [name]: value }));
    };

    const handleImage = event => {
        setNewImage(Array.from(event.target.files))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formError = {};
        if (!modifier.title) formError.title = 'Title est requi';
        if (!modifier.description) formError.description = 'Description est requise';

        if (Object.keys(formError).length > 0) {
            setError2(formError);
            return;
        }


        try {
            let fileIds = [];

            if (newimage.length > 0) {
                const formData = new FormData();
                newimage.forEach(file => formData.append('files', file))

                const img = await axios.post('http://localhost:1337/api/upload',
                    formData,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                )
                const uploaded = img.data
                fileIds = uploaded.map(f => f.id)
            }

            const user = {
                title: modifier.title,
                description: modifier.description,
                ...(fileIds.length > 0 && { media: fileIds })
            }
            const { status } = await axios.put(`http://localhost:1337/api/posts/${id}`, user, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            setUpdated(!updated)
            alert("Votre post à été modifier avec succès !");
            if (status === 200) navigate("/homepage")
        } catch (error2) {
            console.error("Erreur", error2);
        }
    };


    useEffect(() => {
        fetchModifier()

    }, [updated])

    return (
        <div className="min-h-screen bg-[#e8f4e8]">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64 min-h-screen">
                    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
                        <div>
                            <h2 className="text-3xl font-bold text-[#242424] mb-6 text-center">Modifications :</h2>

                            {loading && <p>Loading...</p>}
                            {error && <p>{error.message}</p>}
                            {modifier && (
                                <div>
                                    <div className="space-y-6">
                                        <div className="bg-[#919fd4f5] p-4 rounded-lg border border-gray-200 text-center">
                                            <p className="text-lg font-semibold text-[#4a4a4a]">
                                                Titre  <span className="block font-normal">{modifier.title}</span>
                                            </p>
                                            <p className="text-lg font-semibold text-[#4a4a4a]">
                                                Description  <span className="block font-normal">{modifier.description}</span>
                                            </p>
                                            {image && (
                                                <img
                                                    src={`http://localhost:1337${image}`}
                                                    alt="Illustration"
                                                    className="w-full h-auto"
                                                />
                                            )}
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none mb-3 mt-3"
                                                rows="2"
                                                name="title"
                                                value={modifier.title}
                                                onChange={handleChange} />
                                            <textarea
                                                className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none"
                                                rows="2"
                                                name="description"
                                                value={modifier.description}
                                                onChange={handleChange} />
                                            <input
                                                type="file"
                                                name="files"
                                                className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none mt-3"
                                                onChange={handleImage}
                                            />
                                            <div className='flex gap-[1rem]'>
                                                <button
                                                    type='submit'
                                                    className=" bg-[#86C7C3] hover:bg-[#A8DBD9] text-[#242424] font-semibold py-3 mt-4 px-4 rounded-lg transition-colors"
                                                >
                                                    Modifier</button>
                                                <button
                                                    onClick={() => navigate("/homepage")}
                                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg py-3 mt-4 px-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                >    
                                                    Annuler</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}