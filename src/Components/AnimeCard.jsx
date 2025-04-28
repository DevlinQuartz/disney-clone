import React, { useState, useRef, useEffect } from 'react'
import MovieDescriptionDialog from './MovieDescriptionDialog'

function AnimeCard({anime}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showOnLeft, setShowOnLeft] = useState(false);
  const cardRef = useRef(null);

  const checkSpaceOnRight = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const elementRightPosition = rect.right;
      
      let requiredSpace;
      if (screenWidth >= 768) {
        requiredSpace = 500 + 40;
      } else if (screenWidth >= 640) {
        requiredSpace = 300 + 30;
      } else {
        requiredSpace = 200 + 20;
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

  useEffect(() => {
    const handleResize = () => {
      if (isHovered) {
        checkSpaceOnRight();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isHovered]);

  // Transform anime data to match MovieDescriptionDialog format
  const formattedData = {
    title: anime.title,
    vote_average: anime.score * 2, // Convert MAL's 1-10 to TMDB's 1-20 scale
    vote_count: anime.scored_by,
    overview: anime.synopsis,
    isAnime: true // Flag to identify anime content
  };

  return (
    <div ref={cardRef} className="relative flex justify-center">
      <img 
        src={anime.images.jpg.large_image_url} 
        alt={anime.title}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-[220px] md:w-[300px] rounded-lg hover:border-[3px] border-white transition-all duration-150 ease-in hover:scale-105 cursor-pointer"
      />
      {isHovered && (
        <div className={`absolute -top-5 ${showOnLeft ? 'right-[100%]' : 'left-[100%]'} pointer-events-none z-[9999] overflow-visible animate-fadeIn`}>
          <MovieDescriptionDialog movie={formattedData} isSearchResult={true} />
        </div>
      )}
    </div>
  )
}

export default AnimeCard
