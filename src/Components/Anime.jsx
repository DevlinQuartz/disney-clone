import React, { useEffect, useState } from 'react'
import AnimeAPI from '../Services/AnimeAPI'
import AnimeCard from './AnimeCard'
import AnimeGenres from './AnimeGenres'

function Anime() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AnimeAPI.getTopAnime()
      .then(resp => {
        setAnimeList(resp.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching anime:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (error) return <div className="p-8 text-white">Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl text-white font-bold mb-6">Top Rated Anime</h2>
      <AnimeGenres />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mt-8">
        {animeList.map((anime) => (
          <div key={anime.mal_id} className="flex justify-center">
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Anime
