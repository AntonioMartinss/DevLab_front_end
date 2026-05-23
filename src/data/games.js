import Dama from '../assets/images/dama.jpg'
import TicTacToeImage from "../assets/images/tictactoe.svg";
export const games = [
    {
      id: "tictactoe",
      title: "TicTacDev",
      image: TicTacToeImage,
      description: "O Jogo da Velha dos Desenvolvedores",
      url: `jogos/jogo-da-velha`
    },
    {
      id: "checkers",
      title: "DamasDev",
      image: Dama,
      description: "Movimente suas peças com estratégia e capture as do oponente. Alcance o outro lado e torne-se uma dama para dominar o tabuleiro!",
      url: `jogos/dama`
    },
]