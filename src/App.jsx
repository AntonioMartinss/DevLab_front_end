import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute';

import Auth from './pages/Auth'
import Library from './pages/Library'
import NotFound from './pages/NotFound'
import Footer from './components/Footer';
import Developers from './pages/Developers';
import GameSelector from './games/GameSelector';
import { games } from './data/games';

function App() {

  return (
    <div className='h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route
            path='/biblioteca'
            element={
              <PrivateRoute>
                <Library />
              </PrivateRoute>
            }
          />
          <Route
            path='jogos/dama'
            element={
              <PrivateRoute>
                <GameSelector game={games[1]}/>
              </PrivateRoute>
            }
          />
          <Route
            path='jogos/jogo-da-velha'
            element={
              <PrivateRoute>
                <GameSelector game={games[0]} />
              </PrivateRoute>
            }
          />
         
          <Route
            path='/desenvolvedores'
            element={
                <Developers />

            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App