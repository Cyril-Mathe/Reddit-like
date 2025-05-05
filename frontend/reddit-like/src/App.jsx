import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import Homepage from "./pages/Homepage";
import Subreddits from "./pages/Subreddits";
import Messages from "./pages/Messages"; // Import de la page Messages
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import "./index.css";

function App() {
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté
  return (
    <Router>
      <div className="bg-[#e8f4e8] h-[100%] w-[100%]">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route path="/homepage" element={<Homepage user={user} setUser={setUser} />} />
          <Route path="/subreddits" element={<Subreddits />} />
          <Route path="/messages" element={<Messages user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;