import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, 500));

const getTopAnime = async (pageNum = 1) => {
    try {
        await delay(500);
        return axios.get(`${BASE_URL}/top/anime`, {
            params: {
                page: pageNum,
                limit: 20,
                // filter: "bypopularity", // Removed filter as top/anime is already popular
                // order_by: "score", // Top anime endpoint default sort is fine
                // sort: "desc",
                // type: "tv" // Removed type filter to include movies/ovas if present in top
            }
        });
    } catch (error) {
        console.error('Error fetching top anime:', error);
        throw error;
    }
};

const getAnimeByGenre = async (genreId, pageNum = 1) => { // Added pageNum parameter
    try {
        await delay(500);
        return axios.get(`${BASE_URL}/anime`, {
            params: {
                genres: genreId,
                page: pageNum,
                limit: 20,
                // type: 'tv', // Removed type filter unless specifically needed
                order_by: 'score', // Keep sorting by score
                sort: 'desc',
                // min_score: 1 // Removed min_score unless specifically needed
            }
        });
    } catch (error) {
        console.error(`Error fetching anime for genre ${genreId}:`, error);
        throw error;
    }
};

export default {
    getTopAnime,
    getAnimeByGenre
}
