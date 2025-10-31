import React from 'react';

const Card = (props) => {
  return (
    <div className="card">
      {props.Trainer_Name && <p>{`Trainer: ${props.Trainer_Name}`}</p>}
      {props.horseName && <h1>{`Horse Name: ${props.horseName}`}</h1>}
      {props.age && <p>{`Age: ${props.age}`}</p>}
      {props.totalWinnings && <p>{`Total Winnings: ${props.totalWinnings}`}</p>}
      {props.raceName && <p>{`Race Name: ${props.raceName}`}</p>}
    </div>
  );
};

export default Card;
