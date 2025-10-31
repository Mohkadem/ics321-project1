import { useEffect, useState } from 'react';
import horseImg from '../../../src/assets/horse.png';
import BrowseHorse from './BrowseHorse';
import WiningTrainers from './WiningTrainers';
import ViewTracks from './ViewTracks';
const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = 'fd8264e08eb499a5602e2a56cb299318';
  const CITY = 'Riyadh';
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);
  if (loading) return <div>Loading weather...</div>;
  if (!weather || weather.cod !== 200) return <div>Failed to load weather data 😞</div>;
  return (
    <>
      <section className=" h-screen">
        <div className="flex flex-col md:flex-row gap-2 justify-center mt-6 mx-auto ">
          <h1>🌤 Weather in {weather.name} </h1>
          <h2>{weather.main.temp}°C </h2>
          <p>{weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s </p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
        <div>
          <img src={horseImg} alt="horse" className="w-[400px] h-[400px]" />
        </div>
      </section>
      {/* <Hero /> */}
      <BrowseHorse />
      <WiningTrainers />
      <ViewTracks />
    </>
  );
};

export default Home;
