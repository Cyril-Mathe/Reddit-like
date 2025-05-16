import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";

function Sub({ user, setUser }) {
  const [subs, setSubs] = useState([]); 
  const [filteredSubs, setFilteredSubs] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const token = localStorage.getItem("token");

  // Thread informations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/subs?populate=author&populate=Banner",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await response.json();
        setSubs(json.data);
        setFilteredSubs(json.data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    };

    fetchData();
  }, []);

  // Search bar
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    
    const filtered = subs.filter((sub) =>
      sub.Name.toLowerCase().includes(value)
    );
    setFilteredSubs(filtered);
  };

  const handleDelete = async (documentId) => {
    const confirm = window.confirm("Voulez-vous supprimer ce Thread ?");
    if (!confirm) return;

    try {
      if (!token) {
        alert("Vous devez être connecté pour supprimer un Thread.");
      }

      const res = await fetch(`http://localhost:1337/api/subs/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setSubs((prev) => prev.filter((item) => item.id !== documentId));
        setFilteredSubs((prev) => prev.filter((item) => item.id !== documentId));
        alert("Supprimé à jamais !");
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f4e8] dark:bg-[#111827]">
      <div className="flex">
        <Sidebar setUser={setUser} />
        <div className="w-full md:ml-64">
          <main className="w-full h-screen overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Threads'</h1>

              {/* Ajout barre de recherche  */}
              <div className="w-[440px] flex items-center gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Rechercher la communauté qui vous correspond"
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  className="bg-[#ef8888] text-white px-4 py-2 rounded-lg hover:bg-[#f1a0a0] transition"
                >
                  <img
                    src="/assets/icons/search.png"
                    alt="search"
                    className="w-6 h-6"
                  />
                </button>
              </div>

              <Link
                to="/add"
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                ➕ Ajouter un Sub
              </Link>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
                >
                  {item.Banner?.url && (
                    <img
                      src={`http://localhost:1337${item.Banner.url}`}
                      alt="banner"
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate ">
                    {item.Name}
                  </h2>
                  <p className="text-gray-700 mb-2 line-clamp-2">
                    {item.Description}
                  </p>
                  {item.author && (
                    <p className="text-sm text-gray-500 mb-2">
                      Fondateur :{" "}
                      <span className="font-semibold underline text-blue-400 cursor-pointer hover:text-blue-500">
                        @{item.author.username}
                      </span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mb-4">
                    Créé depuis le :{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-amber-200 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Supprimer
                    </button>
                    <Link
                      to={`/SubsPage/${item.id}`}
                      className="flex-1 bg-green-200 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                    >
                      Voir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Sub;