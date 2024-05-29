import './App.css'
import Aside from './components/Aside'
import Main from './components/Main'

import { BrowserRouter, Routes, Route } from 'react-router-dom' 

function App() {

  return (
    <div className='h-screen flex'>
      <Main/>
      <Aside/>
    </div>
  )
}

export default App
