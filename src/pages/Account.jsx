import React, { useState } from 'react';
import Header from '../components/Header';
import { PenLine } from 'lucide-react'
// import userPhoto from '../assets/images/nanami.jpeg';

const Account = () => {
  const [activeSection, setActiveSection] = useState('account');

  const switchToSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <Header />
      <div className='flex text-white my-12'>
        <aside className="w-1/4 bg-background shadow-md rounded p-4 h-max ">
          <nav className="space-y-2">
            <button
              onClick={() => switchToSection('account')}
              className="block w-full text-left p-2 text-white hover:bg-gray-200 hover:text-black rounded"
            >
              Conta do usuário
            </button>
           
            <button
              onClick={() => switchToSection('history')}
              className="block w-full text-left p-2 text-white hover:bg-gray-200 hover:text-black rounded"
            >
              Histórico de partida
            </button>
          </nav>
        </aside>
        <main className="p-4 mx-8 flex-1 w-full bg-background rounded">
          {activeSection === 'account' && (
            <div>
              <h2 className="text-xl font-semibold">Configurações da Conta</h2>
              <div className="relative w-24 h-24 my-4">
                <img className="block rounded-full w-full h-full object-cover" src={userPhoto} alt="Avatar" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-full">
                  <PenLine/>
                </div>
              </div>


              <div className='flex-col'>
                <div className='items-center justify-between flex'>
                  <p className=' p-2 m-4'>Nome de usuário: Antonio</p>
                  {/* <button className='p-2  text-sky-blue hover:bg-slate-600 rounded'><PenLine /></button> */}
                </div>
                <div className='items-center justify-between flex'>
                  <p className=' p-2 m-4'>Email: antonio@gmail.com</p>
                  {/* <button className='p-2  text-sky-blue hover:bg-slate-600 rounded'><PenLine /></button> */}
                </div>
               
                {/* <div className='items-center justify-between flex'>
                  <button className='p-2 m-4 bg-red-700 text-white rounded'>Solicitar exclusão da conta</button>
                </div> */}

              </div>

            </div>
          )}
         
          {activeSection === 'history' && (
            <div>
              <h2 className="text-xl font-semibold">Histórico de partida</h2>
              {/* Conteúdo da seção de Histórico de partida */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;
