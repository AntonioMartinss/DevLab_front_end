import React, { useState, useRef } from 'react';

import PecaBrancaImg from '../assets/images/peca-branca.png';
import PecaPretaImg from '../assets/images/peca-preta.png';
import DamaBrancaImg from '../assets/images/dama-branca.png'; 
import DamaPretaImg from '../assets/images/dama-preta.png'; 

const IP_SERVER = "localhost";
const COLS = ["A", "B", "C", "D", "E", "F", "G", "H"];

const initialBoard = () => {
  const board = {};
  const brancas = ["A1","C1","E1","G1","B2","D2","F2","H2","A3","C3","E3","G3"];
  const pretas = ["B6","D6","F6","H6","A7","C7","E7","G7","B8","D8","F8","H8"];
  brancas.forEach(id => board[id] = { cor: 'branca', tipo: 'comum' });
  pretas.forEach(id => board[id] = { cor: 'preta', tipo: 'comum' });
  return board;
};

const Checkers = () => {
  const [statusJogo, setStatusJogo] = useState(0); 
  const [statusMensagem, setStatusMensagem] = useState("");
  const [tabuleiro, setTabuleiro] = useState(initialBoard());
  const [minhaVez, setMinhaVez] = useState(false);
  const [minhaCor, setMinhaCor] = useState(null);
  
  const [selecionada, setSelecionada] = useState(null);
  const [celulasDisponiveis, setCelulasDisponiveis] = useState([]);

  const socketRef = useRef(null);
  const corRef = useRef(null); 

  const conectarWebSocket = (urlParams) => {
    const token = sessionStorage.getItem("token");
    const wsUrl = `ws://${IP_SERVER}:8080/DevLab/${urlParams}token=${token}`;
    
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      setStatusMensagem("Conexão estabelecida. Aguardando outro jogador...");
      setStatusJogo(1);
      corRef.current = null; 
    };

    socketRef.current.onmessage = (event) => {
      const data = event.data;
      const lowerData = data.toLowerCase();
      
      if (data.includes("Jogo Iniciado")) {
        setStatusJogo(2);
        setStatusMensagem(data);
      } else if (data.includes("codigo")) {
        setStatusMensagem(data);
      } else if (data.includes("Sua vez")) {
        setStatusMensagem(data);
        setMinhaVez(true);
        if (!corRef.current) {
          corRef.current = "preta"; 
          setMinhaCor("preta");
        }
      } else if (data.includes("adversário")) {
        setStatusMensagem(data);
        setMinhaVez(false);
        if (!corRef.current) {
          corRef.current = "branca";
          setMinhaCor("branca");
        }
      } else if (isBoardString(data)) {
        atualizarTabuleiro(data);
      } else {
        setStatusMensagem(data);
        
        if (lowerData.includes("inválido")) {
           setMinhaVez(true); 
        } else if (
           lowerData.includes("ganhou") || 
           lowerData.includes("venceu") || 
           lowerData.includes("perdeu") || 
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

  const isBoardString = (str) => {
    const lines = str.trim().split("\n");
    return lines.length === 8 && lines.every(l => /^[pPbB.]+$/.test(l.trim()));
  };

  const atualizarTabuleiro = (str) => {
    const novoTabuleiro = {};
    const linhas = str.trim().split('\n');
    for (let i = 0; i < 8; i++) {
      const row = 8 - i; 
      for (let j = 0; j < 8; j++) {
        const col = COLS[j];
        const char = linhas[i].charAt(j);
        if (char !== '.') {
          novoTabuleiro[col + row] = {
            cor: char.toLowerCase() === 'b' ? 'branca' : 'preta',
            tipo: char === char.toUpperCase() ? 'dama' : 'comum'
          };
        }
      }
    }
    setTabuleiro(novoTabuleiro);
    setSelecionada(null);
    setCelulasDisponiveis([]);
  };

  const calcularMovimentos = (cellId) => {
    const peca = tabuleiro[cellId];
    if (!peca) return [];

    const col = cellId[0];
    const row = parseInt(cellId[1]);
    const movimentos = [];

    const isVazia = (id) => !tabuleiro[id];
    const corPecaId = (id) => tabuleiro[id] ? tabuleiro[id].cor : null;
    const isDentro = (c, r) => COLS.includes(c) && r >= 1 && r <= 8;

    const checarDirecao = (dCol, dRow) => {
      const meioCol = String.fromCharCode(col.charCodeAt(0) + dCol);
      const meioRow = row + dRow;
      const meioId = meioCol + meioRow;

      const destCol = String.fromCharCode(col.charCodeAt(0) + dCol * 2);
      const destRow = row + dRow * 2;
      const destId = destCol + destRow;

      if (isDentro(meioCol, meioRow) && isVazia(meioId)) {
        movimentos.push(meioId);
      }
      if (
        isDentro(meioCol, meioRow) && isDentro(destCol, destRow) &&
        corPecaId(meioId) !== null && corPecaId(meioId) !== peca.cor &&
        isVazia(destId)
      ) {
        movimentos.push(destId);
      }
    };

    if (peca.tipo === "comum") {
      if (peca.cor === "branca") {
        checarDirecao(-1, +1); checarDirecao(+1, +1);
      } else {
        checarDirecao(-1, -1); checarDirecao(+1, -1);
      }
    } else {
      checarDirecao(-1, +1); checarDirecao(+1, +1);
      checarDirecao(-1, -1); checarDirecao(+1, -1);
    }

    return movimentos;
  };

  const enviarJogada = (cellId) => {
    if (!minhaVez || statusJogo !== 2) return;

    if (selecionada && celulasDisponiveis.includes(cellId)) {
      const jogada = { idPosicaoOriginal: selecionada, idPosicaoNova: cellId };
      socketRef.current.send(JSON.stringify(jogada));
      
      setSelecionada(null);
      setCelulasDisponiveis([]);
      return;
    }

    const peca = tabuleiro[cellId];
    if (peca && peca.cor === minhaCor) {
      setSelecionada(cellId);
      setCelulasDisponiveis(calcularMovimentos(cellId));
      return;
    }

    setSelecionada(null);
    setCelulasDisponiveis([]);
  };

  const sairDaPartida = () => {
    if (socketRef.current) socketRef.current.close();
    voltarAoMenu();
  };

  const voltarAoMenu = () => {
    setStatusJogo(0);
    setStatusMensagem("");
    setTabuleiro(initialBoard());
    setMinhaVez(false);
    setMinhaCor(null);
    setSelecionada(null);
    setCelulasDisponiveis([]);
  };

  const handlePublico = () => conectarWebSocket("dama?");
  const handleCriarPrivado = () => conectarWebSocket("dama-private?");
  const handleEntrarPrivado = () => {
    let codigo = prompt("Insira o código da partida") || "1";
    conectarWebSocket(`dama-private?codigo=${codigo}&`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full text-text font-JetBrains p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">DamasDev</h1>
      <h3 className="text-1xl font-bold mb-8 text-center text-sky-blue">
        Movimente com estratégia e torne-se uma dama!
      </h3>

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

      <div className={`flex flex-col border-2 border-deep-black bg-black p-2 md:p-3 rounded-xl shadow-2xl mb-8 select-none ${statusJogo === 3 ? "opacity-70" : ""}`}>
        {Array.from({ length: 8 }, (_, i) => {
          const row = 8 - i;
          return (
            <div key={row} className="flex">
              {COLS.map((col, j) => {
                const cellId = col + row;
                const isDark = (i + j) % 2 === 1;
                const peca = tabuleiro[cellId];
                
                const isAvailable = celulasDisponiveis.includes(cellId);
                const isSelected = selecionada === cellId;

                let bgColor = isDark ? "bg-deep-black" : "bg-dark-slate-gray";
                
                if (isSelected) {
                  bgColor = "bg-sky-blue/40 border-2 border-sky-blue";
                } else if (isAvailable) {
                  bgColor = isDark 
                    ? "bg-sky-blue/20 cursor-pointer hover:bg-sky-blue/30" 
                    : "bg-sky-blue/30 cursor-pointer hover:bg-sky-blue/40";
                }

                return (
                  <div
                    key={cellId}
                    onClick={() => enviarJogada(cellId)}
                    className={`w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center box-border transition-colors ${bgColor}`}
                  >
                    {peca && (
                      <img
                        src={
                          peca.cor === 'branca'
                            ? peca.tipo === 'dama' ? DamaBrancaImg : PecaBrancaImg
                            : peca.tipo === 'dama' ? DamaPretaImg : PecaPretaImg
                        }
                        alt={`${peca.tipo} ${peca.cor}`}
                        className={`w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain ${
                           minhaVez && peca.cor === minhaCor && statusJogo === 2 ? "hover:scale-105 cursor-pointer" : ""
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {statusJogo === 0 && (
          <>
            <button onClick={handlePublico} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
              INICIAR PARTIDA PÚBLICA
            </button>
            <button onClick={handleCriarPrivado} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
              CRIAR PARTIDA PRIVADA
            </button>
            <button onClick={handleEntrarPrivado} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
              ENTRAR PARTIDA PRIVADA
            </button>
          </>
        )}

        {(statusJogo === 1 || statusJogo === 2) && (
          <button onClick={sairDaPartida} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-dark-slate-gray text-text border border-transparent hover:border-sky-blue hover:bg-deep-black">
            {statusJogo === 1 ? "CANCELAR" : "DESISTIR"}
          </button>
        )}

        {statusJogo === 3 && (
          <button onClick={voltarAoMenu} className="py-3 px-6 rounded-lg font-bold transition-all shadow-md bg-sky-blue text-text-dark hover:opacity-80">
            VOLTAR AO MENU
          </button>
        )}
      </div>

      {minhaCor && statusJogo !== 0 && (
        <p className="mt-6 text-sm text-sky-blue">
          Você joga com as peças: <span className="font-bold text-text capitalize">{minhaCor}s</span>
        </p>
      )}
    </div>
  );
};

export default Checkers;