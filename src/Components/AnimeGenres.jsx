import React, { useState } from 'react'

// Add video imports
import topratedVideo from '../assets/Videos/toprated.mp4'
import fantasyVideo from '../assets/Videos/fantasy.mp4'
import sliceoflifeVideo from '../assets/Videos/sliceoflife.mp4'
import comedyVideo from '../assets/Videos/comedy.mp4'
import romanceVideo from '../assets/Videos/romance.mp4'

function AnimeGenres({ onGenreSelect, selectedGenre }) {
    const [hoveredGenre, setHoveredGenre] = useState(null);
    
    const animeGenresList = [
        {
            id: 'top',
            name: "Top Rated",
            video: topratedVideo
        },
        {
            id: 10,
            name: "Fantasy",
            video: fantasyVideo
        },
        {
            id: 36,
            name: "Slice of Life",
            video: sliceoflifeVideo
        },
        {
            id: 4,
            name: "Comedy",
            video: comedyVideo
        },
        {
            id: 22,
            name: "Romance",
            video: romanceVideo
        }
    ]

    return (
        <div className='flex gap-2 md:gap-5 p-2 px-3 md:px-13'>
            {animeGenresList.map((genre) => (
                <div key={genre.id} 
                     onClick={() => onGenreSelect(genre.id)}
                     onMouseEnter={() => setHoveredGenre(genre.id)}
                     onMouseLeave={() => setHoveredGenre(null)}
                     className={`relative border-[2px] ${
                        selectedGenre === genre.id 
                            ? 'border-white border-[2px] shadow-[0_0_15px_rgba(255,255,255,0.7)]' 
                            : 'border-gray-600'
                     } rounded-lg hover:scale-110 transition-all duration-300 ease-in-out 
                     cursor-pointer hover:border-white hover:border-[3px] 
                     flex items-center justify-center overflow-hidden
                     w-[200px] h-[100px] md:w-[250px] md:h-[150px]
                     bg-[#1A1A1A]/50`}>
                    {genre.video && (
                        <video
                            src={genre.video}
                            className={`absolute top-0 left-0 w-full h-full object-cover 
                                      transition-opacity duration-300
                                      ${(selectedGenre === genre.id || hoveredGenre === genre.id) ? 'opacity-50' : 'opacity-0'}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    )}
                    <h2 className='text-white font-bold text-lg md:text-xl relative z-10'>
                        {genre.name}
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default AnimeGenres
