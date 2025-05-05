import '../index.css';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Homepage({ user, setUser }) {
    // États pour gérer les données
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [followedPosts, setFollowedPosts] = useState({});

    // Fonction pour récupérer les articles
    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:1337/api/articles", {
                    credentials: 'include',
                    mode: 'cors',
                });
                
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des articles");
                }
                
                const data = await response.json();
                setPosts(data.data || getDemoPosts());
                
            } catch (error) {
                console.error("Erreur:", error);
                setError(error);
                setPosts(getDemoPosts());
            } finally {
                setLoading(false);
            }
        }
        
        fetchPosts();
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
        setPostContent("");
    };

    // Suivre/Ne plus suivre un post
    const toggleFollow = (postId) => {
        setFollowedPosts({
            ...followedPosts,
            [postId]: !followedPosts[postId]
        });
    };

    return (
        <div className="min-h-screen bg-[#e8f4e8]">
            <div className="flex">
                {/* Menu latéral gauche (desktop) */}
                <div className="hidden md:block w-64 bg-white h-screen fixed left-0 top-0 p-5 border-r border-gray-200">
                    {/* Emplacement pour votre logo */}
                    <div className="mb-6">
                        <div className="h-8">
                            {/* Remplacez cette div par votre logo */}
                            <img src="../theme=Default" alt="Logo" className="h-full" />
                        </div>
                    </div>
                    
                    <div className="space-y-6 mt-8">
                        <div className="flex items-center space-x-3 text-gray-800 font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            <span>Accueil</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span>Rechercher</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                            <span>Notifications</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span>Messages</span>
                        </div>
                        
                        <Link to="/subreddits" className="flex items-center space-x-3 text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span>Communautés</span>
                        </Link>
                        
                        <div 
                            onClick={() => setUser(null)} 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Déconnexion</span>
                        </div>
                    </div>
                </div>
                
                {/* Contenu principal */}
                <div className="w-full md:ml-64">
                    <div className="max-w-2xl mx-auto">
                        {/* Barre recherche mobile avec logo */}
                        <div className="block md:hidden p-4">
                            <div className="flex justify-between items-center">
                                <div className="h-6">
                                    {/* Remplacez cette div par votre logo version mobile */}
                                    <img src="/votre-logo.png" alt="Logo" className="h-full" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                            </div>
                        </div>

                        {/* Créer un post */}
                        <div className="p-4 bg-white m-3 rounded-xl shadow-sm">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div className="text-gray-500">Qu'avez-vous en tête ?</div>
                            </div>
                            
                            <form onSubmit={handlePostSubmit}>
                                <textarea 
                                    className="w-full p-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none"
                                    rows="2"
                                    placeholder="Partagez vos pensées..."
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                ></textarea>
                                
                                <div className="flex justify-between mt-3">
                                    <div className="flex space-x-2">
                                        <button type="button" className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium"
                                    >
                                        Publier
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Chargement */}
                        {loading && (
                            <div className="flex justify-center p-6">
                                <div className="animate-spin h-8 w-8 border-4 border-gray-900 rounded-full border-t-transparent"></div>
                            </div>
                        )}

                        {/* Erreur */}
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
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                followedPosts[post.id] 
                                                    ? 'bg-gray-200 text-gray-800' 
                                                    : 'bg-[#e8f4e8] text-gray-700'
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
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                    </button>
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                        </svg>
                                    </button>
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </button>
                                    <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Pied du post */}
                                <div className="p-2 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                            <img 
                                                src={post.user?.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"} 
                                                alt="Profil" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-sm">{post.user?.username || "Xx-Totodu91-xX"}</div>
                                    </div>
                                    
                                    <div>
                                        <button 
                                            onClick={() => toggleFollow(post.id)} 
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                followedPosts[post.id] 
                                                    ? 'bg-gray-200 text-gray-800' 
                                                    : 'bg-[#e8f4e8] text-gray-700'
                                            }`}
                                        >
                                            {followedPosts[post.id] ? 'Unfollow' : 'Follow'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Navigation mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-10">
                <div className="flex justify-around">
                    <button className="p-2 text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                    </button>
                    
                    <button className="p-2 text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                    
                    <button className="p-2 text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                    </button>
                    
                    <button className="p-2 text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Homepage;