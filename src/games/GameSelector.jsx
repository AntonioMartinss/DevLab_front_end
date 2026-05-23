import React from "react";
import Header from "../components/Header";
import TicTacToe from "../games/TicTacToe";
import Checkers from "../games/Checkers";


const GAME_COMPONENTS = {
  "tictactoe": TicTacToe,
  "jogo-da-velha": TicTacToe, 
  "checkers": Checkers,
  "dama": Checkers,
};

const GameSelector = ({ game }) => {
  const SpecificGame = GAME_COMPONENTS[game?.id] || (() => (
    <div className="text-white text-center mt-20 text-2xl">
      Jogo não encontrado ou em desenvolvimento.
    </div>
  ));

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center">
        <SpecificGame />
      </div>
    </div>
  );
};

export default GameSelector;