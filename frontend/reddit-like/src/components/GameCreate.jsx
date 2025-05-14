import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [playerId, setPlayerId] = useState('player1'); 
  const navigate = useNavigate();

  const createGame = async () => {
    try {
      const response = await axios.post('http://localhost:1337/games', { player1Id: userId });
      const gameId = response.data.id;
      navigate(`/game/${gameId}`); 
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const joinGame = async (gameId) => {
    try {
      const response = await axios.post('http://localhost:1337/games/join', { gameId, opponent: userId });
      navigate(`/game/${gameId}`); 
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <button onClick={createGame}>Créer une partie</button>
      <button onClick={() => joinGame(1)}>Rejoindre une partie</button>
    </div>
  );
};

export default Homepage;