import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SyncLoader from 'react-spinners/SyncLoader';

export default function ProfilePic() {
    const [loading, setLoading] = useState(true);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState('');
    const [image, setImage] = useState(null);
    const [newimage, setNewImage] = useState([]);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'avatar', 'password'
    const [citation, setCitation] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = localStorage.getItem('token');
    const userid = token ? jwtDecode(token).id : null;
    const url = `${import.meta.env.VITE_NEON_URL}/api/users/${userid}?populate=avatar`;

    // Citations
    const Mearde = {
        "Cyril": "Cyril : ''Commit to the bitbucket'' ",
        "Laurent": "Laurent : ''Pull request M.A.S.T.E.R'' ",
        "Arthur": "Arthur : ''Push it to the limit'' ",
        "Océane": "Océnae : ''Merge like a boss'' ",
        "William": "William : ''Fetch like a pro'' ",
    };

    useEffect(() => {
        // Choisir une citation et configurer l'écran de chargement
        const randomPhrase = Object.values(Mearde)[Math.floor(Math.random() * Object.values(Mearde).length)];
        setCitation(randomPhrase);
        const timer = setTimeout(() => setLoadingScreen(false), 1574);
        
        // Charger les données utilisateur
        fetchUser();
        
        return () => clearTimeout(timer);
    }, []);

    async function fetchUser() {
        setLoading(true);
        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            setUser(data);
            setImage(data.avatar?.url || null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmiteName = async (event) => {
        event.preventDefault();
        try {
            await axios.put(url, { username: user.username }, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            toast.success("Votre nom a été modifié avec succès !");
            fetchUser();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmiteMail = async (event) => {
        event.preventDefault();
        try {
            await axios.put(url, { email: user.email }, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            toast.success("Votre mail a été modifié avec succès !");
            fetchUser();
        } catch (error) {
            console.error(error);
        }
    };

    const handleImage = event => {
        setNewImage(Array.from(event.target.files));
    };

    const handleSubmitImage = async (event) => {
        event.preventDefault();
        
        try {
            let fileIds = [];
            if (newimage.length > 0) {
                const formData = new FormData();
                newimage.forEach(file => formData.append('files', file));

                const img = await axios.post(`${import.meta.env.VITE_NEON_URL}/api/upload`,
                    formData,
                    { headers: { "Authorization": `Bearer ${token}` } }
                );
                fileIds = [img.data[0].id];
            }

            if (fileIds.length > 0) {
                await axios.put(url, { avatar: fileIds }, {
                    headers: { "Authorization": `Bearer ${token}` },
                });
                toast.success("Votre avatar a été modifié avec succès !");
                fetchUser();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmitPassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.warning('Le mot de passe et celui de la confirmation ne correspondent pas');
        }
        
        if (!window.confirm('Confirmer le changement de mot de passe ?')) return;
        
        try {
            await axios.post(`${import.meta.env.VITE_NEON_URL}/api/auth/change-password`,
                {
                    currentPassword: currentPassword,
                    password: newPassword,
                    passwordConfirmation: confirmPassword,
                },
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            toast.success("Votre mot de passe a été modifié avec succès !");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
        }
    };

    if (loadingScreen) {
        return (
            <div className="w-full h-screen bg-gray-500 fixed top-0 left-0 transition-transform duration-700">
                <div className="w-full h-full flex flex-col justify-center items-center gap-8">
                    <img src="./assets/images/threadly.png" alt="Logo" className="w-75 h-auto" />
                    <p className="text-5xl italic font-serif text-gray-300">{citation}</p>
                    <SyncLoader loading color="#D1D5DC" margin={5} size={30} speedMultiplier={1} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e8f4e8] dark:bg-[#111827]">
            <div className="flex">
                <Sidebar setUser={setUser} />
                <div className="w-full md:ml-64 p-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Mon Profil</h1>
                            
                            {/* Onglets de navigation */}
                            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                                <button 
                                    className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'border-b-2 border-[#7bc297] text-[#5eaa7d] dark:border-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    Informations
                                </button>
                                <button 
                                    className={`py-2 px-4 font-medium ${activeTab === 'avatar' ? 'border-b-2 border-[#7bc297] text-[#5eaa7d] dark:border-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                                    onClick={() => setActiveTab('avatar')}
                                >
                                    Avatar
                                </button>
                                <button 
                                    className={`py-2 px-4 font-medium ${activeTab === 'password' ? 'border-b-2 border-[#7bc297] text-[#5eaa7d] dark:border-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                                    onClick={() => setActiveTab('password')}
                                >
                                    Mot de passe
                                </button>
                            </div>

                            {loading && 
                                <div className="flex justify-center my-8">
                                    <SyncLoader color="#7bc297" size={10} />
                                </div>
                            }
                            
                            {error && 
                                <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
                                    {error.message}
                                </div>
                            }
                            
                            {!loading && user && (
                                <>
                                    {/* Onglet Informations */}
                                    {activeTab === 'profile' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center space-x-4 mb-6">
                                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                                                    {image ? (
                                                        <img
                                                            src={`${import.meta.env.VITE_NEON_URL}${image}`}
                                                            alt="Avatar"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{user.username}</h2>
                                                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <form onSubmit={handleSubmiteName} className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Nom d'utilisateur
                                                    </label>
                                                    <div className="flex space-x-2">
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={user.username}
                                                            onChange={handleChange}
                                                            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#7bc297] focus:border-[#7bc297] dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        />
                                                        <button 
                                                            type="submit"
                                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7bc297] dark:bg-blue-600 hover:bg-[#5eaa7d] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7bc297] dark:focus:ring-blue-500 transition-colors duration-200"
                                                        >
                                                            Modifier
                                                        </button>
                                                    </div>
                                                </form>

                                                <form onSubmit={handleSubmiteMail} className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Adresse email
                                                    </label>
                                                    <div className="flex space-x-2">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={user.email}
                                                            onChange={handleChange}
                                                            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#7bc297] focus:border-[#7bc297] dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        />
                                                        <button 
                                                            type="submit"
                                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7bc297] dark:bg-blue-600 hover:bg-[#5eaa7d] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7bc297] dark:focus:ring-blue-500 transition-colors duration-200"
                                                        >
                                                            Modifier
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}

                                    {/* Onglet Avatar */}
                                    {activeTab === 'avatar' && (
                                        <div className="space-y-6">
                                            <div className="flex flex-col items-center">
                                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-6">
                                                    {image ? (
                                                        <img
                                                            src={`${import.meta.env.VITE_NEON_URL}${image}`}
                                                            alt="Avatar"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                <form onSubmit={handleSubmitImage} className="w-full max-w-md">
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Changer d'avatar
                                                        </label>
                                                        <input
                                                            type="file"
                                                            name="files"
                                                            onChange={handleImage}
                                                            className="w-full text-sm text-gray-500 
                                                                file:mr-4 file:py-2 file:px-4 
                                                                file:rounded-md file:border-0 
                                                                file:text-sm file:font-semibold 
                                                                file:bg-[#7bc297] file:text-white 
                                                                hover:file:bg-[#5eaa7d] 
                                                                dark:text-gray-300 
                                                                dark:file:bg-blue-600 
                                                                dark:file:text-white
                                                                dark:hover:file:bg-blue-700
                                                                transition-colors duration-200"
                                                        />
                                                    </div>
                                                    <button 
                                                        type="submit"
                                                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7bc297] dark:bg-blue-600 hover:bg-[#5eaa7d] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7bc297] dark:focus:ring-blue-500 transition-colors duration-200"
                                                    >
                                                        Mettre à jour l'avatar
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}

                                    {/* Onglet Mot de passe */}
                                    {activeTab === 'password' && (
                                        <div>
                                            <form onSubmit={handleSubmitPassword} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Mot de passe actuel
                                                    </label>
                                                    <input 
                                                        type="password"
                                                        placeholder="Saisissez votre mot de passe actuel"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#7bc297] focus:border-[#7bc297] dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Nouveau mot de passe
                                                    </label>
                                                    <input 
                                                        type="password"
                                                        placeholder="Saisissez votre nouveau mot de passe"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#7bc297] focus:border-[#7bc297] dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Confirmer le mot de passe
                                                    </label>
                                                    <input 
                                                        type="password"
                                                        placeholder="Confirmez votre nouveau mot de passe"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#7bc297] focus:border-[#7bc297] dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                                
                                                <button 
                                                    type="submit"
                                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7bc297] dark:bg-blue-600 hover:bg-[#5eaa7d] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7bc297] dark:focus:ring-blue-500 transition-colors duration-200"
                                                >
                                                    Changer de mot de passe
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}