import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Videos from './pages/Videos'
import Work from './pages/Work'
import Music from './pages/Music'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/videos' element={<Videos/>}/>
        <Route path='/work' element={<Work/>}/>
        <Route path='/music' element={<Music/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>
)