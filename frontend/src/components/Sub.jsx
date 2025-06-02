import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebar/Sidebar";
import { Link } from "react-router-dom";

function Sub(user, setUser) {
  const [subs, setSubs] = useState([]);
  const token = localStorage.getItem("token");



  // Thread informations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_NEON_URL}/api/subs?populate=author&populate=Banner`,
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
        toast.warning("Vous devez être connecté pour supprimer un Thread.");
      }

      const res = await fetch(`${import.meta.env.VITE_NEON_URL}/api/subs/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setSubs((prev) => prev.filter((item) => item.documentId !== documentId));
        toast.success("Supprimé à jamais !");
      } else {
        toast.error("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur suppression :", error);
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen h-[auto] bg-[#e8f4e8] dark:bg-[#111827]">
      <div className="flex">
      <Sidebar setUser={setUser} />
      <div className="w-full md:ml-64">
          <main className="w-full min-h-screen h-[auto] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Threads</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subs?.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 dark:bg-[#334155] ">
                  {item.Banner?.url && (
                    <img
                      src={`${import.meta.env.VITE_NEON_URL}${item.Banner?.url}`}
                      alt="banner"
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate dark:text-white">{item.Name}</h2>
                  <p className="text-gray-700 mb-2 line-clamp-2 dark:text-white">{item.Description}</p>
                  {item.author && (
                    <p className="text-sm text-gray-500 mb-2 dark:text-white">
                      Fondateur : <span className="font-semibold underline text-blue-400 cursor-pointer hover:text-blue-500">@{item.author.username}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mb-4 dark:text-white">Créé depuis le : {new Date(item.createdAt).toLocaleDateString()}</p>

                  <div className="flex justify-between gap-2">
                    <Link to={`/SubsPage/${item.documentId}`} className="flex justify-center w-[100%] focus:outline-none bg-blue-600 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg py-3 mt-4 px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                      Voir
                    </Link>
                    <button
                      onClick={() => handleDelete(item.documentId)}
                      className="w-[100%] focus:outline-none bg-red-600 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg py-3 mt-4 px-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    > Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/add"
              className="fixed bottom-6 right-6 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition"
            >
              ➕ Ajouter un Sub
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}


export default Sub;
