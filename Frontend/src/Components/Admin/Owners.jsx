import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const Owners = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5001/ownersHorses');
        const data = await res.json();

        if (res.ok && data.status === 'success') {
          const owners = data.data.map((item) => `${item.fname} ${item.lname}`);
          const horseCounts = data.data.map((item) => item.num_horses);

          setChartData({
            labels: owners,
            datasets: [
              {
                label: 'Number of Horses Owned',
                data: horseCounts,
                backgroundColor: 'rgba(245, 158, 11, 0.6)', // Tailwind amber-500
                borderColor: 'rgba(245, 158, 11, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Server error occurred');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">🏇 Horses Owned by Each Owner</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {chartData ? (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl shadow-lg">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top', labels: { color: '#fff' } },
                title: {
                  display: true,
                  text: 'Number of Horses Owned by Each Owner',
                  color: '#fff',
                  font: { size: 20 },
                },
              },
              scales: {
                x: {
                  ticks: { color: '#fff', autoSkip: false, maxRotation: 45, minRotation: 0 },
                  grid: { color: 'rgba(255,255,255,0.1)' },
                },
                y: {
                  beginAtZero: true,
                  ticks: { color: '#fff' },
                  grid: { color: 'rgba(255,255,255,0.1)' },
                },
              },
            }}
          />
        </div>
      ) : (
        !error && <p>Loading data...</p>
      )}
    </div>
  );
};

export default Owners;
