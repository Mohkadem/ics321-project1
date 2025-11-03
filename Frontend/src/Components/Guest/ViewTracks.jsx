import React, { useEffect, useState } from 'react';
import Title from './Title';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend, ArcElement);

const ViewTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://127.0.0.1:5001/viewTracks');
        const data = await result.json();
        if (data.status === 'success') {
          setTracks(data.data);
        } else {
          setError(data.message || 'Failed to load tracks');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);
  const barData = {
    labels: tracks.map((t) => t.trackName),
    datasets: [
      {
        label: 'Number of Races',
        data: tracks.map((t) => t.raceCount),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue
      },
      {
        label: 'Number of Horses',
        data: tracks.map((t) => t.horseCount),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // green
      },
    ],
  };

  const pieData = {
    labels: tracks.map((t) => t.trackName),
    datasets: [
      {
        label: 'Total Horses by Track',
        data: tracks.map((t) => t.horseCount),
        backgroundColor: [
          '#3b82f6', // blue-500
          '#16a34a', // green-600
          '#f59e0b', // amber-500
          '#ef4444', // red-500
          '#8b5cf6', // violet-500
          '#14b8a6', // teal-500
          '#f472b6', // pink-400
          '#22d3ee', // cyan-400
          '#a3e635', // lime-400
        ],
      },
    ],
  };
  return (
    <section className="w-full min-h-screen mt-4 ">
      <Title title="Tracks Info" />
      <div className="flex flex-col items-center gap-8 mt-8">
        <div className="w-[80%] bg-gray-900 p-4 rounded-2xl shadow-lg flex justify-center items-center">
          <Bar
            data={barData}
            options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
          />
        </div>

        <div className="w-[50%] bg-gray-900 p-4 rounded-2xl shadow-lg flex justify-center items-center">
          <Pie
            data={pieData}
            options={{ responsive: true, plugins: { legend: { position: 'right' } } }}
          />
        </div>
      </div>
    </section>
  );
};

export default ViewTracks;
