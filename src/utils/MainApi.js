import {FILMOPOISK_API, TOKEN_NAME} from "./constants";

export class BaseApi {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
        this._useToken = options.useToken
    }

    _statusCheck(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.json());
    }

    _add_token() {
        if (this._useToken) {
            this._headers["Authorization"] = `Bearer ${localStorage.getItem(TOKEN_NAME)}`;
        }
    }

    _get(link) {
        this._add_token();

        return fetch(`${this._baseUrl}${link}`, {
            headers: this._headers,
        })
            .then(this._statusCheck)
    }

    _save(link, method, body = []) {
        this._add_token();

        return fetch(`${this._baseUrl}${link}`, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this._statusCheck)
    }
}

class MainApi extends BaseApi {
    signIn(body) {
        return this._save("/signin", "POST", body)
    }

    signUp(body) {
        return this._save("/signup", "POST", body)
    }

    userInfo(token) {
        return this._get("/users/me", token)
    }

    saveUserInfo(body) {
        return this._save("/users/me", "PATCH", body)
    }

    saveMovie(body) {
        return this._save("/movies", "POST", body)
    }

    deleteMovie(movieId) {
        return this._save(`/movies/${movieId}`, "DELETE")
    }

    getSavedMovies() {
        return this._get("/movies")
    }
}

export const mainApi = new MainApi({
    baseUrl: FILMOPOISK_API,
    headers: {
        "Content-Type": "application/json"
    },
    useToken: true
});
