import React, { useState, useRef, useEffect } from 'react'
import MovieDescriptionDialog from './MovieDescriptionDialog'
import TrailerModal from './TrailerModal'
import GlobalAPI from '../Services/GlobalAPI'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/'

function MovieCard({movie, isSearchResult = false}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showOnLeft, setShowOnLeft] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const cardRef = useRef(null);

  const handleClick = async () => {
    try {
      const response = await GlobalAPI.getMovieVideos(movie.id);
      const videos = response.data.results;
      const trailer = videos.find(video => video.type === "Trailer") || videos[0];
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const checkSpaceOnRight = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right;
      setShowOnLeft(spaceOnRight < 600); // size of width and margin of the card
    }
  };

  useEffect(() => {
    if (isHovered) {
      checkSpaceOnRight();
    }
  }, [isHovered]);

  return (
    <div ref={cardRef} 
         className={`relative flex-shrink-0 ${isHovered ? 'z-[999]' : ''}`}>
        <img src={IMAGE_BASE_URL+movie.poster_path} 
             onClick={handleClick}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             className={`rounded-lg hover:border-[3px] border-white transition-all duration-150 ease-in hover:scale-110 cursor-pointer
               ${isSearchResult ? 'w-[220px] md:w-[300px]' : 'w-[110px] md:w-[200px]'}`}
        />
        {isHovered && (
          <div className={`absolute -top-5 ${showOnLeft ? 'right-[100%]' : 'left-[100%]'} pointer-events-none z-[9999] overflow-visible animate-fadeIn`}>
            <MovieDescriptionDialog movie={movie} isSearchResult={isSearchResult} />
          </div>
        )}
        {showTrailer && trailerKey && (
          <TrailerModal videoKey={trailerKey} onClose={() => setShowTrailer(false)} />
        )}
    </div>
  )
}

export default MovieCard