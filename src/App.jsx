import './App.css'
import Header from './Components/Header'
import ProductionHouse from './Components/ProductionHouse'
import Slider from './Components/Slider'
import GenreMovieList from './Components/GenreMovieList'

function App() {
  return (
    <div className="min-h-screen w-screen pt-[80px] bg-[#1A1A1A]">
      <Header/>
      <Slider/>
      <ProductionHouse/>
      <GenreMovieList/>
    </div>
  )
}

export default App
