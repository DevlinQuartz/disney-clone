import React, { useState, useEffect } from 'react'
import AnimeGenres from './AnimeGenres'
import AnimeCard from './AnimeCard'
import castoriaChibi from '../assets/Images/castoriaChibi.png'
import AnimeAPI from '../Services/AnimeAPI' // Import the API service

function Anime() {
  const [selectedGenre, setSelectedGenre] = useState('top');
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnime = async (genreId, pageNum = 1, append = false) => {
    setIsLoading(true);
    try {
      let response;
      if (genreId === 'top') {
        response = await AnimeAPI.getTopAnime(pageNum);
      } else {
        response = await AnimeAPI.getAnimeByGenre(genreId, pageNum);
      }

      // Access data correctly from Axios response and handle potential empty data
      const responseData = response.data?.data || []; 
      const limitedData = responseData.slice(0, 20); // Ensure we only take 20

      if (append) {
        setAnimeList(prev => [...prev, ...limitedData]); 
      } else {
        setAnimeList(limitedData);
      }
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchAnime(selectedGenre);
  }, [selectedGenre]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAnime(selectedGenre, nextPage, true);
  };

  return (
    <div className="min-h-screen pb-10">
      <AnimeGenres onGenreSelect={setSelectedGenre} selectedGenre={selectedGenre} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          {animeList.map((anime, index) => (
            <AnimeCard 
              key={`${anime.mal_id}-${index}`} 
              anime={anime} 
            />
          ))}
        </div>

        {/* Load More Section */}
        {!isLoading && animeList.length > 0 && (
          <div className="flex justify-center mt-8"> {/* Simplified container */}
            <button 
              onClick={loadMore}
              className="flex flex-col items-center group text-white font-bold text-2xl font-sans tracking-wider transition-all duration-300
                       hover:text-yellow-400 hover:scale-105  /* Adjusted hover scale */
                       active:scale-95 outline-none focus:outline-none border-none bg-transparent p-0" /* Reset button styles */
            >
              <img 
                src={castoriaChibi} 
                alt="Load More" 
                className="w-24 object-contain transition-all duration-300 
                         group-hover:scale-125 group-hover:rotate-[10deg] group-hover:brightness-110 /* Apply hover effects via group */
                         group-active:scale-95" /* Apply active effects via group */
                // Removed onClick from img
              />
              <span className="-mt-1">Load More</span> {/* Added span for text, adjusted margin */}
            </button>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Anime;
