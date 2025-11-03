import { useEffect, useState } from 'react';
import Title from './Title';
import Card from './Card';
import SearchBar from './SearchBar';
import CardCarousel from './CardCarousel';
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
  // Transform filteredTrainers into objects suitable for CardCarousel
  const cardsData = filteredTrainers.map((trainer) => ({
    title: trainer.Trainer_Name,
    description: `Horse: ${trainer.horseName || 'N/A'} | Race: ${trainer.raceName || 'N/A'}`,
  }));

  return (
    <section className="section">
      <div className="h-[20vh] w-full max-w-md mx-auto my-4 ">
        <Title title="Trainers & 1'st Place Winnings" />
        <SearchBar placeholder="Trainer Name" value={search} onChange={setSearch} />
      </div>
      <div className="h-[80vh] flex items-center">
        {cardsData.length > 0 && <CardCarousel cards={cardsData} />}

        {error && <p className="text-red-500">{error}</p>}
        {noResults && (
          <p className="text-white text-lg font-semibold">Sorry, no horses found for "{search}".</p>
        )}
      </div>
    </section>
  );
};

export default WiningTrainers;
