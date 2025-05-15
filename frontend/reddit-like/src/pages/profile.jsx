import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Sidebar/Sidebar';

export default function Profile({ user, setUser }) {
    const [userProfile, setUserProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [Profilpic, setProfilpic] = useState(null);
    const [newProfilpic, setNewProfilpic] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    
 // !! 🚑️ avatar INVALIDE CHANGER PAR Profilpic 🚑️ !!

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: ''
    });

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Récupération des informations utilisateur
    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:1337/api/users/me?populate=Profilpic', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setUserProfile(response.data);
            setFormData({
                username: response.data.username,
                email: response.data.email,
                bio: response.data.bio || ''
            });
            
            // Récupérer la photo de profil s'il existe
            if (response.data.Profilpic && response.data.Profilpic.url) {
                setProfilpic(response.data.Profilpic.url);
            }
            
            // Récupérer les posts de l'utilisateur
            fetchUserPosts(response.data.id);
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
            setError("Impossible de récupérer les informations utilisateur. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
        }
    };

    // Récupération des posts de l'utilisateur
    const fetchUserPosts = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:1337/api/posts?filters[author][id][$eq]=${userId}&populate=media`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setPosts(response.data.data || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des posts:", error);
            setError("Impossible de récupérer vos posts. Veuillez réessayer plus tard.");
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        
        fetchUserData();
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleProfilpicClick = () => {
        fileInputRef.current.click();
    };

    const handleProfilpicChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewProfilpic(file);
            
            // Afficher un aperçu de l'image
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilpic(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadProfilpic = async () => {
        if (!newProfilpic) return null;
        
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('files', newProfilpic);
            
            const uploadRes = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setUploading(false);
            return uploadRes.data[0].id; // Retourne l'ID de l'image uploadée
        } catch (error) {
            console.error("Erreur lors de l'upload de la photo de profil:", error);
            setUploading(false);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let ProfilpicId = null;
            
            // Si une nouvelle photo de profil a été sélectionnée, on l'upload
            if (newProfilpic) {
                ProfilpicId = await uploadProfilpic();
            }
            
            // Préparation des données à envoyer - Exclure email qui n'est pas modifiable
            const updateData = {
                username: formData.username,
                bio: formData.bio
            };
            
            // Si on a un ID de photo de profil, on l'ajoute aux données
            if (ProfilpicId) {
                updateData.Profilpic = ProfilpicId;
            }
            
            const response = await axios.put('http://localhost:1337/api/users/me?populate=*', updateData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            setUserProfile(response.data);
            setEditMode(false);
            setNewProfilpic(null);
            alert("Profil mis à jour avec succès !");
            
            // Rafraîchir les données du profil
            fetchUserData();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil:", error);
            alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
        }
    };

    const navigateToEditPost = (postId) => {
        navigate(`/homepage/${postId}`);
    };

    const navigateToDeletePost = (postId) => {
        navigate(`/homepage/supp/${postId}`);
    };

    const navigateToPostDetails = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="min-h-screen bg-[#e8f4e8]">
            <Navbar user={user} setUser={setUser} />
            <div className="container mx-auto px-4 py-8 ml-64">
                <div className="max-w-2xl mx-auto ml-64"> 
                    {loading ? (
                        <p className="text-center text-gray-600 p-4 bg-white rounded-xl shadow-sm mb-4">Chargement...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 p-4 bg-white rounded-xl shadow-sm mb-4">{error}</p>
                    ) : (
                        <>
                            {/* Profil utilisateur */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div 
                                            className={`w-20 h-20 rounded-full overflow-hidden mr-4 flex items-center justify-center bg-gray-200 ${editMode ? 'cursor-pointer hover:opacity-80' : ''}`}
                                            onClick={editMode ? handleProfilpicClick : undefined}
                                            title={editMode ? "Cliquez pour changer d'image" : ""}
                                        >
                                            {Profilpic ? (
                                                <img 
                                                    src={Profilpic.startsWith('data:') ? Profilpic : `http://localhost:1337${Profilpic}`} 
                                                    alt="Photo de profil" 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-2xl font-bold text-gray-500">
                                                    {userProfile?.username?.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                            {editMode && (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    ref={fileInputRef}
                                                    onChange={handleProfilpicChange}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-semibold text-gray-800">
                                                {userProfile?.username}
                                            </h1>
                                            <p className="text-gray-500">{userProfile?.email}</p>
                                            {!editMode && userProfile?.bio && (
                                                <p className="mt-2 text-gray-700">{userProfile.bio}</p>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => setEditMode(!editMode)}
                                            className="ml-auto bg-orange-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                        >
                                            {editMode ? 'Annuler' : 'Modifier'}
                                        </button>
                                    </div>

                                    {editMode && (
                                        <form onSubmit={handleSubmit} className="mt-6">
                                            {editMode && (
                                                <div className="mb-4 text-center">
                                                    <p className="text-sm text-gray-500 mb-2">
                                                        {newProfilpic ? 'Nouvelle image sélectionnée' : 'Cliquez sur votre photo de profil pour changer d\'image'}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="mb-4">
                                                <label className="block text-gray-500 text-sm mb-1">Nom d'utilisateur</label>
                                                <input
                                                    className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none"
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-500 text-sm mb-1">Email (non modifiable)</label>
                                                <input
                                                    className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none text-gray-500"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-500 text-sm mb-1">Bio</label>
                                                <textarea
                                                    className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none"
                                                    name="bio"
                                                    rows="3"
                                                    value={formData.bio}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                            <div className="text-right">
                                                <button
                                                    type="submit"
                                                    disabled={uploading}
                                                    className="bg-orange-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    {uploading ? 'Chargement...' : 'Enregistrer'}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* Liste des posts de l'utilisateur */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-800">Mes publications</h2>
                                </div>
                                
                                {posts.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">
                                        Vous n'avez pas encore créé de publications.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {posts.map((post) => (
                                            <div key={post.id} className="p-4">
                                                <div className="mb-2 cursor-pointer" onClick={() => navigateToPostDetails(post.id)}>
                                                    <h3 className="text-lg font-medium text-gray-800">{post.title}</h3>
                                                    <p className="text-gray-600 mt-1">{post.description}</p>
                                                </div>
                                                
                                                {post.media && post.media.length > 0 && (
                                                    <div className="mb-3 rounded-lg overflow-hidden cursor-pointer" onClick={() => navigateToPostDetails(post.id)}>
                                                        <img
                                                            src={`http://localhost:1337${post.media[0].url}`}
                                                            alt="Illustration"
                                                            className="w-full h-auto max-h-64 object-cover"
                                                        />
                                                    </div>
                                                )}
                                                
                                                <div className="flex space-x-3 mt-2">
                                                    <button
                                                        onClick={() => navigateToEditPost(post.id)}
                                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-lg text-sm"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        onClick={() => navigateToDeletePost(post.id)}
                                                        className="bg-orange-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg text-sm transition-colors"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}