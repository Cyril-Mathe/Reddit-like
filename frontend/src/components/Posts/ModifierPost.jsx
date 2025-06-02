import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            const url = `${import.meta.env.VITE_NEON_URL}/api/posts/${id}`;


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
                setImage(data.data.media[0].url)
            }
        } catch (error) {
            setError(error)
            return
        } finally {
            setLoading(false)
        }
    }

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
            setError(formError);
            return;
        }


        try {
            let fileIds = [];

            if (newimage.length > 0) {
                const formData = new FormData();
                newimage.forEach(file => formData.append('files', file))

                const img = await axios.post(`${import.meta.env.VITE_NEON_URL}/api/upload`,
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
            const { status } = await axios.put(`${import.meta.env.VITE_NEON_URL}/api/posts/${id}`, user, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setUpdated(!updated)
            if (status === 200) {
                toast.success("Post modifié avec succès !")
                navigate("/homepage")
            }
        } catch (error2) {
            console.error("Erreur", error2);
        }
    };


    useEffect(() => {
        fetchModifier()
    }, [updated])

    return (
        <div className="min-h-screen bg-[#e8f4e8] dark:bg-[#111827]">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64 min-h-screen">
                    <div className="max-w-xl mx-auto my-10 p-8 bg-white shadow-lg rounded-2xl dark:bg-[#334155]">
                        <div>
                            <h2 className="text-3xl font-bold text-[#242424] mb-6 text-center dark:text-white">Modifications :</h2>

                            {loading && <p>Loading...</p>}
                            {error && <p>{error.message}</p>}
                            {modifier && (
                                <div>
                                    <div className="space-y-6">
                                        <div className="bg-[#c8d3ff] dark:bg-[#646e94] p-4 rounded-lg text-center">
                                            <p className="text-lg font-semibold text-[#4a4a4a] dark:text-white">
                                                Titre  <span className="block font-normal dark:text-white">{modifier.title}</span>
                                            </p>
                                            <p className="text-lg font-semibold text-[#4a4a4a] dark:text-white">
                                                Description  <span className="block font-normal dark:text-white break-all">{modifier.description}</span>
                                            </p>
                                            {image && (
                                                <img
                                                    src={`${import.meta.env.VITE_NEON_URL}${image}`}
                                                    alt="Illustration"
                                                    className="w-full h-auto mt-4"
                                                />
                                            )}
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                                rows="2"
                                                name="title"
                                                value={modifier.title}
                                                onChange={handleChange} />
                                            <textarea
                                                className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                                rows="2"
                                                name="description"
                                                value={modifier.description}
                                                onChange={handleChange} />
                                            <input
                                                type="file"
                                                name="files"
                                                className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                                onChange={handleImage}
                                            />
                                            <div className='flex justify-between'>
                                                <button
                                                    type='submit'
                                                    className="bg-[#86C7C3] hover:bg-[#A8DBD9] text-white font-semibold py-3 mt-4 px-4 rounded-lg transition-colors dark:text-white"
                                                >
                                                    Modifier</button>
                                                <div
                                                    onClick={() => navigate("/homepage")}
                                                    className="focus:outline-none bg-red-600 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg py-3 mt-4 px-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                >
                                                    Annuler</div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}