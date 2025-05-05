import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Profile({ user, setUser }) {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(user?.profilePic || "https://randomuser.me/api/portraits/men/1.jpg");
    const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1760");
    
    // Référence pour l'input de fichier
    const fileInputRef = useRef(null);
    const coverPhotoRef = useRef(null);
    
    // Navigation
    const goToHome = () => navigate('/homepage');
    const goToSearch = () => navigate('/subreddits');
    const goToMessages = () => navigate('/messages');
    const goToProfile = () => navigate('/profile');
    
    // Fonction pour gérer le changement d'image de profil
    const handleProfilePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
                // Ici, vous pourriez implémenter le code pour envoyer l'image à votre API
                console.log("Nouvelle photo de profil sélectionnée:", file.name);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Fonction pour gérer le changement de photo de couverture
    const handleCoverPhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverImage(e.target.result);
                // Ici, vous pourriez implémenter le code pour envoyer l'image à votre API
                console.log("Nouvelle photo de couverture sélectionnée:", file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-[#e8f4e8]">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white h-screen fixed left-0 top-0 p-5 border-r border-gray-200">
                    {/* Logo */}
                    <div className="mb-6">
                        <div className="h-8">
                            <img src="/logo.png" alt="Logo" className="h-full" />
                        </div>
                    </div>
                    
                    <div className="space-y-6 mt-8">
                        <div 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                            onClick={goToHome}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            <span>Accueil</span>
                        </div>
                        
                        <div 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                            onClick={goToSearch}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span>Rechercher</span>
                        </div>
                        
                        <div 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                            onClick={goToMessages}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span>Messages</span>
                        </div>
                        
                        {/* Profile actif */}
                        <div 
                            className="flex items-center space-x-3 text-gray-800 font-medium p-2 rounded-lg bg-[#e8f4e8] transition-all duration-200" 
                            onClick={goToProfile}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Profil</span>
                        </div>
                        
                        <div 
                            onClick={() => {
                                localStorage.removeItem("token");
                                setUser(null);
                                navigate('/login');
                            }} 
                            className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Déconnexion</span>
                        </div>
                    </div>
                </div>
                
                {/* Contenu principal */}
                <div className="w-full ml-64">
                    {/* Photo de couverture */}
                    <div className="relative">
                        <div className="h-60 bg-gradient-to-r from-blue-300 to-green-300 relative">
                            <img 
                                src={coverImage}
                                alt="Couverture" 
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Bouton pour modifier la couverture */}
                            <button 
                                onClick={() => coverPhotoRef.current?.click()}
                                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </button>
                            <input 
                                type="file" 
                                ref={coverPhotoRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleCoverPhotoChange}
                            />
                        </div>
                        
                        {/* Infos profil */}
                        <div className="max-w-4xl mx-auto px-4 relative">
                            <div className="bg-white rounded-xl shadow-sm p-5 mb-4 -mt-16">
                                <div className="flex flex-col md:flex-row">
                                    {/* Photo de profil */}
                                    <div className="relative">
                                        <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-white shadow-md -mt-20 mb-4 md:mb-0">
                                            <img 
                                                src={profileImage} 
                                                alt="Photo de profil" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-4 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                        >
                                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </button>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleProfilePhotoChange} 
                                        />
                                    </div>
                                    
                                    <div className="md:ml-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                            <div>
                                                <h1 className="text-2xl font-bold">{user?.username || "Xx-Totodu91-xX"}</h1>
                                                <p className="text-gray-600">@{user?.username?.toLowerCase() || "totodu91"}</p>
                                                <p className="mt-2 text-gray-700">
                                                    Passionné de nouvelles technologies, voyage et culture japonaise. Développeur web le jour, gamer la nuit.
                                                </p>
                                            </div>
                                            
                                            <button className="mt-4 md:mt-0 px-4 py-2 bg-[#e8f4e8] text-gray-800 rounded-full text-sm font-medium hover:bg-[#d8e8d8]">
                                                Modifier le profil
                                            </button>
                                        </div>
                                        
                                        {/* Statistiques */}
                                        <div className="flex mt-4 space-x-6 border-t border-gray-100 pt-4">
                                            <div className="text-center">
                                                <div className="font-bold">3</div>
                                                <div className="text-sm text-gray-500">Posts</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold">256</div>
                                                <div className="text-sm text-gray-500">Abonnés</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold">123</div>
                                                <div className="text-sm text-gray-500">Abonnements</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Zone de création de post */}
                            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                                <div className="flex">
                                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                        <img 
                                            src={profileImage}
                                            alt="Profil"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div 
                                        className="flex-1 p-3 bg-[#f5f5f5] rounded-full text-gray-500 cursor-pointer hover:bg-gray-200"
                                        onClick={() => navigate('/create-post')}
                                    >
                                        Qu'avez-vous en tête ?
                                    </div>
                                </div>
                            </div>
                            
                            {/* Exemple d'un post */}
                            <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
                                <div className="p-4">
                                    {/* En-tête du post */}
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                            <img 
                                                src={profileImage} 
                                                alt="Profil" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="font-medium">{user?.username || "Xx-Totodu91-xX"}</div>
                                                <span className="mx-1 text-gray-500">•</span>
                                                <div className="text-gray-500 text-sm">il y a 2 jours</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Contenu du post */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Un voyage incroyable en Asie</h3>
                                        <p className="text-gray-700 mb-4">J'ai passé un mois incroyable à explorer le Japon. La cuisine, la culture et les paysages sont absolument fascinants. Je recommande vivement Tokyo et Kyoto!</p>
                                        
                                        <div className="rounded-lg overflow-hidden mb-4">
                                            <img 
                                                src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1000" 
                                                alt="Post" 
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100 -mx-4 mt-1">
                                        <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            J'aime
                                        </button>
                                        <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                            Commenter
                                        </button>
                                        <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                            </svg>
                                            Partager
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Deuxième post exemple */}
                            <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                            <img 
                                                src={profileImage} 
                                                alt="Profil" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="font-medium">{user?.username || "Xx-Totodu91-xX"}</div>
                                                <span className="mx-1 text-gray-500">•</span>
                                                <div className="text-gray-500 text-sm">il y a 1 semaine</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Ma nouvelle configuration gaming</h3>
                                        <p className="text-gray-700 mb-4">Je viens enfin de terminer ma nouvelle configuration gaming ! RTX 4080, Core i9, 64Go de RAM. Les performances sont incroyables, je peux enfin jouer à Cyberpunk 2077 en ultra avec ray tracing.</p>
                                    </div>
                                    
                                    <div className="border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100 -mx-4 mt-1">
                                        <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            J'aime
                                        </button>
                                        <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                            Commenter
                                        </button>
                                        <button className="p-3 flex justify-center items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                            </svg>
                                            Partager
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Message pour voir plus */}
                            <div className="text-center mt-4 mb-8">
                                <button className="px-4 py-2 bg-[#e8f4e8] text-gray-800 rounded-full text-sm font-medium hover:bg-[#d8e8d8]">
                                    Voir plus de publications
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;