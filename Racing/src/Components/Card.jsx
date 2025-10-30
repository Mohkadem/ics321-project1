import React from 'react';

const Card = (props) => {
  return (
    <div className="bg-gray-500 w-[150px] h-[150px] rounded-2xl card">
      <h1>{`Horse Name: ${props.horseName}`}</h1>
      <p>{`Trainer: ${props.Trainer_Name}`}</p>
      <p>{`Age: ${props.age}`}</p>
    </div>
  );
};

export default Card;
