import './App.css'


import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { PrivateRoute } from './components/PrivateRoute';

import Home from './pages/Home'
import Games from './pages/Games'
import NotFound from './pages/NotFound'
import Footer from './components/Footer';
<<<<<<< Updated upstream
=======
import Account from './pages/Account';
import Developers from './pages/Developers';
>>>>>>> Stashed changes



function App() {

  return (
    <div className='h-screen'>
      <BrowserRouter>
        <Routes>
<<<<<<< Updated upstream
          <Route path='/' element={<Home/>}/>
          <Route 
                        path='/jogos' 
                        element={
                        //    <PrivateRoute>
                                <Games />
                          //   </PrivateRoute>
                        } 
                    />
          <Route path='*' element={<NotFound/>}/>
=======
          <Route path='/' element={<Home />} />
          <Route
            path='/biblioteca'
            element={
                <PrivateRoute>
              <Games />
                </PrivateRoute>
            }
          />
          <Route
            path='/conta'
            element={
                 <PrivateRoute>
              <Account />
                 </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
         <Route
            path='/desenvolvedores'
            element={
                <PrivateRoute>
              <Developers />
                </PrivateRoute>
            }
          />
>>>>>>> Stashed changes
        </Routes>
      
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
