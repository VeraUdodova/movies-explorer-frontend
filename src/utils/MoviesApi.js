import {BaseApi} from "./MainApi.js";
import {MOVIE_API} from "./constants";

class MoviesApi extends BaseApi {
    getMovies() {
        return this._get("/");
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: MOVIE_API,
    headers: {
        "Content-Type": "application/json"
    },
    useToken: false
});
