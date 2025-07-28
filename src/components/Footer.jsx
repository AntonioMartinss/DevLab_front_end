

const Footer = () => {

  return (

    <footer className="bg-background text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">DevLab</h2>
            <p>Plataforma de jogos gratuita em LAN.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0  ">
            <h2 className="text-lg font-semibold mb-2 text-center">Desenvolvedores</h2>
            <li className="text-center list-none"><a href="http://github.com/antoniomartinss/devlab_front_end">Antonio</a></li>
            <li className="text-center list-none"><a href="https://github.com/BryanSLemes/DevLab-Back-end">Bryan</a></li>
            <li className="text-center list-none"><a href="https://www.behance.net/HenriquePimentelCs">Henrique</a></li>
          </div>
          <div className="w-full md:w-1/3  flex items-center justify-end">
            <h1 className="text-md:text-2xl lg:text-4xl">DevLab</h1>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-4 text-sm text-white text-center md:text-left">
          <p>Desde 2024 - DevLab.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer