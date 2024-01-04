import { useState } from 'react'
import './App.css'
import NavbarComponent from './Components/Navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavbarComponent/>
      Anuj Singh
    </>
  )
}

export default App
