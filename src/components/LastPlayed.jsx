import React from 'react';
import { games } from '../data/games';
import { useNavigate } from 'react-router-dom';

const LastPlayed = () => {
    const navigate = useNavigate();
    const lastId = localStorage.getItem("lastPlayedId");
    // Se não tiver ID, pega o primeiro, sem erro
    const game = games.find(g => String(g.id) === String(lastId)) || games[0];

    if (!game) return null;

    return (
        <div className='flex mx-44 my-14 text-white items-center'>
            <div className='w-1/2'>
                <img className='w-full h-48 rounded-3xl bg-background object-cover' src={game.image} alt={game.title} />
            </div>
            <div className='w-1/2 pl-8'>
                <p className='text-xs uppercase tracking-widest'>Acessado por último</p>
                <h1 className='text-4xl font-bold mt-2'>{game.title}</h1>
                <p className='text-sm mt-4 opacity-80'>{game.description || "Continue sua partida."}</p>
                <button 
                    onClick={() => navigate(`/${game.url}`)}
                    className='mt-6 border border-white px-8 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all'
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default LastPlayed;