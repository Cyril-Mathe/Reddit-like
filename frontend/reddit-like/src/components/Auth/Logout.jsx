import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Se déconnecter
    </button>
  );
}

export default Logout;