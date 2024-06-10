import React from 'react'
import Header from '../components/Header'
import JogoDaVelha from '../assets/images/jogo_da_velha.png'
import { Star } from 'lucide-react'
const Games = () => {
  return (
    <div className='font-JetBrains text-sky-blue'>
      <Header />
      <main className='h-screen flex bg-background flex-col'>
        <div className='text-center mt-12'>
          <h2 className='text-text'>Biblioteca de Jogos</h2>
        </div>
        <div className='flex justify-center mt-6 '>
          <div className="w-72 h-56 bg-deep-black flex flex-col mr-4 group rounded">
            <div>
              <img src={JogoDaVelha} alt="Jogo da Velha" className="w-full h-44 rounded rounded-b-none" />
            </div>
            <div className="flex justify-between text-left ml-4 mr-4 mt-3">
              <p className="text-white">Jogo da velha</p>
              <Star />
            </div>
            <div className='mt-3'>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative bottom-0  left-1/2 transform -translate-x-1/2 px-2 py-2 bg-sky-blue text-white rounded-t-none rounded-b-lg">
                Jogar Agora!
              </button>
            </div>

          </div>
          <div className="w-72 h-56 bg-deep-black flex flex-col mr-4 group rounded">
            <div>
              <img src={JogoDaVelha} alt="Jogo da Velha" className="w-full h-44 rounded rounded-b-none" />
            </div>
            <div className="flex justify-between text-left ml-4 mr-4 mt-3">
              <p className="text-white">Jogo da velha</p>
              <Star />
            </div>
            <div className='mt-3'>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative bottom-0  left-1/2 transform -translate-x-1/2 px-2 py-2 bg-sky-blue text-white rounded-t-none rounded-b-lg">
                Jogar Agora!
              </button>
            </div>

          </div>
          <div className="w-72 h-56 bg-deep-black flex flex-col mr-4 group rounded">
            <div>
              <img src={JogoDaVelha} alt="Jogo da Velha" className="w-full h-44 rounded rounded-b-none" />
            </div>
            <div className="flex justify-between text-left ml-4 mr-4 mt-3">
              <p className="text-white">Jogo da velha</p>
              <Star />
            </div>
            <div className='mt-3'>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative bottom-0  left-1/2 transform -translate-x-1/2 px-2 py-2 bg-sky-blue text-white rounded-t-none rounded-b-lg">
                Jogar Agora!
              </button>
            </div>

          </div>




        </div>
      </main>


    </div>
  )
}

export default Games