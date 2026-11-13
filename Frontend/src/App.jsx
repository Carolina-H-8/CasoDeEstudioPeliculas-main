import Generos from "./Pages/Generos"
import Media from "./Pages/Media"
import Directores from "./Pages/Directores"
import Header from "./Components/Header"
import Produtora from "./Pages/Productora"
import { useState } from "react"
import Tipos from "./Pages/Tipos"

function App() {
  const [activeTab, setActiveTab] = useState("Media");
  const pages = {
    Media: <Media />,
    Generos: <Generos />,
    Directores: <Directores/>,
    Productoras: <Produtora/>,
    Tipos: <Tipos/>
  
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
