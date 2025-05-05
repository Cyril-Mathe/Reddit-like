import React, { useState } from "react";
import { Link } from "react-router-dom";

function Subreddits() {
  // Données d'exemple pour les subreddits
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

  const [searchTerm, setSearchTerm] = useState("");
  const filteredSubreddits = subreddits.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#e8f4e8]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800"></div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des communautés"
                className="bg-[#f5f5f5] border border-[#e5e5e5] rounded-full py-2 px-4 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="w-4 h-4 absolute right-3 top-2.5 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4">
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
                    <h3 className="font-medium text-gray-800">r/{subreddit.name}</h3>
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
      
      {/* Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-3 px-6 md:hidden">
        <div className="flex justify-around items-center">
          <Link to="/home" className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span className="text-xs mt-1">Accueil</span>
          </Link>
          
          <Link to="/explore" className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
            </svg>
            <span className="text-xs mt-1 text-gray-500">Rechercher</span>
          </Link>
          
          <Link to="/subreddits" className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="text-xs mt-1 text-gray-500">Communautés</span>
          </Link>
          
          <Link to="/profile" className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="text-xs mt-1 text-gray-500">Profil</span>
          </Link>
        </div>
      </nav>
      
      {/* Sidebar pour desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="text-xl font-bold text-gray-800 mb-8">Threadly</div>
        
        <div className="space-y-6">
          <Link to="/home" className="flex items-center space-x-3 text-gray-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>Accueil</span>
          </Link>
          
          <Link to="/explore" className="flex items-center space-x-3 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
            </svg>
            <span>Explore</span>
          </Link>
          
          <Link to="/subreddits" className="flex items-center space-x-3 text-gray-600 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span>Communautés</span>
          </Link>
          
          <Link to="/messages" className="flex items-center space-x-3 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span>Messages</span>
          </Link>
          
          <Link to="/profile" className="flex items-center space-x-3 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subreddits;