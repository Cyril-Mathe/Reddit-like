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
        const errorData = await response.json(); // Récupère les détails de l'erreur
        throw new Error(errorData.error?.message || "Erreur lors de la connexion");
      }

      const data = await response.json();
      localStorage.setItem("token", data.jwt)
      setUser(data.user); // Stocke les informations de l'utilisateur
      navigate("/homepage");
    } catch (err) {
      setError(err.message); // Affiche le message d'erreur
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        className="flex flex-col justify-center items-center h-screen gap-4"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Email"
          className="bg-red-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="bg-red-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        <p>
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      {error && <p style={{ color: "yellow" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Auth;