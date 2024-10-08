import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Game from './pages/Game'
import Landing from './pages/Landing'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes >
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/game' element={<Game/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
