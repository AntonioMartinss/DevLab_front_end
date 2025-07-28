import React from 'react'
import Header from '../components/Header'
import Domino from '../assets/images/domino.jpg'
import JogoDaVelha from '../assets/images/jogo_da_velha.png'
import { Star } from 'lucide-react'
// import Footer from '../components/Footer'
import LastPlayed from '../components/LastPlayed'

const Games = () => {
  return (
    <div className='font-JetBrains text-sky-blue bg-deep-black min-h-screen'>
      <Header />
      <main>
        <LastPlayed />

        <div className='border border-background mx-44' />

        <div className='text-center mt-12'>
          <h2 className='text-text'>Biblioteca de Jogos</h2>
        </div>


        <div className="flex flex-wrap justify-center mt-8 ">
          <div className="relative w-72 h-56 bg-background ml-6 mr-6 flex flex-col m-4 rounded overflow-hidden ">
            <div className="relative">
              <img
                src={Domino}
                alt="Dominó"
                className="w-full h-44 rounded rounded-b-none"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-background text-sky-blue opacity-0 hover:opacity-100 transition-opacity duration-300 hover:border-2 border-sky-blue">
                Jogar agora!
              </button>
            </div>
            <div className="flex justify-between text-left ml-6 mr-6 mt-3">
              <p className="text-white">Dominó</p>
              <Star className="cursor-pointer" />
            </div>
          </div>

          <div className="relative w-72 h-56 bg-background ml-6 mr-6 flex flex-col m-4 rounded overflow-hidden ">
            <div className="relative">
              <img
                src={JogoDaVelha}
                alt="Jogo da Velha"
                className="w-full h-44 rounded rounded-b-none"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-background text-sky-blue opacity-0 hover:opacity-100 transition-opacity duration-300 hover:border-2 border-sky-blue">
                Jogar agora!
              </button>
            </div>
            <div className="flex justify-between text-left ml-6 mr-6 mt-3">
              <p className="text-white">Jogo da Velha</p>
              <Star className="cursor-pointer" />
            </div>
          </div>

          {/* <div className="relative w-72 h-56 bg-background ml-6 mr-6 flex flex-col m-4 rounded overflow-hidden ">
            <div className="relative">
              <img
                src={MineField}
                alt="Campo Minado"
                className="w-full h-44 rounded rounded-b-none"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-background text-sky-blue opacity-0 hover:opacity-100 transition-opacity duration-300 hover:border-2 border-sky-blue">
                Jogar agora!
              </button>
            </div>
            <div className="flex justify-between text-left ml-6 mr-6 mt-3">
              <p className="text-white">Campo Minado</p>
              <Star className="cursor-pointer" />
            </div>
          </div> */}
        </div>
      </main>

    </div>

  )
}

export default Games
