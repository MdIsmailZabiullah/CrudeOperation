import { useState } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import AllRoutes from './AllRoutes/AllRoutes'
import Navbar from "./Components/Navbar"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:200px_20px] "></div>
    {/* <Navbar/> */}
    <AllRoutes/>
    </Router>
   
    </>
    
   
  )
}

export default App
