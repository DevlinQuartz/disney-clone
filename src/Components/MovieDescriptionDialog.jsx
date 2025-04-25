import React from 'react'
import { HiStar, HiOutlineStar } from 'react-icons/hi2'
import { HiUserGroup } from 'react-icons/hi'

function MovieDescriptionDialog({movie}) {
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '.....'
    }
    return text
  }

  const renderStars = (rating) => {
    const starRating = rating / 2;
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
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
    );
  };

  return (
    <div className='p-4 bg-[#1A1A1A]/30 backdrop-blur-md rounded-lg w-[300px] md:w-[500px] h-[200px] md:h-[340px] border-[1px] border-white transition-all duration-300 ease-in-out z-[999] mx-5 md:mx-10 overflow-visible shadow-xl'>
      <h2 className='text-white text-2xl md:text-3xl font-bold mb-2'>{movie.title || movie.name}</h2>
      <div className='flex items-center gap-3 mb-1'>
        {renderStars(movie.vote_average)}
        <span className='text-yellow-400 font-semibold'>{(movie.vote_average/2).toFixed(2)}</span>
      </div>
      <div className='flex items-center gap-2 text-gray-300 text-sm mb-4'>
        <HiUserGroup className='text-lg'/>
        <span>Rated by {movie.vote_count.toLocaleString()} People</span>
      </div>
      <p className='text-white text-sm md:text-base leading-relaxed'>
        {truncateText(movie.overview, 200)}
      </p>
    </div>
  )
}

export default MovieDescriptionDialog