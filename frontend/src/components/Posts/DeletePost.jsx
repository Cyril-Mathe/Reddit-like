import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Notification from '../Notification/NotificationComponent';
import '../../style.css';
import Sidebar from '../Sidebar/Sidebar';

export default function ModifierPost() {
  const { documentId } = useParams();
  const [supprimer, setSupprimer] = useState('')
  const [image, setImage] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  let navigate = useNavigate();
  const token = localStorage.getItem('token');

  const showNotification = (type, message) => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  };


  async function fetchSupprimer() {
    setLoading(true)
    try {
      const url = `${import.meta.env.VITE_NEON_URL}/api/posts/${documentId}`


      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });


      const data = await response.json()
      setSupprimer(data.data)
      if (data.data.media == null) {
        setImage(null)
      } else {
        setImage(data.data.media[0].url)
      }
    } catch (error) {
      setError(error)
      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSupprimer();
  }, [documentId]);

  const deletePost = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce post ?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(
        `${import.meta.env.VITE_NEON_URL}/api/posts/${documentId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
      );
      if (res.status === 200) {
        showNotification('success', 'Post supprimé avec succès !');
        setTimeout(() => navigate('/homepage'), 2500);
      } else {
        throw new Error(`Statut inattendu : ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      showNotification('error', "Erreur lors de la suppression : " + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#e8f4e8] dark:bg-[#111827]">
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center mt-10 w-[100%] ml-64 min-h-screen">
          <div className="size-fit w-[50%] max-w-[700px] p-8 bg-white shadow-lg rounded-2xl dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
            <h2 className="text-3xl font-bold text-[#242424] mb-6 text-center dark:text-white">Suppression du post</h2>

            {loading && <p className="text-center text-gray-700">Chargement...</p>}
            {error && <p className="text-center text-red-500">{error.message}</p>}
            {supprimer && (
              <div className="space-y-6 ">
                <div className="bg-[#c8d3ff] dark:bg-[#646e94] p-4 rounded-lg flex flex-col items-center">
                  <p className="text-lg font-semibold text-[#4a4a4a] dark:text-white">
                    Titre  <span className="block font-normal">{supprimer.title}</span>
                  </p>
                  <p className="text-lg font-semibold text-center text-[#4a4a4a] dark:text-white">
                    Description  <span className="block font-normal text-center break-all">{supprimer.description}</span>
                  </p>
                  {image && (
                    <img
                      src={`${import.meta.env.VITE_NEON_URL}${image}`}
                      alt="Illustration"
                      className="w-[75%] h-[75%] mt-4"
                    />
                  )}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={deletePost}
                    className="bg-[#86C7C3] hover:bg-[#A8DBD9] text-white font-semibold py-3 mt-4 px-4 rounded-lg transition-colors dark:text-white  "
                  >
                    Supprimer définitivement
                  </button>
                  <button
                    onClick={() => navigate("/homepage")}
                    className="focus:outline-none bg-red-600 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg py-3 mt-4 px-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Annuler</button>
                </div>
              </div>
            )}

            <Notification
              type={notification.type}
              message={notification.message}
              isVisible={notification.isVisible}
              onClose={closeNotification}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
