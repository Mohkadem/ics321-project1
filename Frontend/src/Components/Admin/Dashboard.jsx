import React from 'react';
import HorsesInStable from './HorsesInStables.jsx';
import TrainersDashboard from './TrainersDashboard.jsx';
import Owners from './Owners.jsx';

const Dashboard = () => {
  return (
    <div className="">
      <HorsesInStable />
      <TrainersDashboard />
      <Owners />
    </div>
  );
};

export default Dashboard;
