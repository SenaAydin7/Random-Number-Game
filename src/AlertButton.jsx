import React from 'react';
import './App.css'; 

const AlertButton = () => {
  const showAlert = () => {
    alert('The goal is to check if each number displayed after the first in each series is greater than the previous one and to remember those that are. After a few numbers, the series ends, and a response panel appears. The first number must always be remembered, and at the end of each series, both the first number and the remembered numbers should be displayed in the order they appeared.');
  };

  return (
    <div className="button-container">
      <button onClick={showAlert}>Rule</button>
    </div>
  );
};

export default AlertButton;
