import React, { useEffect, useState } from 'react';
import CardCarousel from './CardCarousel';
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
  const cards = filteredHorses.map((horse) => ({
    title: horse.horseName,
    description: `Trainer: ${horse.Trainer_Name} | Owner: ${horse.Owner_LastName} | Age: ${horse.age}`,
  }));

  const noResults = !error && search && filteredHorses.length === 0;
  return (
    <section className="section">
      <div className="h-[20vh] w-full max-w-md mx-auto my-4 ">
        <Title title="Browse Horse" />
        <SearchBar placeholder="Enter owner last name" value={search} onChange={setSearch} />
      </div>

      <div className="h-[80vh] flex items-center">
        {cards.length > 0 && <CardCarousel cards={cards} />}
        {error && <p className="text-red-500">{error}</p>}
        {noResults && (
          <p className="text-white text-lg font-semibold">Sorry, no horses found for "{search}".</p>
        )}
      </div>
    </section>
  );
};

export default BrowseHorse;
