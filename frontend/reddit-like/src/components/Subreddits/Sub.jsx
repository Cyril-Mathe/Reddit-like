import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";

function Sub( user, setUser) {
  const [subs, setSubs] = useState([]);
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
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    };

    fetchData();
  }, []);

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
        setSubs((prev) => prev.filter((item) => item.documentId !== documentId));
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
    <div className="min-h-screen bg-gray-100">
  <div className="flex">
    <Sidebar setUser={setUser} />
    <div className="w-full md:ml-64">
      <main className="w-full h-screen overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Threads'</h1>
          <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            ➕ Ajouter un Sub
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subs?.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
              {item.Banner?.url && (
                <img
                  src={`http://localhost:1337${item.Banner.url}`}
                  alt="banner"
                  required
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate ">{item.Name}</h2>
              <p className="text-gray-700 mb-2 line-clamp-2">{item.Description}</p>
              {item.author && (
              <p className="text-sm text-gray-500 mb-2">
                Fondateur : <span className="font-semibold underline text-blue-400 cursor-pointer hover:text-blue-500">@{item.author.username}</span>
              </p>
              )}
              <p className="text-sm text-gray-500 mb-4">Créé depuis le : {new Date(item.createdAt).toLocaleDateString()}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(item.documentId)}
                  className="flex-1 bg-amber-200 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  > Supprimer
                </button>
                <Link to={`/SubsPage/${item.documentId}`} className="flex-1 bg-green-200 text-white px-4 py-2 rounded hover:bg-green-500 transition">
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
