import './App.css'


import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { PrivateRoute } from './components/PrivateRoute';

import Home from './pages/Home'
import Games from './pages/Games'
import NotFound from './pages/NotFound'



function App() {

  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route 
                        path='/jogos' 
                        element={
                            // <PrivateRoute>
                                <Games />
                            // </PrivateRoute>
                        } 
                    />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
