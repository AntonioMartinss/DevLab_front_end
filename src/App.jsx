import './App.css'


import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { PrivateRoute } from './components/PrivateRoute';

import Home from './pages/Home'
import Games from './pages/Games'
import NotFound from './pages/NotFound'
import Footer from './components/Footer';



function App() {

  return (
    <div className='h-screen'>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
