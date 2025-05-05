import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import SearchResults from './Components/SearchResults'
import './App.css'
import Header from './Components/Header'
import ProductionHouse from './Components/ProductionHouse'
import Slider from './Components/Slider'
import GenreMovieList from './Components/GenreMovieList'
import Anime from './Components/Anime'
import Servant from './Components/Servant'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
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
            <Route path="/servant" element={<Servant/>}/>
            <Route path="/servant/:id" element={<Servant />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
