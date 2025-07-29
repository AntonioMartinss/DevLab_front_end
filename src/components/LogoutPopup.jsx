import { X } from 'lucide-react';
import { typography } from "../assets/fonts/typography.js"; 

const LogOutPopUp = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${typography.forms.title} font-bold text-text`}>
            Tem certeza?!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className={`${typography.general.body} text-text mb-6`}>
          Tem certeza que deseja encerrar a sessão?<br />
          Você será encaminhado para o início.
        </p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium ${typography.forms.buttonSecondary}`}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium ${typography.forms.buttonPrimary}`}
          >
            Sair mesmo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutPopUp;