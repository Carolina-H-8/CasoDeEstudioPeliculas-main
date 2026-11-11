import Header from "./Components/Header.jsx"
import PageInfo from "./Components/PageInfo.jsx"

function App() {
  return (
    <div className="min-h-screen w-full px-6 bg-Neutral flex flex-col items-center" >
      <div className="w-full max-w-7xl flex flex-col  ">
        <Header />
        <main className="w-full" >
          <PageInfo/>
          <section></section>
          
        </main>

      </div>
      
    
    </div>
   
  )
}

export default App
/* */