import React, { useState, useEffect } from 'react';
import './App.css';

const imageUrls = [
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
];

function App() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [tiles, setTiles] = useState(Array(36).fill(null));
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const randomizeTiles = () => {
    const newTiles = Array(36).fill(null);
    const numBananas = 18;
    const numChickens = 18;

    let bananaPlaced = 0;
    let chickenPlaced = 0;

    while (bananaPlaced < numBananas || chickenPlaced < numChickens) {
      const randomIndex = Math.floor(Math.random() * 36);

      if (newTiles[randomIndex] === null) {
        if (bananaPlaced < numBananas) {
          newTiles[randomIndex] = imageUrls[0];
          bananaPlaced++;
        } else if (chickenPlaced < numChickens) {
          newTiles[randomIndex] = imageUrls[1];
          chickenPlaced++;
        }
      }
    }

    setTiles(newTiles);
  };

  const handleClick = (index) => {
    if (gameOver || revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    const clickedImage = tiles[index];

    if (clickedImage === imageUrls[0] && playerChoice === 'banana') {
      setPlayer1Score(player1Score + 1);
    } else if (clickedImage === imageUrls[1] && playerChoice === 'chicken') {
      setPlayer2Score(player2Score + 1);
    } else if (clickedImage !== imageUrls[0] && playerChoice === 'banana') {
      setWinner('Player 2 (Chicken) wins');
      setGameOver(true);
    } else if (clickedImage !== imageUrls[1] && playerChoice === 'chicken') {
      setWinner('Player 1 (Banana) wins');
      setGameOver(true);
    }

    if (player1Score + player2Score === 36) {
      if (player1Score > player2Score) {
        setWinner('Player 1 (Banana) wins the game!');
      } else {
        setWinner('Player 2 (Chicken) wins the game!');
      }
      setGameOver(true);
    }
  };

  const restartGame = () => {
    randomizeTiles();
    setPlayerChoice('');
    setGameOver(false);
    setWinner('');
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRevealed(Array(36).fill(false));
    setCurrentPlayer('Player 1');
  };

  useEffect(() => {
    if (playerChoice !== '') {
      randomizeTiles();
    }
  }, [playerChoice]);

  return (
    <div className="container">
      <h1>Chicken Banana Game!</h1>
      {playerChoice === '' ? (
        <div className="category-selection">
          <h2>Choose:</h2>
          <button className="category-button" onClick={() => setPlayerChoice('banana')}>
            Banana
          </button>
          <button className="category-button" onClick={() => setPlayerChoice('chicken')}>
            Chicken
          </button>
        </div>
      ) : (
        <>
          <div className={`turn-indicator ${currentPlayer === 'Player 1' ? 'banana' : 'chicken'}`}>
            <h2>
              {currentPlayer}'s turn:{' '}
              {currentPlayer === 'Player 1'
                ? playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                : playerChoice === 'banana'
                ? 'Chicken'
                : 'Banana'}
            </h2>
          </div>
          <div className="scores">
            {playerChoice === 'banana' && (
              <p>Player 1 (Banana) Score: {player1Score}</p>
            )}
            {playerChoice === 'chicken' && (
              <p>Player 2 (Chicken) Score: {player2Score}</p>
            )}
          </div>
          <div className="grid">
            {tiles.map((img, index) => (
              <div
                key={index}
                className="square"
                onClick={() => handleClick(index)}
                style={{ backgroundColor: revealed[index] ? 'white' : 'lightpink', cursor: 'pointer' }}
              >
                {revealed[index] && (
                  <img
                    src={img}
                    alt="Hidden"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {gameOver && (
            <div className="result">
              <h2>{winner}</h2>
              <button onClick={restartGame}>Restart Game</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
