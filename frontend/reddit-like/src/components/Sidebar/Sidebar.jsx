import React from 'react';
import { Link } from "react-router-dom";

function Sidebar({ setUser }) {
    return (
        <div className="hidden md:block w-64 bg-white h-screen fixed left-0 top-0 p-5 border-r border-gray-200">
            <div className="mb-6">
                <div className="h-8">
                    <img src="https://raw.githubusercontent.com/Cyril-Mathe/Reddit-like/refs/heads/feature/subreddits/frontend/reddit-like/src/pages/logo.png" alt="Logo" className="h-full" />
                </div>
            </div>
            <div className="space-y-6 mt-8">
                <div className="flex items-center space-x-3 text-gray-800 font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span>Accueil</span>
                </div>
                <Link to="/subreddits" className="flex items-center space-x-3 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span>Communautés</span>
                </Link>
                <div onClick={() => setUser(null)} className="flex items-center space-x-3 text-gray-600 cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Déconnexion</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;