const Main = () => {
  return (
    <main className="w-3/5 flex items-center justify-center flex-col p-10 text-center">
      <h1 className="text-5xl font-bold text-text mb-6 leading-snug">DevLab</h1>
      <h2 className="text-2xl font-bold text-text mb-6 leading-snug">
        Plataforma de jogos
      </h2>

      <p className="text-text max-w-xl leading-relaxed text-lg">
        Conecte-se com amigos, jogue em rede local e gerencie partidas com tecnologia de ponta. Plataforma gratuita desenvolvida com React.js, TailwindCSS, Java e MongoDB.
      </p>

      <div className="mt-10 w-full h-[1px] bg-sky-blue opacity-30" />
    </main>
  );
};

export default Main;