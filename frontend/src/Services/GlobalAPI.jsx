import axios from "axios";

const movieBaseURL = "https://api.themoviedb.org/3/";
const api_key = 'f4287ce921ff17cfac1e778be9ba8f2b';

const getTrendingVideos = axios.get(movieBaseURL + "discover/tv?api_key=" + api_key + "&sort_by=popularity.desc&with_original_language=ja&with_genres=16");
const getMovieByGenreId = (id) => axios.get(movieBaseURL + "discover/movie?api_key=" + api_key + "&sort_by=popularity.desc&with_genres=" + id);
const getMovieVideos = (movieId) => 
    axios.get(movieBaseURL + "movie/" + movieId + "/videos?api_key=" + api_key);
const searchMovies = (query) => 
    axios.get(movieBaseURL + "search/movie?api_key=" + api_key + "&query=" + query);

export default {
    getTrendingVideos,
    getMovieByGenreId,
    getMovieVideos,
    searchMovies
}
