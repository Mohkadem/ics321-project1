import React, { useEffect, useState } from 'react';
import Card from './Card';
import Title from './Title';
import SearchBar from './SearchBar';
const BrowseHorse = () => {
  const [search, setSearch] = useState('');
  const [horses, setHorses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const result = await fetch('http://127.0.0.1:5001/browseHorses');
        const data = await result.json();
        console.log(data);
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
    (horse.lname || '').toLowerCase().includes(search.toLowerCase())
  );
  const noResults = !error && search && filteredHorses.length === 0;
  return (
    <section className="w-full bg-gray-400 min-h-screen">
      <Title title="Browse Horse" />
      <div className="flex flex-col items-center text-center">
        <SearchBar placeholder="Enter owner last name" value={search} onChange={setSearch} />
        {/* <input
          type="text"
          placeholder="Enter owner last name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 p-2 rounded"
        /> */}
        <div className="cards">
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
        {noResults && (
          <p className="text-white text-lg font-semibold">Sorry, no horses found for "{search}".</p>
        )}
      </div>
    </section>
  );
};

export default BrowseHorse;
