import React from 'react'

function AnimeGenres() {
    const animeGenresList = [
        {
            id: 10,
            name: "Fantasy"
        },
        {
            id: 36,
            name: "Slice of Life"
        },
        {
            id: 4,
            name: "Comedy"
        },
        {
            id: 22,
            name: "Romance"
        },
        {
            id: 1,
            name: "Action"
        }
    ]

    return (
        <div className='flex gap-2 md:gap-5 p-2 px-3 md:px-13'>
            {animeGenresList.map((genre) => (
                <div key={genre.id} 
                     className='relative border-[2px] border-gray-600 rounded-lg 
                              hover:scale-110 transition-all duration-300 ease-in-out 
                              cursor-pointer hover:border-white hover:border-[5px] 
                              flex items-center justify-center
                              w-[200px] h-[100px] md:w-[250px] md:h-[150px]
                              bg-[#1A1A1A]/50'>
                    <h2 className='text-white font-bold text-lg md:text-xl'>
                        {genre.name}
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default AnimeGenres
