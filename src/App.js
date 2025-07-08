import React, { useState, useEffect } from 'react';

const imageUrls = [
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
];

function App() {
  const [tiles, setTiles] = useState(Array(36).fill(null));
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [forceReveal, setForceReveal] = useState(false);

  const randomizeTiles = () => {
    const newTiles = Array(36).fill(null);
    let bananaCount = 0;
    let chickenCount = 0;

    while (bananaCount < 18 || chickenCount < 18) {
      const index = Math.floor(Math.random() * 36);
      if (newTiles[index] === null) {
        if (bananaCount < 18) {
          newTiles[index] = imageUrls[0];
          bananaCount++;
        } else {
          newTiles[index] = imageUrls[1];
          chickenCount++;
        }
      }
    }

    setTiles(newTiles);
  };

  const startGame = () => {
    randomizeTiles();
    setGameStarted(true);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRevealed(Array(36).fill(false));
    setGameOver(false);
    setWinner('');
    setForceReveal(false);
    setSelectedTile(null);
    setPlayer1Choice('');
    setPlayer2Choice('');
  };

  const handleTileClick = (index) => {
    if (revealed[index] || selectedTile !== null || gameOver) return;
    setSelectedTile(index);
    setPlayer1Choice('');
    setPlayer2Choice('');
  };

  const handlePlayerChoice = (player, choice) => {
    if (player === 'player1') setPlayer1Choice(choice);
    else setPlayer2Choice(choice);
  };

  const revealSelectedTile = () => {
    if (selectedTile === null) return;

    const img = tiles[selectedTile];
    const newRevealed = [...revealed];
    newRevealed[selectedTile] = true;
    setRevealed(newRevealed);

    if (img === imageUrls[0] && player1Choice === 'banana') {
      setPlayer1Score((prev) => prev + 1);
    } else if (img === imageUrls[1] && player1Choice === 'chicken') {
      setPlayer1Score((prev) => prev + 1);
    }

    if (img === imageUrls[0] && player2Choice === 'banana') {
      setPlayer2Score((prev) => prev + 1);
    } else if (img === imageUrls[1] && player2Choice === 'chicken') {
      setPlayer2Score((prev) => prev + 1);
    }

    setSelectedTile(null);
    setPlayer1Choice('');
    setPlayer2Choice('');
  };

  useEffect(() => {
    if (!revealed.includes(false)) {
      setGameOver(true);
      if (player1Score > player2Score) {
        setWinner('Player 1 wins!');
      } else if (player2Score > player1Score) {
        setWinner('Player 2 wins!');
      } else {
        setWinner("It's a tie!");
      }
    }
  }, [revealed]);

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE5F4 0%, #E8F5E8 25%, #FFF8E1 50%, #E3F2FD 75%, #F3E5F5 100%)',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      color: '#333',
      paddingTop: '20px',
      paddingBottom: '20px'
    },
    container: {
      textAlign: 'center',
      padding: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '30px',
      boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.15)',
      width: '90%',
      maxWidth: '900px',
      margin: '0 auto',
      border: '5px solid #FFB3E6',
      position: 'relative',
      overflow: 'hidden'
    },
    title: {
      fontSize: '3.5rem',
      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      fontWeight: 'bold'
    },
    startButton: {
      padding: '20px 40px',
      fontSize: '2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      margin: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0px 8px 25px rgba(255, 107, 107, 0.3)',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    scores: {
      fontSize: '1.8rem',
      margin: '20px 0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '15px',
      borderRadius: '20px',
      border: '3px solid #FFD93D'
    },
    playerScore: {
      padding: '10px 20px',
      borderRadius: '15px',
      fontWeight: 'bold',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
    },
    player1Score: {
      backgroundColor: '#FFB3E6',
      color: '#8E24AA'
    },
    player2Score: {
      backgroundColor: '#B3E5FC',
      color: '#0277BD'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '15px',
      maxWidth: '100%',
      margin: '30px 0',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '20px',
      border: '3px dashed #FFD93D'
    },
    square: {
      width: '90px',
      height: '90px',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      cursor: 'pointer',
      border: '3px solid #FFD93D'
    },
    hiddenSquare: {
      background: 'linear-gradient(45deg, #FFE082, #FFF176)',
      backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 20%, transparent 20%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 20%, transparent 20%)'
    },
    revealedSquare: {
      backgroundColor: 'white',
      cursor: 'default'
    },
    tileNumber: {
      position: 'absolute',
      top: '8px',
      left: '10px',
      fontSize: '1rem',
      color: '#666',
      fontWeight: 'bold',
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    choiceBox: {
      marginTop: '30px',
      padding: '25px',
      background: 'linear-gradient(135deg, #FFF8E1, #E8F5E8)',
      border: '4px solid #FFD93D',
      borderRadius: '25px',
      fontSize: '1.3rem',
      boxShadow: '0px 8px 25px rgba(255, 217, 61, 0.3)'
    },
    choiceTitle: {
      fontSize: '1.8rem',
      color: '#FF6B6B',
      marginBottom: '20px',
      fontWeight: 'bold'
    },
    choiceButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '80px',
      marginTop: '20px'
    },
    playerSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    playerTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      padding: '8px 16px',
      borderRadius: '15px',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    player1Title: {
      backgroundColor: '#FF6B6B'
    },
    player2Title: {
      backgroundColor: '#4ECDC4'
    },
    guessButton: {
      margin: '8px 0',
      padding: '15px 25px',
      fontSize: '1.3rem',
      fontWeight: 'bold',
      borderRadius: '20px',
      border: '3px solid #ddd',
      backgroundColor: '#fafafa',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
      minWidth: '130px'
    },
    selectedBanana: {
      backgroundColor: '#FFD93D',
      border: '3px solid #FFC107',
      transform: 'scale(1.1)',
      boxShadow: '0px 8px 25px rgba(255, 193, 7, 0.4)'
    },
    selectedChicken: {
      backgroundColor: '#FF8A65',
      border: '3px solid #FF5722',
      transform: 'scale(1.1)',
      boxShadow: '0px 8px 25px rgba(255, 87, 34, 0.4)'
    },
    revealButton: {
      marginTop: '25px',
      padding: '18px 35px',
      background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.4rem',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0px 8px 25px rgba(76, 175, 80, 0.3)',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    bottomButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      marginTop: '40px'
    },
    revealAllButton: {
      padding: '15px 30px',
      background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0px 6px 20px rgba(33, 150, 243, 0.3)',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    newGameButton: {
      padding: '15px 30px',
      background: 'linear-gradient(45deg, #FF9800, #FFB74D)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0px 6px 20px rgba(255, 152, 0, 0.3)',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    result: {
      marginTop: '40px',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#4CAF50',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '30px',
      borderRadius: '25px',
      border: '4px solid #4CAF50',
      boxShadow: '0px 10px 30px rgba(76, 175, 80, 0.3)'
    },
    winnerText: {
      fontSize: '2.5rem',
      background: 'linear-gradient(45deg, #FFD700, #FF6B6B, #4ECDC4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '20px'
    },
    playAgainButton: {
      padding: '15px 30px',
      background: 'linear-gradient(45deg, #9C27B0, #E1BEE7)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.3rem',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0px 6px 20px rgba(156, 39, 176, 0.3)',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>🐔 Chicken Banana Game! 🍌</h1>
        
        {!gameStarted ? (
          <button 
            onClick={startGame} 
            style={styles.startButton}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            🎮 Start Game 🎮
          </button>
        ) : (
          <>
            <div style={styles.scores}>
              <div style={{...styles.playerScore, ...styles.player1Score}}>
                👦 Player 1: {player1Score} 🏆
              </div>
              <div style={{fontSize: '2rem'}}>⚡ VS ⚡</div>
              <div style={{...styles.playerScore, ...styles.player2Score}}>
                👧 Player 2: {player2Score} 🏆
              </div>
            </div>

            <div style={styles.grid}>
              {tiles.map((img, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.square,
                    ...(revealed[index] || forceReveal ? styles.revealedSquare : styles.hiddenSquare)
                  }}
                  onClick={() => handleTileClick(index)}
                  onMouseOver={(e) => {
                    if (!revealed[index] && !forceReveal) {
                      e.target.style.transform = 'scale(1.1) rotate(5deg)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!revealed[index] && !forceReveal) {
                      e.target.style.transform = 'scale(1) rotate(0deg)';
                    }
                  }}
                >
                  <div style={styles.tileNumber}>{index + 1}</div>
                  {!(revealed[index] || forceReveal) && (
                    <div style={{fontSize: '2rem', opacity: 0.7}}>❓</div>
                  )}
                  {(revealed[index] || forceReveal) && (
                    <img
                      src={img}
                      alt="tile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '17px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {selectedTile !== null && !revealed[selectedTile] && (
              <div style={styles.choiceBox}>
                <h3 style={styles.choiceTitle}>
                  🎯 Tile #{selectedTile + 1} - Make your guesses! 🎯
                </h3>
                <div style={styles.choiceButtons}>
                  <div style={styles.playerSection}>
                    <h4 style={{...styles.playerTitle, ...styles.player1Title}}>
                      👦 Player 1 👦
                    </h4>
                    <button
                      style={{
                        ...styles.guessButton,
                        ...(player1Choice === 'banana' ? styles.selectedBanana : {})
                      }}
                      onClick={() => handlePlayerChoice('player1', 'banana')}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = player1Choice === 'banana' ? 'scale(1.1)' : 'scale(1)'}
                    >
                      🍌 Banana
                    </button>
                    <button
                      style={{
                        ...styles.guessButton,
                        ...(player1Choice === 'chicken' ? styles.selectedChicken : {})
                      }}
                      onClick={() => handlePlayerChoice('player1', 'chicken')}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = player1Choice === 'chicken' ? 'scale(1.1)' : 'scale(1)'}
                    >
                      🐔 Chicken
                    </button>
                  </div>
                  <div style={styles.playerSection}>
                    <h4 style={{...styles.playerTitle, ...styles.player2Title}}>
                      👧 Player 2 👧
                    </h4>
                    <button
                      style={{
                        ...styles.guessButton,
                        ...(player2Choice === 'banana' ? styles.selectedBanana : {})
                      }}
                      onClick={() => handlePlayerChoice('player2', 'banana')}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = player2Choice === 'banana' ? 'scale(1.1)' : 'scale(1)'}
                    >
                      🍌 Banana
                    </button>
                    <button
                      style={{
                        ...styles.guessButton,
                        ...(player2Choice === 'chicken' ? styles.selectedChicken : {})
                      }}
                      onClick={() => handlePlayerChoice('player2', 'chicken')}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = player2Choice === 'chicken' ? 'scale(1.1)' : 'scale(1)'}
                    >
                      🐔 Chicken
                    </button>
                  </div>
                </div>

                {player1Choice && player2Choice && (
                  <button 
                    onClick={revealSelectedTile} 
                    style={styles.revealButton}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    ✨ Reveal Tile ✨
                  </button>
                )}
              </div>
            )}

            <div style={styles.bottomButtons}>
              <button 
                onClick={() => setForceReveal(true)} 
                style={styles.revealAllButton}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                🔍 Reveal All Tiles
              </button>
              <button 
                onClick={startGame} 
                style={styles.newGameButton}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                🎲 New Game
              </button>
            </div>

            {gameOver && (
              <div style={styles.result}>
                <h2>🎉 Game Over 🎉</h2>
                <h3 style={styles.winnerText}>
                  {winner === "It's a tie!" ? "🤝 It's a tie! 🤝" : 
                   winner === "Player 1 wins!" ? "🏆 Player 1 wins! 🏆" : 
                   "🏆 Player 2 wins! 🏆"}
                </h3>
                <button 
                  onClick={startGame} 
                  style={styles.playAgainButton}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  🎮 Play Again 🎮
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;