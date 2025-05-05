import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Messages({ user, setUser }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Référence pour l'input de fichier
  const fileInputRef = useRef(null);

  // Navigation functions
  const goToHome = () => navigate('/homepage');
  const goToSearch = () => navigate('/subreddits');
  const goToNotifications = () => navigate('/notifications');
  const goToMessages = () => navigate('/messages');
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/login');
  };

  // Exemple de données de messages
  useEffect(() => {
    // Ici vous feriez normalement un appel API pour obtenir les messages réels
    const demoMessages = [
      {
        id: 1,
        username: 'Xx-Totodu91-xX',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        preview: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit ut et massa mi...',
        messages: [
          { 
            sender: 'Xx-Totodu91-xX', 
            content: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.',
            timestamp: '10:30',
            isReceived: true 
          },
          { 
            sender: 'me', 
            content: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.',
            timestamp: '10:32',
            isReceived: false 
          },
          { 
            sender: 'Xx-Totodu91-xX', 
            content: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.',
            timestamp: '10:34',
            isReceived: true 
          },
          { 
            sender: 'me', 
            content: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.',
            timestamp: '10:35',
            isReceived: false 
          },
        ]
      },
      {
        id: 2,
        username: 'Kiwi',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        preview: 'Bonjour! Comment ça va? Ravis de vous voir!',
        messages: [
          { 
            sender: 'Kiwi', 
            content: 'Bonjour! Comment ça va? Ravis de vous voir!',
            timestamp: '11:20',
            isReceived: true 
          },
          { 
            sender: 'me', 
            content: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit ut et massa mi...',
            timestamp: '11:25',
            isReceived: false 
          },
        ]
      },
      {
        id: 3,
        username: 'GamerGomuFlipReset',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        preview: 'Salut! J\'ai commencé à jouer au jeu dont nous avions parlé hier.',
        messages: []
      },
      {
        id: 4,
        username: 'UnGraphot',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        preview: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit ut et massa mi...',
        messages: []
      },
    ];

    setMessages(demoMessages);
    // Définir la première conversation comme conversation active
    if (demoMessages.length > 0) {
      setCurrentChat(demoMessages[0]);
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedImage) return;

    // Ajouter le nouveau message à la conversation actuelle
    const newMessage = {
      sender: 'me',
      content: messageText,
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isReceived: false
    };

    // Mettre à jour la conversation actuelle
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      preview: messageText || 'Image envoyée'
    };

    // Mettre à jour la liste des messages
    setMessages(messages.map(msg => 
      msg.id === currentChat.id ? updatedChat : msg
    ));

    // Mettre à jour la conversation actuelle
    setCurrentChat(updatedChat);
    
    // Réinitialiser le champ de texte et l'image
    setMessageText('');
    setSelectedImage(null);
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

  const filteredMessages = messages.filter(msg => 
    msg.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#e8f4e8]">
      {/* Sidebar avec effets de survol améliorés */}
      <div className="w-64 bg-white h-full flex flex-col border-r border-gray-200">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <img src="/logo.png" alt="Threadly" className="h-8" />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-6">
            <li 
              className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200" 
              onClick={goToHome}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Accueil</span>
            </li>
            <li 
              className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200" 
              onClick={goToSearch}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span>Rechercher</span>
            </li>
            <li 
              className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200" 
              onClick={goToNotifications}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span>Notifications</span>
            </li>
            <li 
              className="flex items-center space-x-3 text-gray-800 font-medium cursor-pointer p-2 rounded-lg bg-[#e8f4e8] transition-all duration-200" 
              onClick={goToMessages}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Messages</span>
            </li>
            <li 
              className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200" 
              onClick={handleLogout}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Déconnexion</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Messages list */}
      <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un message..."
              className="w-full py-2 pl-10 pr-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
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
        
        <div className="overflow-y-auto">
          {filteredMessages.map(message => (
            <div 
              key={message.id} 
              className={`p-4 border-b border-gray-100 hover:bg-[#f5f5f5] cursor-pointer transition-all duration-200 ${currentChat?.id === message.id ? 'bg-[#f5f5f5]' : ''}`}
              onClick={() => setCurrentChat(message)}
            >
              <div className="flex items-start space-x-3">
                <div>
                  <img 
                    src={message.avatar} 
                    alt={message.username} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{message.username}</h3>
                    <span className="text-xs text-gray-500">10:30</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-[#e8f4e8]">
        {currentChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img 
                  src={currentChat.avatar} 
                  alt={currentChat.username} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{currentChat.username}</h3>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {currentChat.messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${msg.isReceived ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl p-3 ${
                      msg.isReceived ? 'bg-white text-gray-800' : 'bg-[#c5e1c5] text-gray-800 ml-auto'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.image && (
                      <div className="mt-2 rounded-lg overflow-hidden">
                        <img src={msg.image} alt="Message attachment" className="max-w-full h-auto" />
                      </div>
                    )}
                    <div className={`text-xs mt-1 ${msg.isReceived ? 'text-gray-500' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input with image upload */}
            <div className="p-4 bg-white border-t border-gray-200">
              {/* Input file caché */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {/* Affichage du nom de l'image sélectionnée */}
              {selectedImage && (
                <div className="mb-2 text-sm text-gray-600 flex items-center bg-[#f5f5f5] p-2 rounded-lg">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="truncate">{selectedImage.name}</span>
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
              
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="flex-1 py-2 px-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  type="submit"
                  className="p-2 bg-[#67a1ff] text-white rounded-full transform transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;