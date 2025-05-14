import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:1337'); 

const GamePage = ({ gameId, playerId }) => {
  const [gameState, setGameState] = useState(null);

  
  useEffect(() => {
  socket.emit('join_game', gameId);

  socket.on('game_updated', (updatedGame) => {
    setGameState(updatedGame);
  });

  return () => {
    socket.off('game_updated');
  };
}, [gameId]);
  // Envoi du coup
  const handleMove = (position) => {
    socket.emit('make_move', { gameId, playerId, position });
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Game {gameId}</h1>
      <div>
        {gameState.board.map((cell, index) => (
          <button key={index} onClick={() => handleMove(index)}>
            {cell || '-'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
