import '../index.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Homepage({ user, setUser }) {
    // États pour gérer les données
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [followedPosts, setFollowedPosts] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Référence pour l'input de fichier
    const fileInputRef = useRef(null);
    
    // Pour la navigation programmée
    const navigate = useNavigate();

    // Fonction pour récupérer les articles
    async function fetchTest() {
        setLoading(true);
        try {
            const url = "http://localhost:1337/api/articles";

            const token = localStorage.getItem("token");
            console.log("Token envoyé :", token);

            // Ajout des en-têtes si nécessaire
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    setUser(null);
                    throw new Error("Token invalide ou expiré. Veuillez vous reconnecter.")
                }
                throw new Error("API introuvable ou erreur réseau");
            }
            
            const data = await response.json();
            console.log(data.data);
            setPosts(data.data || getDemoPosts());

        } catch (error) {
            setError(error);
            setPosts(getDemoPosts());
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTest();
    }, []);

    // Données de démonstration en cas d'erreur
    function getDemoPosts() {
        return [
            { 
                id: 1, 
                title: "Titre d'un super méga drama de fou", 
                content: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.", 
                image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1000",
                user: { 
                    username: "Xx-Totodu91-xX",
                    profilePic: "https://randomuser.me/api/portraits/men/1.jpg" 
                }
            },
            { 
                id: 2, 
                title: "Un voyage incroyable en Asie", 
                content: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim.", 
                image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1000",
                user: { 
                    username: "Xx-Totodu91-xX",
                    profilePic: "https://randomuser.me/api/portraits/men/1.jpg" 
                }
            }
        ];
    }

    // Gérer la soumission d'un nouveau post
    const handlePostSubmit = (e) => {
        e.preventDefault();
        console.log("Post soumis:", postContent);
        console.log("Image sélectionnée:", selectedImage);
        setPostContent("");
        setSelectedImage(null);
    };

    // Suivre/Ne plus suivre un post
    const toggleFollow = (postId) => {
        setFollowedPosts({
            ...followedPosts,
            [postId]: !followedPosts[postId]
        });
    };
    
    // Fonction pour rediriger vers la page Subreddits
    const goToSubreddits = () => {
        navigate('/subreddits');
    };
    
    // Fonction pour rediriger vers la page Messages
    const goToMessages = () => {
        navigate('/messages');
    };
    
    // Fonction pour rediriger vers la page Profile
    const goToProfile = () => {
        navigate('/profile');
    };
    
    // Fonction pour ouvrir le sélecteur de fichiers
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    
    // Fonction pour gérer la sélection d'image
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-[#e8f4e8]">
            <div className="flex">
                {/* Menu latéral gauche avec effets de survol améliorés */}
                <div className="w-64 bg-white h-screen fixed left-0 top-0 p-5 border-r border-gray-200">
                    {/* Logo */}
                    <div className="mb-6">
                        <div className="h-8">
                            <img src="/logo.png" alt="Logo" className="h-full" />
                        </div>
                    </div>
                    
                    <div className="space-y-6 mt-8">
                        <div className="flex items-center space-x-3 text-gray-800 font-medium p-2 rounded-lg bg-[#e8f4e8]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            <span>Accueil</span>
                        </div>
                        
                        <div 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                            onClick={goToSubreddits}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span>Rechercher</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                            <span>Notifications</span>
                        </div>
                        
                        {/* Messages avec redirection */}
                        <div 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                            onClick={goToMessages}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span>Messages</span>
                        </div>
                        
                        {/* Profile avec redirection - Remplace Communautés */}
                        <Link to="/profile" className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Profil</span>
                        </Link>
                        
                        <div 
                            onClick={() => setUser(null)} 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Déconnexion</span>
                        </div>
                    </div>
                </div>
                
                {/* Contenu principal */}
                <div className="w-full ml-64">
                    <div className="max-w-2xl mx-auto">
                        {/* Créer un post */}
                        <div className="flex items-center p-4 bg-white m-3 rounded-xl shadow-sm">
                            <div className="w-10 h-10 mr-3 rounded-full bg-gray-200 overflow-hidden">
                                <img 
                                    src={user?.profilePic || "https://via.placeholder.com/40"} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="flex-1">
                                <form onSubmit={handlePostSubmit}>
                                    <textarea 
                                        className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg resize-none focus:outline-none"
                                        placeholder="Qu'avez-vous en tête ?..."
                                        rows="3"
                                        value={postContent}
                                        onChange={(e) => setPostContent(e.target.value)}
                                    ></textarea>
                                    
                                    {/* Affichage du nom de l'image sélectionnée */}
                                    {selectedImage && (
                                        <div className="mt-2 text-sm text-gray-600 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span>{selectedImage.name}</span>
                                        </div>
                                    )}
                                    
                                    {/* Input file caché */}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    
                                    <div className="flex items-center mt-3">
                                        <div className="flex items-center space-x-2 flex-1">
                                            <button 
                                                type="button" 
                                                onClick={handleImageClick}
                                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        {/* Bouton Publier avec effet de survol */}
                                        <button 
                                            type="submit"
                                            className="px-5 py-2 bg-gray-800 text-white rounded-full text-sm font-medium transform transition-transform duration-200 hover:scale-105 active:scale-95 hover:bg-gray-700"
                                        >
                                            Publier
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* État de chargement */}
                        {loading && (
                            <div className="flex justify-center p-6">
                                <div className="animate-spin h-8 w-8 border-4 border-gray-900 rounded-full border-t-transparent"></div>
                            </div>
                        )}

                        {/* Message d'erreur */}
                        {error && !loading && (
                            <div className="bg-red-50 m-3 p-4 rounded-lg text-red-600">
                                <p>Impossible de charger les articles. Essayez de rafraîchir la page.</p>
                            </div>
                        )}

                        {/* Liste des posts */}
                        {!loading && posts.map((post, index) => (
                            <div key={post.id || index} className="bg-white m-3 rounded-xl shadow-sm overflow-hidden">
                                {/* En-tête du post */}
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                            <img 
                                                src={post.user?.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"} 
                                                alt="Profil" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{post.user?.username || "Xx-Totodu91-xX"}</div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <button 
                                            onClick={() => toggleFollow(post.id)} 
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                followedPosts[post.id] 
                                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                                                    : 'bg-[#e8f4e8] text-gray-700 hover:bg-[#d8e8d8]'
                                            }`}
                                        >
                                            {followedPosts[post.id] ? 'Unfollow' : 'Follow'}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Contenu du post */}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                                    <p className="text-gray-700 mb-4">{post.content}</p>
                                    
                                    {post.image && (
                                        <div className="rounded-lg overflow-hidden mb-4">
                                            <img 
                                                src={post.image} 
                                                alt="Illustration" 
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Actions post */}
                                <div className="border-t border-gray-100 grid grid-cols-4 divide-x divide-gray-100">
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                    </button>
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                        </svg>
                                    </button>
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </button>
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Le pied de post a été supprimé pour correspondre à la capture d'écran */}
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;