import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Auth({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Erreur lors de la connexion");
      }
      const data = await response.json();
      localStorage.setItem("token", data.jwt)
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      setUser(data.user);
      navigate("/homepage");
    
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#e8f4e8]">
      {/* Logo en haut */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-gray-800">Threadly</div>
      </div>
     
      {/* Formulaire */}
      <div className="w-full max-w-md">
        <form
          className="flex flex-col justify-center items-center gap-4 bg-white p-6 rounded-xl shadow-sm"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-[#f5f5f5] border border-[#e5e5e5] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 bg-[#f5f5f5] border border-[#e5e5e5] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-sm"
          >
            Se connecter
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Pas encore de compte ? <Link to="/register" className="text-gray-800 font-medium">S'inscrire</Link>
          </p>
          {error && <p className="text-sm text-red-500 p-2 bg-red-50 rounded-lg w-full text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Auth;