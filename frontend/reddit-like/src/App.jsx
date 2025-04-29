import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import "./index.css";

function App() {
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté

  return (
    <Router>
      <div className="bg-red-500 h-[100%] w-[100%]">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <Homepage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;