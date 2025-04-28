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
      const screenWidth = window.innerWidth;
      const elementRightPosition = rect.right;
      
      // Calculate required space based on screen size
      let requiredSpace;
      if (screenWidth >= 768) { // md breakpoint
        requiredSpace = 500 + 40; // dialog width + margin for md screens
      } else if (screenWidth >= 640) { // sm breakpoint
        requiredSpace = 300 + 30; // dialog width + margin for sm screens
      } else {
        requiredSpace = 200 + 20; // dialog width + margin for xs screens
      }

      const availableSpace = screenWidth - elementRightPosition;
      setShowOnLeft(availableSpace < requiredSpace);
    }
  };

  useEffect(() => {
    if (isHovered) {
      checkSpaceOnRight();
    }
  }, [isHovered]);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (isHovered) {
        checkSpaceOnRight();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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