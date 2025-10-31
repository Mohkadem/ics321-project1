import { useEffect, useState } from 'react';
import Title from './Title';
import Card from './Card';
import SearchBar from './SearchBar';
const WiningTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const result = await fetch('http://127.0.0.1:5001/browseTrainer');
        const data = await result.json();
        if (data.status === 'success') {
          setTrainers(data.data);
        } else {
          setError(data.message || 'Failed to load horses');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTrainers();
  }, []);
  const filteredTrainers = trainers.filter((trainer) =>
    (trainer.Trainer_Name || '').toLowerCase().includes(search.toLowerCase())
  );
  const noResults = !error && search && filteredTrainers.length === 0;
  return (
    <section className="w-full min-h-screen mt-4 flex flex-col items-center">
      <Title title="Browse Winner Trainers" />
      <SearchBar placeholder="Trainer Name" value={search} onChange={setSearch} />

      <div className="cards">
        {filteredTrainers.map((e, idx) => (
          <div>
            <Card
              key={idx}
              Trainer_Name={e.Trainer_Name}
              horseName={e.horseName}
              raceName={e.raceName}
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {noResults && (
        <p className="text-white text-lg font-semibold">Sorry, no horses found for "{search}".</p>
      )}
    </section>
  );
};

export default WiningTrainers;
