import React from 'react';
import SearchBar from './SearchBar';
import CardCarousel from './CardCarousel';
import Title from './Title';
import { useState, useEffect } from 'react';
const Trainers = () => {
  const [search, setSearch] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const result = await fetch('http://127.0.0.1:5001/trainers');
        const data = await result.json();
        console.log(data);
        if (data.status === 'success') {
          setTrainers(data.data);
        } else {
          setError(data.message || 'Failed to load trainers');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTrainers();
  }, []);

  // dynamically filter trainers based on search input
  const filteredTrainers = trainers.filter((trainer) =>
    (trainer.Trainer_Name || '').toLowerCase().includes(search.toLowerCase())
  );
  const cards = filteredTrainers.map((trainer) => ({
    title: trainer.Trainer_Name,
    description: ` Total Prizes: ${trainer.totalWinnings}`,
  }));

  const noResults = !error && search && filteredTrainers.length === 0;

  return (
    <section className="section">
      <div className="h-[20vh] w-full max-w-md mx-auto my-4 ">
        <Title title="Trainers & Prizes" />
        <SearchBar placeholder="Enter trainer name" value={search} onChange={setSearch} />
      </div>

      <div className="h-[80vh] flex items-center">
        {cards.length > 0 && <CardCarousel cards={cards} />}
        {error && <p className="text-red-500">{error}</p>}
        {noResults && (
          <p className="text-white text-lg font-semibold">
            Sorry, no trainers found for "{search}".
          </p>
        )}
      </div>
    </section>
  );
};

export default Trainers;
