import Generos from "./Pages/Generos"
import Media from "./Pages/Media"
import Header from "./Components/Header"
import { useState } from "react"

function App() {
  const [activeTab, setActiveTab] = useState("Media");
  const pages = {
    Media: <Media />,
    Generos: <Generos />,
    Directores: <h1>Modulo Directores</h1>,
    Productoras: <h1>Modulo Productoras</h1>,
    Tipos: <h1>Modulo Tipos</h1>
  };

  return (
    <div className="min-h-screen w-full px-6 bg-Neutral flex flex-col items-center" >
      <div className="w-full max-w-7xl flex flex-col  ">

        <Header
          activeTab={activeTab}
          onNavigate={setActiveTab}
        />
      </div>
      

      {pages[activeTab]}
    </div>
   
  )
}

export default App
