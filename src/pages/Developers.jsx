import React from 'react'
import Header from '../components/Header'
import Antonio from '../assets/images/antonio.webp'
import Bryan from '../assets/images/bryan.jpeg'
import Henrique from '../assets/images/henrique.jpeg'
import { Linkedin, Github, Palette } from 'lucide-react'
import { typography } from "../assets/fonts/typography"

function DeveloperCard({ developer }) {
  return (
    <div className="w-80 h-80 bg-background rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 relative">

      <div className="relative w-24 h-24 mb-6">
        <img
          className="block rounded-full w-full h-full object-cover ring-4 ring-sky-blue shadow-lg"
          src={developer.photo}
          alt="Foto do Desenvolvedor"
        />
      </div>

      <h2 className={`font-bold text-text mb-2 ${typography.general.heading2}`}>
        {developer.name}
      </h2>

      <p className={`text-text mb-6 ${typography.general.body}`}>
        {developer.title}
      </p>

      <div className="flex space-x-6">

        {developer.linkedin && (
          <a
            href={developer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Linkedin size={20} />
          </a>
        )}

        {developer.github && (
          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Github size={20} />
          </a>
        )}
        {developer.behance && (
          <a
            href={developer.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Palette size={20} />
          </a>
        )}
      </div>

      <div className="absolute top-4 right-4 w-3 h-3 bg-sky-blue rounded-full opacity-60"></div>
    </div>
  );
}

function Developers() {

  const developers = [
    {
      id: 1,
      name: "Antônio Martins de Souza",
      title: "Desenvolvedor Front End",
      photo: Antonio,
      linkedin: "https://www.linkedin.com/in/antoniomsouza2/",
      github: "https://github.com/AntonioMartinss"
    },
    {
      id: 2,
      name: "Bryan Silva Lemes",
      title: "Desenvolvedor Back End",
      photo: Bryan,
      linkedin: "https://www.linkedin.com/in/bryan-silva-lemes/",
      github: "https://github.com/BryanSLemes"
    },
    {
      id: 3,
      name: "Henrique Pimentel",
      title: "Designer Gráfico",
      photo: Henrique,
      linkedin: "https://www.linkedin.com/in/henrique-pimentel-2a3a0a285/",
      behance: "https://www.behance.net/HenriquePimentelCs"
    }
  ];

  return (
    <div>
      <Header />
      <div className="min-h-screen p-8">

        <div className="text-center mb-12">
          <h1 className={`font-bold text-text mb-4 ${typography.general.heading1}`}>Nossa Equipe</h1>
          <p className={`text-text opacity-90 ${typography.general.subtitle}`}>Conheça os desenvolvedores por trás deste projeto!</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xll">
            {developers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        </div>
         <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-background rounded-2xl shadow-2xl p-8">
            <h2 className={`font-bold text-text text-center mb-8 ${typography.general.heading1}`}>
              Nossa História
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className={`text-text text-base leading-relaxed mb-6 ${typography.general.base}`}>
                Somos amigos há mais de 17 anos, e desde pequenos sempre tivemos uma paixão em comum: 
                a área de Tecnologia. Mesmo seguindo caminhos diferentes em nossas 
                formações acadêmicas, sempre partilhamos de objetivos e sonhos semelhantes.
              </p>
              
              <p className={`text-text text-base leading-relaxed mb-6 ${typography.general.base}`}>
                Antônio seguiu no Ensino Médio/Técnico em Informática no <strong>Instituto Federal Sul Rio Grandense em Charqueadas</strong>, onde aprofundou seus conhecimentos em desenvolvimento 
                e tecnologias na área de TI.
              </p>
              
              <p className={`text-text text-base leading-relaxed mb-6 ${typography.general.base}`}>
                Bryan iniciou o Ensino Técnico no <strong>Senac em Porto Alegre</strong>, e para 
                complementar suas habilidades na área de TI, seguiu seus estudos na <strong>Uninter em São Jerônimo</strong>, ambas no Rio Grande do Sul.
              </p>
              
              <p className={`text-text text-base leading-relaxed mb-6 ${typography.general.base}`}>
                Essa amizade de longa data, combinada com nossa paixão compartilhada pela tecnologia, 
                nos permite trabalhar juntos, criando ótimos projetos, como é o caso do <strong>DevLab</strong>. 
                Transformamos ideias em realidade através da programação!
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Developers