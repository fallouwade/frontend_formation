import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './navBar';

export default function FormationDetails(props) {
  const [formation, setFormation] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { id } = props;

  useEffect(() => {
    if (id) {
      axios
        .get(`https://backend-formation-m3j0.onrender.com/api/formation/${id}`)
        .then((response) => {
          setFormation(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails:', error);
          alert('Erreur lors de la récupération des détails');
        });
    } else {
      console.error('L\'ID de la formation est manquant');
    }
  }, [id]);

  const supprimerFormation = () => {
    if (id) {
      axios
        .delete(`https://backend-formation-m3j0.onrender.com/api/formation/${id}`)
        .then(() => {
          alert('Formation supprimée avec succès');
          navigate('/'); // Redirige après suppression
        })
        .catch((error) => {
          alert('Erreur lors de la suppression');
          console.error(error);
        });
    } else {
      console.error('Impossible de supprimer la formation. L\'ID est manquant');
    }
  };

  const update = (id) => {
    props.update(id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  if (!formation) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-5xl mx-auto py-8 px-4">
          <div className="mb-6">
            <button
              className="text-teal-600 hover:underline flex items-center"
              
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0L4.293 10.707a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L6.414 9H15a1 1 0 110 2H6.414l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
             
              <Link to="/"> Retour aux formations</Link>
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={formation.imageUrl || 'https://via.placeholder.com/600x300'}
              alt={formation.nomFormation || 'Formation'}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x300';
              }}
            />
            <div className="p-6">
              <h1 className="text-2xl font-bold text-teal-700 mb-4">{formation.nomFormation}</h1>

              <div className="text-sm text-gray-600">
                <p>Thématique : <span className="font-medium">{formation.thematique || "Développement Web"}</span></p>
                <p>Prix : <span className="font-medium text-green-500">{formation.prix ? `${formation.prix} €` : "150 €"}</span></p>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <p>Date : <span className="font-medium">{formatDate(formation.dateFormation)}</span></p>
                <p>Max Utilisateurs : <span className="font-medium">{formation.nombreUtilisation || 20}</span></p>
              </div>

              <div className="flex items-center mt-2">
                <p className="text-gray-600 mr-2">Note :</p>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${index < (formation.rating || 3) ? "text-yellow-400" : "text-gray-300"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.9 6.9L22 9.2l-5 5 1.2 7.8L12 18l-6.2 4 1.2-7.8-5-5 7.1-1L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>Date d'ajout : <span className="font-medium">{formatDate(formation.dateAjout)}</span></p>
                {formation.dateModif && (
                  <p>Dernière modification : <span className="font-medium">{formatDate(formation.dateModif)}</span></p>
                )}
              </div>

              {/* Affichage conditionnel du message */}
              {!showFullDescription && (
                <button
                  className="text-teal-600 mt-4 underline"
                  onClick={() => setShowFullDescription(true)}
                >
                  Voir plus
                </button>
              )}
              {showFullDescription && (
                <div className="mt-4">
                  <p className="text-gray-700 text-base leading-relaxed">{formation.message}</p>
                  <button
                    className="text-teal-600 mt-2 underline"
                    onClick={() => setShowFullDescription(false)}
                  >
                    Voir moins
                  </button>
                </div>
              )}

              <div className="flex space-x-4 mt-6">
                <button
                  className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                  onClick={() => update(formation._id)}
                >
                  <Link to="/ajout">Modifier</Link>
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  onClick={supprimerFormation}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
