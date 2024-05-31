
import PlatForm from '../assets/images/download.jpeg';

const Main = () => {
  return (
    <main className="w-3/5 flex bg-dark-blue-gray items-center justify-center flex-col p-10 font-JetBrains">
      <h1 className="text-3xl text-white mb-6 text-center">Plataforma de jogos em Lan 100% atualizada</h1>

      <div className="pt-10 flex flex-col items-center">
        
        <img src={PlatForm} alt="plataforma de jogos" className="w-96 h-auto mb-4" />
        <p className="text-white text-center">
          Plataforma de jogos gratuita, utilizando React.js, Tailwind, Java, e MongoDB. Repositório público.
        </p>
      </div>
    </main>
  );
};

export default Main;
