import Header from '../components/Header'
import LastPlayed from '../components/LastPlayed'
import { typography } from '../assets/fonts/typography'
import { games } from '../data/games'
import { useNavigate } from 'react-router-dom'
import { createContext, useContext, useState } from 'react'

export const GameContext = createContext();

function GamesCard({ game }) {
  const navigate = useNavigate();

  const { setSelectedGameId } = useContext(GameContext);

  const handlePlayGame = () => {
    setSelectedGameId(game.id)
    navigate(`/${game.url}`)
  }
  return (
    <div className="relative w-72 h-56 bg-background ml-6 mr-6 flex flex-col m-4 rounded overflow-hidden ">
      <div className="relative">
        {game.image && (
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-44 rounded rounded-b-none"
          />
        )}
        <button onClick={handlePlayGame} className="absolute inset-0 flex items-center justify-center bg-background text-sky-blue opacity-0 hover:opacity-100 transition-opacity duration-300 hover:border-2 border-sky-blue">
          Jogar agora!

        </button>
      </div>
      <div className="flex justify-between text-left ml-6 mr-6 mt-3">
        <p className="text-white">{game.title}</p>
      </div>
    </div>
  );
}

function Library() {

  const [selectGameId, setSelectedGameId] = useState(null);

  return (
    <GameContext.Provider value={{ selectGameId, setSelectedGameId }}>
      <div className=' text-sky-blue bg-deep-black min-h-screen'>
        <Header />
        <main>
          <LastPlayed />
          <div className='border border-background mx-44' />
          <div className='text-center mt-12'>
            <h2 className={`text-text ${typography.general.heading2}`}>Biblioteca de Jogos</h2>
          </div>
          <div className="flex items-center justify-center">
            <div className='flex flex-wrap justify-center mt-8'>
              {games.map((game) => (
                <GamesCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </GameContext.Provider>
  )

}

export default Library
