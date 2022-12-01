import { createContext } from 'react'
import { useState } from 'react'
import './App.scss'
import Hero from './Components/Hero/Hero'
import Loading from './Components/Loading/Loading'
import Navbar from './Components/Navbar/Navbar'
import Uploader from './Components/Blur/Blur'

const LoadingContext = createContext(null)
function App() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <LoadingContext.Provider value={isLoading}>
        <Loading />
      </LoadingContext.Provider>
      <Navbar />
      <Hero />
      <LoadingContext.Provider value={{"setIsLoading" : setIsLoading, "isLoading" : isLoading}}>
        <Uploader />
      </LoadingContext.Provider>

    </>
  )
}

export { LoadingContext }
export default App
