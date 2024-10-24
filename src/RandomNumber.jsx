import React, { useState, useEffect } from 'react';
import './App.css';

const RandomNumber = () => {
  const [numbers, setNumbers] = useState([]);
  const [displayedNumber, setDisplayedNumber] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [correctSequence, setCorrectSequence] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false); // Diziyi göstermek için
  const [showH2, setShowH2] = useState(true); // h2'yi kontrol etmek için

  useEffect(() => {
    const randomNumbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 9) + 1);
    setNumbers(randomNumbers);

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < randomNumbers.length) {
        setDisplayedNumber(randomNumbers[index]);
        index += 1;
      } else {
        clearInterval(intervalId);
        setShowInput(true);
        setShowH2(false); // Son sayı gösterildiğinde h2'yi gizle
        checkSequence(randomNumbers);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const checkSequence = (randomNumbers) => {
    let sequence = randomNumbers[0].toString();
    for (let i = 1; i < randomNumbers.length; i++) {
      if (randomNumbers[i] > randomNumbers[i - 1]) {
        sequence += randomNumbers[i];
      }
    }
    setCorrectSequence(sequence);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNumbers(true);
    if (inputValue === correctSequence) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="container">
      <h1>Random Numbers</h1>
      {showH2 && displayedNumber !== null && (
        <h2>{displayedNumber}</h2>
      )}
      {showInput && (
        <div>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleInputChange} 
              placeholder='Enter the series' 
            />
            <button type="submit">Check</button>
          </form>
        </div>
      )}
      {isCorrect !== null && (
        <div>
          {showNumbers && <h3>Displayed Series: {numbers.join(', ')}</h3>}
          <h3 className={isCorrect ? 'correct' : 'incorrect'}>
            {isCorrect ? 'Correct!' : `False! Right Series: ${correctSequence}`}
          </h3>
        </div>
      )}
    </div>
  );
};

export default RandomNumber;
