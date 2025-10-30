import React, { useEffect, useState } from 'react';
import Card from './Card';

const BrowseHorse = () => {
  const [search, setSearch] = useState('');
  const [horses, setHorses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const result = await fetch('http://127.0.0.1:5001/browseHorses');
        const data = await result.json();
        if (data.status === 'success') {
          setHorses(data.data);
        } else {
          setError(data.message || 'Failed to load horses');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHorses();
  }, []);

  // dynamically filter horses based on search input
  const filteredHorses = horses.filter((horse) =>
    (horse.Owner_LastName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full bg-gray-400">
      <h1 className="text-4xl text-center">Browse Horse</h1>
      <div className="text-center">
        <input
          type="text"
          placeholder="Enter owner last name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 p-2 rounded"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {filteredHorses.map((e, idx) => (
            <Card
              key={`${e.horseId}-${idx}`}
              horseName={e.horseName}
              Trainer_Name={e.Trainer_Name}
              age={e.age}
              Owner_LastName={e.Owner_LastName}
            />
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
};

export default BrowseHorse;
