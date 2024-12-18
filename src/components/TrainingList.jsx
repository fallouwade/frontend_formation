import React, { useEffect, useState } from 'react';
import TrainingItem from './TrainingItem';
import axios from 'axios';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/formation')
      .then(response => setTrainings(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formations</h1>
      {trainings.map(training => (
        <TrainingItem key={training.id} training={training} />
      ))}
    </div>
  );
};

export default TrainingList;
