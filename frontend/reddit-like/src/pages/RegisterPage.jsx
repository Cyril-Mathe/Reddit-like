import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/auth/local/register", {
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

      const data = await response.json();
      navigate("/login"); // Redirige vers la page de connexion après l'inscription
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
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="flex flex-col justify-center items-center h-screen gap-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="bg-red-100"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          onChange={(e) => validatePassword(e.target.value)}
        />
        <button type="submit" className="bg-red-300">S'inscrire</button>
      {error && <p style={{ color: "yellow" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Register;