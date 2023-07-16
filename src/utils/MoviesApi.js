import {BaseApi} from "./MainApi.js";

class MoviesApi extends BaseApi {
    getMovies() {
        return this._get('/');
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    },
    useToken: false
});
