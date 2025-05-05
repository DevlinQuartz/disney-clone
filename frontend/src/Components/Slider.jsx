import React, { useEffect, useState, useRef } from 'react'
import GlobalAPI from '../Services/GlobalAPI'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/'

function Slider() {
    const [movieList, setMovieList]=useState([]);
    const elementRef = useRef(null); 

    useEffect(() => {
        getTrendingMovies();
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
    
    const getTrendingMovies=() => {
        GlobalAPI.getTrendingVideos.then(resp=>{
            console.log(resp.data.results);
            setMovieList(resp.data.results);
        })
    }

    const handleWheel = (event) => {
        event.preventDefault();
        const element = elementRef.current;
        if (element && element.children.length > 0) {
            const slideWidth = element.children[0].offsetWidth;
            const targetScrollLeft = element.scrollLeft + Math.sign(event.deltaY) * slideWidth;

            element.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        const element = elementRef.current;
        if (element && element.children.length > 0) {
            const slideWidth = element.children[0].offsetWidth;
            element.scrollTo({
                left: element.scrollLeft + slideWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollLeft = () => {
        const element = elementRef.current;
        if (element && element.children.length > 0) {
            const slideWidth = element.children[0].offsetWidth;
            element.scrollTo({
                left: element.scrollLeft - slideWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className='relative mt-10'>
            <HiChevronLeft onClick={scrollLeft} className='hidden md:block text-white text-[50px] absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer'/>
            <HiChevronRight onClick={scrollRight} className='hidden md:block text-white text-[50px] absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'/>

            <div ref={elementRef} className='flex overflow-x-auto w-full py-4 scrollbar-hide scroll-smooth snap-x snap-mandatory'>
                {movieList.map((item, index) => (
                    <img key={index} src={IMAGE_BASE_URL+ item.backdrop_path}
                        className='min-w-[97%] md:h-[400px] object-cover px-8 rounded-md snap-center object-[50%_20%] hover:border-[4px] border-white transition-all duration-100 ease-in'/>
                ))}
            </div>
        </div>
  )
}

export default Slider
