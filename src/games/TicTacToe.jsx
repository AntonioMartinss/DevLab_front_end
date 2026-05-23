import React, { useState, useRef } from 'react';
import OImg from '../assets/images/Otictactoe.png';
import XImg from '../assets/images/Xtictactoe.png';
const IP_SERVER = "localhost";

const TicTacToe = () => {
  const [statusJogo, setStatusJogo] = useState(0); 
  const [statusMensagem, setStatusMensagem] = useState("");
  const [tabuleiro, setTabuleiro] = useState(Array(3).fill(Array(3).fill(0)));
  const [minhaVez, setMinhaVez] = useState(false);
  
  const socketRef = useRef(null);

  const conectarWebSocket = (urlParams) => {
    const token = sessionStorage.getItem("token");
    const wsUrl = `ws://${IP_SERVER}:8080/DevLab/${urlParams}token=${token}`;
    
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      setStatusMensagem("Conexão estabelecida. Aguardando outro jogador...");
      setStatusJogo(1);
    };

    socketRef.current.onmessage = (event) => {
      const data = event.data;
      const lowerData = data.toLowerCase();
      
      if (data.includes("Jogo Iniciado")) {
        setStatusJogo(2);
        setStatusMensagem(data);
      } else if (data.includes("|")) {
        atualizarTabuleiro(data);
      } else if (data.includes("Sua vez")) {
        setStatusMensagem(data);
        setMinhaVez(true);
      } else {
        setStatusMensagem(data);
        
        if (data.includes("adversário")) {
          setMinhaVez(false);
        }

        if (lowerData.includes("inválido")) {
           setMinhaVez(true);
        } else if (
           lowerData.includes("ganhou") || 
           lowerData.includes("venceu") || 
           lowerData.includes("perdeu") || 
           lowerData.includes("empatou") || 
           lowerData.includes("velha") || 
           lowerData.includes("desistiu") || 
           lowerData.includes("saiu")
        ) {
           setStatusJogo(3);
           setMinhaVez(false);
        }
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('Erro WebSocket:', error);
      setStatusMensagem("Erro na conexão com o servidor.");
      setStatusJogo(3);
    };

    socketRef.current.onclose = () => {
      setStatusJogo((prev) => {
        if (prev === 1 || prev === 2) {
           setStatusMensagem((msg) => msg ? msg : "Conexão encerrada pelo servidor.");
           return 3;
        }
        return prev;
      });
    };
  };

  const atualizarTabuleiro = (str) => {
    const linhas = str.trim().split('\n');
    const novaMatriz = linhas.map(linha => 
      linha.split('|').map(val => parseInt(val.trim(), 10))
    );
    setTabuleiro(novaMatriz);
  };

  const enviarJogada = (rowIndex, colIndex) => {
    if (!minhaVez || statusJogo !== 2) return;
    if (tabuleiro[rowIndex][colIndex] !== 0) return;

    const jogada = { linha: rowIndex + 1, coluna: colIndex + 1 };
    socketRef.current.send(JSON.stringify(jogada));
  };

  const sairDaPartida = () => {
    if (socketRef.current) socketRef.current.close();
    voltarAoMenu();
  };

  const voltarAoMenu = () => {
    setStatusJogo(0);
    setStatusMensagem("");
    setTabuleiro(Array(3).fill(Array(3).fill(0)));
    setMinhaVez(false);
  };

  const handlePublico = () => conectarWebSocket("jogo-da-velha?");
  const handleCriarPrivado = () => conectarWebSocket("jogo-da-velha-private?");
  const handleEntrarPrivado = () => {
    let codigo = prompt("Insira o código da partida") || "1";
    conectarWebSocket(`jogo-da-velha-private?codigo=${codigo}&`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full text-text  font-JetBrains p-4">
      <h1 className="text-3xl font-bold mb-2">TicTacDev</h1>
      <h3 className="text-1xl font-bold mb-8 text-sky-blue">O Jogo da Velha dos Desenvolvedores</h3>

      <div className="mb-6 h-12 text-center">
        <p className={`text-lg font-medium px-4 py-2 rounded-lg shadow-lg ${
            statusJogo === 3 
              ? "bg-deep-black text-sky-blue border border-sky-blue" 
              : "bg-dark-slate-gray text-sky-blue"
        }`}>
          {statusMensagem || "Escolha uma opção para iniciar o jogo"}
          {minhaVez && statusJogo === 2 && " — É a sua vez!"}
        </p>
      </div>

      {/* Tabuleiro */}
      <div className={`grid grid-cols-3 gap-2 bg-dark-slate-gray p-2 rounded-xl shadow-md mb-8 ${statusJogo === 3 ? "opacity-70" : ""}`}>
        {tabuleiro.map((linha, rowIndex) =>
          linha.map((celula, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => enviarJogada(rowIndex, colIndex)}
              className={`w-24 h-24 flex items-center justify-center bg-deep-black transition-colors rounded-lg ${
                minhaVez && statusJogo === 2 && celula === 0 ? "hover:bg-dark-slate-gray cursor-pointer" : ""
              }`}
            >
              {celula === 1 && <span className=""><img src={XImg} alt="X" className="w-full h-full object-contain p-2" /></span>}
              {celula === 2 && <span className=""><img src={OImg} alt="O" className="w-full h-full object-contain p-2" /></span>}
            </div>
          ))
        )}
      </div>

      {/* Renderização Condicional dos Botões */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        
        {/* Mostra só no Menu Inicial */}
        {statusJogo === 0 && (
          <>
            <button onClick={handlePublico} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
              Iniciar Partida Publica
            </button>
            <button onClick={handleCriarPrivado} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
              Criar Partida Privada
            </button>
            <button onClick={handleEntrarPrivado} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
              Entrar em Partida Privada
            </button>
          </>
        )}

        {/* Mostra se está aguardando (1) ou jogando (2) */}
        {(statusJogo === 1 || statusJogo === 2) && (
          <button onClick={sairDaPartida} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-dark-slate-gray text-text border border-transparent hover:border-sky-blue hover:bg-deep-black">
            {statusJogo === 1 ? "CANCELAR" : "DESISTIR"}
          </button>
        )}

        {/* Mostra se o jogo acabou (3) */}
        {statusJogo === 3 && (
          <button onClick={voltarAoMenu} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
            VOLTAR AO MENU
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;