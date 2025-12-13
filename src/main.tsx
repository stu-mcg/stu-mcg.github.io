import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Videos from './pages/Videos'
import Work from './pages/Work'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/videos' element={<Videos/>}/>
        <Route path='/work' element={<Work/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)