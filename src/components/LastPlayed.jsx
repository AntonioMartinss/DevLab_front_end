import React from 'react'

import Domino from '../assets/images/domino.jpg'

const LastPlayed = () => {
    return (
        <div className='justify-around flex mx-44 my-14 text-white'>
            <div className='w-1/2'>
                <img className='w-full h-48 rounded-3xl bg-background' src={Domino} alt="Xadrez" />
            </div>
            <div className='w-1/2 pl-4'>
                <p className='text-xs'>Jogado por último</p>
                <h1 className='text-4xl font-bold'>Dominó</h1>
                <p className='text-sm text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum natus tenetur quisquam commodi blanditiis tempore, corporis accusamus hic nam temporibus aspernatur ullam optio obcaecati labore harum placeat odio molestiae.</p>
                <button className='mt-4 border-white border p-2 rounded-full text-sm hover:bg-gray-600 '>Continuar</button>
            </div>

        </div>
    )
}

export default LastPlayed