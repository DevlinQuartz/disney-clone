import React, { useEffect, useState } from 'react'
import AnimeAPI from '../Services/AnimeAPI'
import AnimeGenres from './AnimeGenres'
import AnimeCard from './AnimeCard'

function Anime() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('top');

  useEffect(() => {
    fetchAnime(selectedGenre);
  }, [selectedGenre]);

  const fetchAnime = async (genreId) => {
    setLoading(true);
    try {
      const response = await AnimeAPI.getAnimeByGenre(genreId);
      setAnimeList(response.data.data);
    } catch (err) {
      console.error("Error fetching anime:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <AnimeGenres 
        onGenreSelect={setSelectedGenre} 
        selectedGenre={selectedGenre}
      />
      {loading ? (
        <div className="text-white text-center mt-8">Loading...</div>
      ) : error ? (
        <div className="text-white text-center mt-8">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mt-8">
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Anime
