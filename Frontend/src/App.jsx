import Header from "./Components/Header.jsx"
function App() {
  return (
    <div className="min-h-screen w-full bg-blue-950 flex flex-col items-center" >
      <div className="w-full max-w-7xl flex-1 flex flex-col border border-blue-950 shadow-2xl">
        <Header />
        <main className="w-full flex-1 p-6" >
          <h1 className="text-5xl text-red-600">hola</h1>
        </main>

      </div>
      
    
    </div>
   
  )
}

export default App
