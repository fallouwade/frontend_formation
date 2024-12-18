import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './navBar';
import { Link } from 'react-router-dom';

export default function Accueil(props) {
  const [formation, setFormations] = useState([]);
  const [search, setsearch] = useState()


  useEffect(() => {
    // Requête pour récupérer les formations
    axios
      .get('https://backend-formation-m3j0.onrender.com/api/formation')
      .then((response) => {
        setFormations(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des formations:", error);
      });
  }, []);

  const voir = (id) => {
    props.id(id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };


  const filtre = (e) => {
    setsearch(e.target.value)
  }

  const formations = search
  ? formation.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  : formation;


  return (
    <div>
      <NavBar onChange={filtre}  />
      <div className="pt-10 bg-gray-200 grid md:grid-cols-4 grid-cols-1 gap-6 h-full pb-16 ">
        {formations.map((formation) => (
          <div key={formation._id} className="w-full max-w-sm bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-md">
            <Link
              to="/formation"
              className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              onClick={() => voir(formation._id)}
            >
              <img
                src={formation.imageUrl ? formation.imageUrl : "https://via.placeholder.com/400x200"}
                alt="Formation"
                className="w-full h-48 object-cover"
              />

              <div className="px-5 mt-2 space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {formation.nomFormation || "Nom de la Formation"}
                </h2>

                <div className="flex justify-between text-sm text-gray-500">
                  <p>Date : <span className="font-medium">{formatDate(formation.dateFormation)}</span></p>
                  <p>Max Utilisateurs : <span className="font-medium">{formation.nombreUtilisation || 20}</span></p>
                </div>

                {/* Ajout des étoiles */}
                <div className="flex items-center mt-2">
                  <p className="text-gray-600 mr-2">Note :</p>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${index < ( 3) ? "text-yellow-400" : "text-gray-300"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l2.9 6.9L22 9.2l-5 5 1.2 7.8L12 18l-6.2 4 1.2-7.8-5-5 7.1-1L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Thématique : <span className="font-medium">{formation.thematique || "Développement Web"}</span></p>
                  <p>Prix : <span className="font-medium text-green-500">{formation.prix ? `${formation.prix} €` : "150 €"}</span></p>
                </div>

                <div className="text-xs text-gray-500">
                  <p>Date d'ajout : <span className="font-medium">{formatDate(formation.dateAjout)}</span></p>
                  {formation.dateModif && (
                    <p>Dernière modification : <span className="font-medium">{formatDate(formation.dateModif)}</span></p>
                  )}
                </div>

               
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
