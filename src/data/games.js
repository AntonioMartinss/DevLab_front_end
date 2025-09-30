import Domino from '../assets/images/domino.jpg'
import TicTacToeImage from "../assets/images/tictactoe.svg";
export const games = [
    {
      id: 1,
      title: "Jogo da Velha",
      image: TicTacToeImage,
      description: "Desafie um amigo nesse clássico de raciocínio rápido. Forme uma linha de três símbolos antes do adversário e vença a partida!",
      url: `jogos/jogo-da-velha`
    },
    {
      id: 2,
      title: "Dama",
      image: Domino,
      description: "Movimente suas peças com estratégia e capture as do oponente. Alcance o outro lado e torne-se uma dama para dominar o tabuleiro!",
      url: `jogos/dama`
    },
]