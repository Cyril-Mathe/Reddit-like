import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_NEON_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
    } else {
      setError(null); // Réinitialise l'erreur si la validation est correcte
    }
    setPassword(value);
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
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="w-full p-3 bg-[#f5f5f5] border border-[#e5e5e5] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            onChange={(e) => validatePassword(e.target.value)}
          />
          <button 
            type="submit"
            className="w-full p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-sm"
          >
            S'inscrire
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Déjà un compte ? <Link to="/login" className="text-gray-800 font-medium">Se connecter</Link>
          </p>
          {error && <p className="text-sm text-red-500 p-2 bg-red-50 rounded-lg w-full text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;