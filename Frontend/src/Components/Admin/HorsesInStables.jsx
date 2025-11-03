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

const HorsesInStables = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5001/horsesInStables');
        const data = await res.json();

        if (res.ok && data.status === 'success') {
          const stables = data.data.map((item) => item.stableId);
          const horseCounts = data.data.map((item) => item.numberOfHorses);

          setChartData({
            labels: stables,
            datasets: [
              {
                label: 'Number of Horses per Stable',
                data: horseCounts,
                backgroundColor: 'rgba(59, 130, 246, 0.6)', // Tailwind blue-500
                borderColor: 'rgba(59, 130, 246, 1)',
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
      <h2 className="text-3xl font-bold mb-6">📊 Horses in Each Stable</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {chartData ? (
        <div className="w-full max-w-3xl bg-gray-900 p-4 rounded-2xl shadow-lg">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top', labels: { color: '#fff' } },
                title: {
                  display: true,
                  text: 'Number of Horses per Stable',
                  color: '#fff',
                  font: { size: 20 },
                },
              },
              scales: {
                x: {
                  ticks: { color: '#fff' },
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

export default HorsesInStables;
