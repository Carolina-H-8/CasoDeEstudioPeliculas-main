import Header from "./Components/Header.jsx"
import PageInfo from "./Components/PageInfo.jsx"
import Search from "./Components/Search.jsx"

function App() {
  return (
    <div className="min-h-screen w-full px-6 bg-Neutral flex flex-col items-center" >
      <div className="w-full max-w-7xl flex flex-col  ">
        <Header />
        <main className="w-full flex flex-col gap-8" >
          <PageInfo/>
          <Search/>
          
        </main>

      </div>
      
    
    </div>
   
  )
}

export default App
/* */