import { useState } from "react";
import axios from "axios";

export default function FormPost({ addPost, documentId }) {
  const [Form, setForm] = useState({
    title: "",
    description: "",
    sub: {},
  });
  const [error, setError] = useState({});
  const [image, setImage] = useState([]);

  const handleImage = (event) => {
    setImage(Array.from(event.target.files));
  };

  const handleChangePost = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    let formError = {};
    if (!Form.title) formError.title = "Champs requis";
    if (!Form.description) formError.description = "Champs requis";
    if (Object.keys(formError).length) {
      setError(formError);
      return;
    }

    try {
      let fileIds = [];
      const token = localStorage.getItem("token");

      // Upload d'images
      if (image.length > 0) {
        const formData = new FormData();
        image.forEach((file) => formData.append("files", file));

        const img = await axios.post(`${import.meta.env.VITE_NEON_URL}/api/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const uploaded = img.data;
        fileIds = uploaded.map((f) => f.id);
      }

      // Création du post
      const user = {
        title: Form.title,
        description: Form.description,
        sub: documentId,
        ...(fileIds.length > 0 && { media: fileIds }),
      };

      const { data, status } = await axios.post(
        `${import.meta.env.VITE_NEON_URL}/api/posts?populate[0]=author&populate[1]=media&populate[2]=comments&populate[3]=sub`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        addPost(data.data);
        setForm({ title: "", description: "" });
        window.location.reload(); // ✅ Rafraîchissement de la page
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 bg-white m-3 rounded-xl shadow-sm dark:bg-[#334155]">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="text-gray-500">Qu'avez-vous en tête ?</div>
      </div>
      <form onSubmit={handlePostSubmit}>
        <input
          className="w-full p-3 mb-2 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          name="title"
          placeholder="Un titre ?"
          value={Form.title}
          onChange={handleChangePost}
        />
        {error.title && <p className="text-red-500 text-sm mb-2">{error.title}</p>}

        <textarea
          className="w-full p-3 mb-2 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          rows="3"
          name="description"
          placeholder="Partagez vos pensées..."
          value={Form.description}
          onChange={handleChangePost}
        ></textarea>
        {error.description && <p className="text-red-500 text-sm mb-2">{error.description}</p>}

        <input
          type="file"
          name="files"
          multiple
          className="w-full p-3 mb-3 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          onChange={handleImage}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium dark:bg-[#4F46E5]"
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  );
}
