import React from 'react'
import { HiStar, HiOutlineStar } from 'react-icons/hi2'
import { HiUserGroup } from 'react-icons/hi'

function MovieDescriptionDialog({movie, isSearchResult = false}) {
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '.....'
    }
    return text
  }

  const renderRating = (rating) => {
    if (!rating && rating !== 0) return null;

    if (movie.isAnime) {
      return (
        <div className='flex items-center gap-1'>
          <HiStar className='text-yellow-400 text-xl'/>
          <span className='text-yellow-400 text-sm sm:text-base font-semibold ml-1'>{(rating/2).toFixed(2)}</span>
        </div>
      );
    }

    const starRating = Math.min(Math.max(rating / 2, 0), 5);
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 !== 0;
    const emptyStars = Math.max(5 - fullStars - (hasHalfStar ? 1 : 0), 0);

    return (
      <>
        <div className='flex items-center gap-1'>
          {[...Array(fullStars)].map((_, i) => (
            <HiStar key={i} className='text-yellow-400 text-xl'/>
          ))}
          {hasHalfStar && (
            <div className='relative'>
              <HiOutlineStar className='text-yellow-400 text-xl'/>
              <HiStar className='text-yellow-400 text-xl absolute top-0 left-0 w-[50%] overflow-hidden'/>
            </div>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <HiOutlineStar key={i} className='text-yellow-400 text-xl'/>
          ))}
        </div>
        <span className='text-yellow-400 text-sm sm:text-base font-semibold'>{(rating/2).toFixed(2)}</span>
      </>
    );
  };

  return (
    <div className={`p-4 bg-[#1A1A1A]/30 backdrop-blur-md rounded-lg
      w-[250px] sm:w-[300px] md:w-[500px]
      h-[180px] sm:h-[200px] md:h-[340px]
      ${isSearchResult ? 'md:h-[488px]' : ''}
      border-[1px] border-white transition-all duration-300 ease-in-out z-[999] 
      mx-3 sm:mx-5 md:mx-10 overflow-visible shadow-xl`}>
      
      <h2 className='text-lg sm:text-2xl md:text-3xl text-white font-bold mb-2'>{movie.title || movie.name}</h2>
      
      <div className='flex items-center gap-2 sm:gap-3 mb-1'>
        {movie.vote_average ? (
          <div className="scale-75 sm:scale-90 md:scale-100 origin-left flex items-center gap-2">
            {renderRating(movie.vote_average)}
          </div>
        ) : (
          <span className='text-gray-400 text-sm'>No rating available</span>
        )}
      </div>

      <div className='flex items-center gap-2 text-gray-300 text-xs sm:text-sm mb-2 md:mb-4'>
        <HiUserGroup className='text-base md:text-lg'/>
        {movie.vote_count !== undefined ? (
          <span>Rated by {movie.vote_count.toLocaleString()} People</span>
        ) : (
          <span>No ratings yet</span>
        )}
      </div>

      <p className='text-white text-sm md:text-base leading-relaxed hidden md:block'>
        {truncateText(movie.overview || 'No description available', 200)}
      </p>
    </div>
  )
}

export default MovieDescriptionDialog