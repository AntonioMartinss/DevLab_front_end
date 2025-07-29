import { useNavigate } from 'react-router-dom';
import ImageError from '../assets/images/404.svg';
import { typography } from '../assets/fonts/typography.js';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/biblioteca');
  };

  return (
    <div className="h-screen flex bg-background text-text">
      <div className="w-1/2 flex items-center justify-center bg-deep-black">
        <img
        // Illustration from unDraw.co (no attribution required)
          src={ImageError}
          alt="Erro 404"
          className="max-w-[80%] h-auto drop-shadow-lg"
        />
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center px-12 bg-dark-slate-gray">
        <h1 className={`${typography.general.heading2} font-bold text-sky-blue mb-6 text-center lg:text-left`}>
          DevLab Erro 404
        </h1>
        
        <p className={`${typography.general.body} text-text text-center max-w-md`}>
          Parece que você entrou em uma página que não existe. Verifique o link ou volte à página inicial.
        </p>
        
        <button
          onClick={handleBack}
          className={`mt-8 px-6 py-3 bg-sky-blue text-text-dark font-semibold rounded hover:bg-opacity-80 transition ${typography.forms.buttonPrimary}`}
        >
          Retornar
        </button>
      </div>
    </div>
  );
};

export default NotFound;