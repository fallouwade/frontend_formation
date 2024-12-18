import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './navBar';

export default function AjouterFormation(props) {
  const [formData, setFormData] = useState({
    nomFormation: '',
    dateAjout: '',
    nombreUtilisation: '',
    prix: '',
    thematique: '',
    dateFormation: '',
    message: '',
    imageUrl: '',
  });

  const [idToUpdate, setIdToUpdate] = useState(props.test);

  useEffect(() => {
    if (idToUpdate) {
      // Si un ID est passé pour la mise à jour, récupérer les données de la formation existante
      axios
        .get(`https://backend-formation-m3j0.onrender.com/api/formation/${props.edit}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    }
  }, [idToUpdate, props.edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://backend-formation-m3j0.onrender.com/api/formation/', formData)
      .then((response) => {
        alert('Formation ajoutée avec succès!');
        setFormData({
          nomFormation: '',
          dateAjout: '',
          nombreUtilisation: '',
          prix: '',
          thematique: '',
          dateFormation: '',
          message: '',
          imageUrl: '',
        });
        console.log(response.data);
        
      })
      .catch((error) => {
        alert('Erreur lors de l’ajout de la formation.');
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      dateModif: new Date().toISOString(), // Ajouter la date actuelle comme dernière modification
    };

    axios
      .patch(`https://backend-formation-m3j0.onrender.com/api/formation/${props.edit}`, updatedData)
      .then((response) => {
        alert('Formation mise à jour avec succès!');
        
        
        setFormData({
          nomFormation: '',
          dateAjout: '',
          nombreUtilisation: '',
          prix: '',
          thematique: '',
          dateFormation: '',
          message: '',
          imageUrl: '',
        });
        setIdToUpdate(false);
        props.verification(false);
      })
      .catch((error) => {
        alert('Erreur lors de la mise à jour.');
        console.error(error);
      });
  };

  const annuler = () => {
    setIdToUpdate(false);
    props.verification(false);
  };

  return (
    <div>
      <NavBar />
      <div className="md:w-3/4 w-full shadow-lg mx-auto md:px-16 px-3 border border-gray-200 rounded-md py-10 my-16">
        <h1 className="text-2xl font-bold text-center mb-6">
          {idToUpdate ? 'Modifier une Formation' : 'Ajouter une Formation'}
        </h1>
        <form onSubmit={idToUpdate ? handleUpdate : handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Nom de la formation
              </label>
              <input
                type="text"
                name="nomFormation"
                value={formData.nomFormation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nom de la formation"
                required
              />
            </div>
            {!idToUpdate && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Date d'ajout
                </label>
                <input
                  type="date"
                  name="dateAjout"
                  value={formData.dateAjout}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            )}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Nombre d'utilisation maximum
              </label>
              <input
                type="number"
                name="nombreUtilisation"
                value={formData.nombreUtilisation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Prix
              </label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Thématique
              </label>
              <input
                type="text"
                name="thematique"
                value={formData.thematique}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            {!idToUpdate && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Date de la formation
                </label>
                <input
                  type="date"
                  name="dateFormation"
                  value={formData.dateFormation}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            )}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                URL de l'image
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Écrivez votre message ici..."
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
            >
              {idToUpdate ? 'Mettre à jour' : 'Soumettre'}
            </button>
            {idToUpdate && (
              <button
                onClick={annuler}
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
