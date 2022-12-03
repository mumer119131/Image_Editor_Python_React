import { createContext } from 'react'
import { useState } from 'react'
import './App.scss'
import Hero from './Components/Hero/Hero'
import Loading from './Components/Loading/Loading'
import Navbar from './Components/Navbar/Navbar'
import Uploader from './Components/Blur/Blur'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Embossing from './Components/Embossing/Embossing'
import Tools from './Components/Tools/Tools'
import ReduceSize from './Components/ReduceSize/ReduceSize'
const LoadingContext = createContext(null)
function App() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>

      <BrowserRouter>
        <LoadingContext.Provider value={isLoading}>
          <Loading />
        </LoadingContext.Provider>
        <Navbar />
        <Tools />
        <Hero />
      <Routes>
        <Route path='/' element={
              <LoadingContext.Provider value={{"setIsLoading" : setIsLoading, "isLoading" : isLoading}}>
                <Uploader />
              </LoadingContext.Provider>} />
        <Route path='/reduceSize' element={
              <LoadingContext.Provider value={{"setIsLoading" : setIsLoading, "isLoading" : isLoading}}>
                <ReduceSize />
              </LoadingContext.Provider>} />
        <Route path='/embossing' element={
          <LoadingContext.Provider value={{"setIsLoading" : setIsLoading, "isLoading" : isLoading}}>
            <Embossing />
        </LoadingContext.Provider>}
            />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export { LoadingContext }
export default App
