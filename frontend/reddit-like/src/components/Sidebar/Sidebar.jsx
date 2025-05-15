import React, { useState, useEffect } from 'react';
import Logout from '../Auth/Logout';
import { Link, useNavigate } from "react-router-dom";
import '../../style.css';
import axios from 'axios';

function Sidebar({ setUser }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [userPfp, setUserPfp] = useState(null);
    

    const token = localStorage.getItem("token");



    const fetchUserInfo = async () => {

        if (!token) {
            console.error("Il est où ton Token ?");
            return;
        }

        try {
            const response = await axios.get("http://localhost:1337/api/users/me?populate=*", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsername(response.data.username);

            // PFP
            if (response.data.Profilpic && response.data.Profilpic) {
                setUserPfp(response.data.Profilpic.url);
            }
        } catch (error) {
            console.error("ça marche pas ", error);
        }
    }

    // État pour suivre le mode actuel
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    // Fonction pour basculer le mode sombre
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    // Initialiser le mode au chargement du composant
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        console.log("Déconnexion déclenchée");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="hidden md:block w-64 bg-white h-screen fixed left-0 top-0 p-5 dark:bg-[#1A1C23]">
            <div className="mb-6">
                <div
                    className="flex justify-center h-12 cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={toggleDarkMode}
                    title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
                >
                    {isDarkMode ? (
                        <img src="/assets/images/threadly-light.png" alt="Logo (mode sombre)" className="h-full" />
                    ) : (
                        <img src="/assets/images/threadly.png" alt="Logo" className="h-full" />
                    )}
                </div>
            </div>
            <div className="space-y-6 mt-8">
                <div className="space-y-6 mt-8">
                    <div className='flex items-center space-x-4'>
                        {userPfp ? (
                            <img src={`http://localhost:1337${userPfp}`}
                            alt="Profil Picture" 
                            className="w-15 h-15 rounded-full" />
                        ) : (
                            <img src="https://cdn.vectorstock.com/i/500p/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
                            alt="Profil Picture Undefined"
                            className="w-15 h-15 rounded-full" />
                        )}
                        <div>
                            {username ? (
                                <span className="text-gray-800 dark:text-white font-semibold">{username}</span>
                            ) : (
                                <span className="text-gray-500">..</span>
                            )}
                        </div>
                    </div>
                    <Link to="/homepage" className="flex items-center space-x-3 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm p-2 rounded-lg transition-all duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span>Accueil</span>
                    </Link>
                    <Link to="/subs" className="flex items-center space-x-3 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm p-2 rounded-lg transition-all duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>Communautés</span>
                    </Link>
                    <Link to="/profile" className="flex items-center space-x-3 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm p-2 rounded-lg transition-all duration-200">               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                        <span>Profil</span>
                    </Link>
                    <div className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm p-2 rounded-lg transition-all duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        <span><Logout setUser={setUser} /></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;