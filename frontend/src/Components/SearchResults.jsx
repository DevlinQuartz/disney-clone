import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GlobalAPI from '../Services/GlobalAPI'
import MovieCard from './MovieCard'

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      GlobalAPI.searchMovies(query)
        .then(resp => {
          setResults(resp.data.results);
        })
        .catch(err => console.error(err));
    }
  }, [query]);

  return (
    <div className="p-8">
      <h2 className="text-2xl text-white font-bold mb-6">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
        {results.map((movie) => (
          <div key={movie.id} className="flex justify-center">
            <MovieCard movie={movie} isSearchResult={true} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
