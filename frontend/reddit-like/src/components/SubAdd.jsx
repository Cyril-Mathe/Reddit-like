import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddSubscriptionPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = 'Bearer 9a6f38f14b1c58f8d9016442e89170739778e98e0907fb825b9c392513c4758e46993dfde86454b746c036aef98f983f4a63504ff945e5ef156f61ba825295df46146e1678d7fb62d70c5b4d960904fa2637110678936106b5befcef6f0ff282d5ba648a7ba9196554b6c558eb5727f9b5482fddeef02f402e563a89498c7a5b';

    try {
      let imageId = null;

      // Étape 1 : Upload du fichier
      if (banner) {
        const imageFormData = new FormData();
        imageFormData.append('files', banner);

        const uploadRes = await fetch('http://localhost:1337/api/upload', {
          method: 'POST',
          headers: {
            Authorization: token,
          },
          body: imageFormData,
        });

        const uploadData = await uploadRes.json();
        imageId = uploadData?.[0]?.id;

        if (!imageId) {
          throw new Error('Échec de l’upload de l’image');
        }
      }

      // Étape 2 : Création de l’abonnement avec référence à l’image
      const payload = {
        data: {
          Name: name,
          Description: description,
          Banner: imageId,
        },
      };

      const res = await fetch('http://localhost:1337/api/subs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.data) {
        alert('Abonnement ajouté avec succès !');
        navigate('/subs');
      } else {
        alert('Erreur lors de l\'ajout de l\'abonnement');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      alert('Une erreur est survenue lors de l’envoi du formulaire.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un abonnement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Nom de l'abonnement</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="banner" className="block font-medium mb-1">Image de bannière</label>
          <input
            type="file"
            id="banner"
            onChange={(e) => setBanner(e.target.files[0])}
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter l'abonnement
        </button>
      </form>
    </div>
  );
}

export default AddSubscriptionPage;
