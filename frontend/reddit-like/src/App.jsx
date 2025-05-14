import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile"; // Import de la page Profile
import Sub from "./components/Sub.jsx";
import Paint from "./components/Painting/Paint.jsx";
import SubAdd from "./components/SubAdd.jsx";
import SubPage from "./pages/SubPage";
import "./style.css";
import ModifierPost from "./components/Posts/ModifierPost.jsx";
import DeletePost from "./components/Posts/DeletePost.jsx";
import PostDetails from "./components/Posts/PostDetails.jsx";
import NotFound from "./pages/404NotFound.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='*' element={<NotFound />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/subs" element={<Sub />} />
          <Route path="/subsPage/:documentId" element={<SubPage />} />
          <Route path="/add" element={<SubAdd />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route path="/homepage" element={<Homepage user={user} setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} /> {/* Nouvelle route pour le profil */}
          <Route path="/homepage/:id" element={<ModifierPost />} />
          <Route path="/homepage/supp/:documentId" element={<DeletePost />} />
          <Route path="/post/:documentId" element={<PostDetails />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;