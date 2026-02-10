import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import api from './api/axios'
import Register from './api/components/Registerform'
import LoginUser from './api/components/LoginUser'
import CreateSong from './api/components/CreateSong'
import Allsongs from './api/components/Allsongs'
import Createplaylist from './api/components/Createplaylist'
import LoginPage from './api/pages/LoginPage'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './api/pages/homepage'
import Allplaylist from './api/components/Allplaylist'
import Navbar from './api/pages/Navbar'
import PlaylistDetails from './api/components/PlaylistDetails'
import{Toaster} from 'react-hot-toast'





// _______________________________________________________________________________________

function App() {
  return(
    // <Register/>
    // <LoginUser/>
    // <CreateSong/>
    // <Allsongs/>
    // <Createplaylist/>
    // <LoginPage/>
    // <Homepage/>
    // <Allplaylist/>


    <BrowserRouter>
    <Toaster position='top-right'/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/loginuser' element={<LoginUser/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/createsong' element={<CreateSong/>}/>
        <Route path='/allsongs' element={<Allsongs/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/allplylst' element={<Allplaylist/>}/>
        <Route path='/createplylst' element={<Createplaylist/>}/>
        <Route path="/playlist/:id" element={<PlaylistDetails/>} />



      </Routes>
    </BrowserRouter>
  )
}

export default App