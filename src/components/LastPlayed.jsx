import React from 'react'

import Chess from '../assets/images/chess.jpg'

const LastPlayed = () => {
    return (
        <div className='justify-around flex mx-44 my-14 text-white'>
            <div className='w-1/2'>
                <img className='w-full h-48 rounded-3xl bg-background' src={Chess} alt="Xadrez" />
            </div>
            <div className='w-1/2 pl-4'>
                <p className='text-xs'>Jogado por último</p>
                <h1 className='text-4xl font-bold'>Xadrez</h1>
                <p className='text-sm text-left'>O xadrez é um jogo de tabuleiro para dois jogadores que envolve estratégia. Cada jogador tem 16 peças e o objetivo é colocar o rei do oponente em xeque-mate, onde ele não pode escapar do ataque.</p>
                <button className='mt-4 border-white border p-2 rounded-full text-sm hover:bg-gray-600 '>Continuar</button>
            </div>

        </div>
    )
}

export default LastPlayed