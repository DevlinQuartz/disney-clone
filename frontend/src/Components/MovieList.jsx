import React, { useEffect, useState, useRef } from 'react'
import GlobalAPI from '../Services/GlobalAPI'
import MovieCard from './MovieCard'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

function MovieList({genreId}) {
    const [movieList, setMovieList]=useState([]);
    const elementRef = useRef(null);

    useEffect(()=>{
        getMovieByGenreId();
        const element = elementRef.current;
        if (element) {
            element.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (element) {
                element.removeEventListener('wheel', handleWheel);
            }
        };
    },[])

    const handleWheel = (event) => {
        event.preventDefault();
        const element = elementRef.current;
        if (element) {
            const slideWidth = 400; // width of one movie card
            element.scrollTo({
                left: element.scrollLeft + Math.sign(event.deltaY) * slideWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollLeft = () => {
        const element = elementRef.current;
        if (element) {
            const slideWidth = 400;
            element.scrollTo({
                left: element.scrollLeft - slideWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        const element = elementRef.current;
        if (element) {
            const slideWidth = 400;
            element.scrollTo({
                left: element.scrollLeft + slideWidth,
                behavior: 'smooth'
            });
        }
    };

    const getMovieByGenreId=()=>{ 
        GlobalAPI.getMovieByGenreId(genreId).then(resp=>{
            // console.log(resp.data.results);
            setMovieList(resp.data.results);
        })
    }
    return (
        <div className='relative'>
            <HiChevronLeft onClick={scrollLeft} 
                className='hidden md:block text-white text-[50px] absolute left-2 top-[50%] transform -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-150 ease-in z-[10001]'/>
            <HiChevronRight onClick={scrollRight} 
                className='hidden md:block text-white text-[50px] absolute right-2 top-[50%] transform -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-150 ease-in z-[10001]'/>
            
            <div ref={elementRef} className='flex overflow-x-auto gap-8 scrollbar-hide pt-5 px-3 pb-5 scroll-smooth'>
                {movieList.map((item,index) => (
                    <MovieCard 
                        key={index} 
                        movie={item} 
                        isSearchResult={false}
                    />
                ))}
            </div>
        </div>
    )
}

export default MovieList