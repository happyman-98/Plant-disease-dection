import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Upload from './Mycomponents/Upload'
import Navbar from './Mycomponents/Navbar'
function App() {

  return (
    <>
    <Navbar/>
      <Upload/>
    </>
  )
}

export default App
