import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Subreddits({ user, setUser }) {
  const navigate = useNavigate();
  
  // Fonctions de navigation
  const goToHome = () => navigate('/homepage');
  const goToProfile = () => navigate('/profile');
  const goToMessages = () => navigate('/messages');
  const goToNotifications = () => navigate('/notifications');
  
  // Données d'exemple pour les subreddits avec t/ au lieu de r/
  const [subreddits, setSubreddits] = useState([
    {
      id: 1,
      name: "Photo",
      members: "2.4M membres",
      description: "Partagez vos photo",
      image: "https://via.placeholder.com/50",
      joined: false
    },
    {
      id: 2,
      name: "gaming",
      members: "1.7M membres",
      description: "des jeux et des jeux",
      image: "https://via.placeholder.com/50",
      joined: true
    },
    {
      id: 3,
      name: "Jenpeuxplus",
      members: "875K membres",
      description: "je sais pas quoi mettre",
      image: "https://via.placeholder.com/50",
      joined: false
    },
    {
      id: 4,
      name: "Book",
      members: "650K membres",
      description: "j'aime bien les livres donc bon",
      image: "https://via.placeholder.com/50",
      joined: false
    },
    {
      id: 5,
      name: "hercule",
      members: "920K membres",
      description: "enfaite c mon chien j'avais plus d'idée",
      image: "https://via.placeholder.com/50",
      joined: true
    }
  ]);

  // Fonction pour rejoindre/quitter un subreddit
  const toggleJoin = (id) => {
    setSubreddits(
      subreddits.map(sub => 
        sub.id === id ? { ...sub, joined: !sub.joined } : sub
      )
    );
  };

  // Recherche
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSubreddits = subreddits.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#e8f4e8]">
      <div className="flex">
        {/* Sidebar - Style correspondant à la capture d'écran */}
        <div className="w-64 bg-white h-screen fixed left-0 top-0 p-5 border-r border-gray-200">
          {/* Logo */}
          <div className="mb-6">
            <div className="h-8">
              <img src="/logo.png" alt="Logo" className="h-full" />
            </div>
          </div>
          
          <div className="space-y-6 mt-8">
            {/* Accueil */}
            <div 
              className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={goToHome}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Accueil</span>
            </div>
            
            {/* Rechercher - Activé */}
            <div className="flex items-center space-x-3 text-gray-800 font-medium p-2 rounded-lg bg-[#e8f4e8] transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span>Rechercher</span>
            </div>
            
            {/* Notifications */}
            <div 
              className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={goToNotifications}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span>Notifications</span>
            </div>
            
            {/* Messages */}
            <div 
              className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={goToMessages}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Messages</span>
            </div>
            
            {/* Profil */}
            <Link to="/profile" className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Profil</span>
            </Link>
            
            {/* Déconnexion */}
            <div 
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate('/login');
              }} 
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
          {/* Main Content */}
          <main className="max-w-4xl mx-auto py-6 px-4">
            {/* Barre de recherche */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des communautés"
                  className="bg-[#f5f5f5] border border-[#e5e5e5] rounded-full py-2 px-4 pl-10 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            {/* Liste des communautés */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-xl font-semibold text-gray-800 mb-4">Communautés populaires</h1>
              
              <div className="space-y-4">
                {filteredSubreddits.map(subreddit => (
                  <div key={subreddit.id} className="flex items-center justify-between p-3 hover:bg-[#f5f5f5] rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                        <img src={subreddit.image} alt={subreddit.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-800">t/{subreddit.name}</h3>
                        <p className="text-xs text-gray-500">{subreddit.members}</p>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        onClick={() => toggleJoin(subreddit.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          subreddit.joined 
                            ? 'bg-[#e8f4e8] text-gray-800 hover:bg-[#d8e8d8]' 
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {subreddit.joined ? 'Rejoint' : 'Rejoindre'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Communautés suggérées */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Communautés suggérées pour vous</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-[#f5f5f5] transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <h3 className="font-medium text-gray-800">t/encoreun</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Lorem ipsum dolor sit amet.</p>
                  <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                    Rejoindre
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-[#f5f5f5] transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <h3 className="font-medium text-gray-800">t/oui</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">jesaispasencore</p>
                  <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                    Rejoindre
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Subreddits;