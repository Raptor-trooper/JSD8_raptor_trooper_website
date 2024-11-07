import { useState } from 'react'
import AboutUs from './pages/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AboutUs/>
  )
}

export default App
