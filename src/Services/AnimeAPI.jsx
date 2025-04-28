import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

// Add delay between requests to comply with rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getTopAnime = async () => {
    try {
        await delay(1000);
        return axios.get(`${BASE_URL}/top/anime`, {
            params: {
                limit: 20,
                filter: "bypopularity",
                order_by: "score",
                sort: "desc",
                sfw: true,
                type: "tv"
            }
        });
    } catch (error) {
        console.error('Error fetching anime:', error);
        throw error;
    }
};

const getAnimeByGenre = async (genreId) => {
    try {
        await delay(1000);
        if (genreId === 'top') {
            return axios.get(`${BASE_URL}/top/anime`, {
                params: {
                    limit: 20,
                    type: 'tv',
                    sfw: true
                }
            });
        }
        return axios.get(`${BASE_URL}/anime`, {
            params: {
                genres: genreId,
                limit: 20,
                type: 'tv',
                sfw: true,
                order_by: 'score',
                sort: 'desc',
                min_score: 1
            }
        });
    } catch (error) {
        console.error('Error fetching anime:', error);
        throw error;
    }
};

export default {
    getTopAnime,
    getAnimeByGenre
}
