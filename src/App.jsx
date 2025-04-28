import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchResults from './Components/SearchResults'
import './App.css'
import Header from './Components/Header'
import ProductionHouse from './Components/ProductionHouse'
import Slider from './Components/Slider'
import GenreMovieList from './Components/GenreMovieList'
import Anime from './Components/Anime'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen pt-[80px] bg-[#1A1A1A]">
        <Header/>
        <Routes>
          <Route path="/" element={
            <>
              <Slider/>
              <ProductionHouse/>
              <GenreMovieList/>
            </>
          }/>
          <Route path="/search" element={<SearchResults/>}/>
          <Route path="/anime" element={<Anime/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
