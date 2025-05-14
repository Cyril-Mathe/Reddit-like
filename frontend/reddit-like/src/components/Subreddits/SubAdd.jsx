import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';
import {jwtDecode} from 'jwt-decode';

function AddSubscriptionPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);
  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;


  const checkNameExists = async (name) => {
    const response = await fetch(
      `http://localhost:1337/api/subs?filters[Name][$eqi]=${name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.data.length > 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Vous devez être connecté pour ajouter un Thread.');
      return;
    }

    if (!userId) {
      toast.error('ID introuvable.');
      return;
    }

    if (description.length < 3) {
      toast.error('La description doit contenir au moins 3 caractères.');
      return;
    }

    try {
      const nameExists = await checkNameExists(name);
      if (nameExists) {
        toast.error('Ce nom existe déjà. Veuillez en choisir un autre.');
        return;
      }

      let imageId = null;

      if (banner) {
        const imageFormData = new FormData();
        imageFormData.append('files', banner);

        const uploadRes = await fetch('http://localhost:1337/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageFormData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          throw new Error(errorData?.error?.message || 'Échec de l’upload de l’image');
        }

        const uploadData = await uploadRes.json();
        imageId = uploadData?.[0]?.id;

        if (!imageId) {
          throw new Error('Échec de l’upload');
        }
      }

      const res = await fetch('http://localhost:1337/api/subs?populate=author', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name,
          Description: description,
          Banner: imageId,
          posts: [],
        }),
      });

      console.log(res);

      if (res.status == 200) {
        toast.success('Thread ajouté avec succès !');
        setTimeout(() => navigate('/subs'), 1500);
      } else {
        toast.error('Erreur lors de l\'ajout du Thread 1');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Thread:', error);
      toast.error(error.message || 'Une erreur est survenue');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#F8F9FA]">
        <div className="max-w-xl mx-auto mt-10 p-8 bg-[#cceed3] shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-[#242424] mb-6 text-center">Créer un Thread</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block font-medium text-[#242424] mb-1">Nom du Thread *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#B0B0B0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86C7C3]"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium text-[#242424] mb-1">Description (3 min) *</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2 h-32 resize-none border border-[#B0B0B0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86C7C3]"
              />
            </div>

            <div>
              <label htmlFor="banner" className="block font-medium text-[#242424] mb-1">Bannière *</label>
              <input
                type="file"
                id="banner"
                onChange={(e) => setBanner(e.target.files[0])}
                className="block w-full text-sm text-gray-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:font-semibold
                  file:bg-[#86C7C3] file:text-white
                  hover:file:bg-[#A8DBD9]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#86C7C3] hover:bg-[#A8DBD9] text-[#242424] font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Ajouter le Thread
            </button>

            <Link to="/subs" className="block text-center text-sm text-[#242424] hover:underline mt-2">
              Retour aux Threads
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddSubscriptionPage;
