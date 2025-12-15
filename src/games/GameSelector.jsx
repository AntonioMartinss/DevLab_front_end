import Header from "../components/Header";

const GameSelector = ({ game }) => {
  return (
    <div>
      <Header />
      <div className="w-full h-screen flex items-center px-20">
        <div className="w-1/2 flex justify-center">
          <img
            src={game.image}
            alt={game.title}
            className="w-8/12 h-auto"
          />
        </div>

        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-white text-4xl mb-6 sm:text-1xl">{game.title}</h1>
          <p className="text-white text-lg leading-relaxed">
            {game.description}
          </p>
          <div className="mt-8 flex flex-col items-start text-white">
            <button className="bg-background m-4 p-2 rounded-xl border-2 border-gray-200 ">Partida Publica</button>
            <button className="bg-background m-4 p-2 rounded-xl border-2 border-gray-200 ">Criar partida Privada</button>
            <button className="bg-background m-4 p-2 rounded-xl border-2 border-gray-200 ">Entrar em partida privada</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
