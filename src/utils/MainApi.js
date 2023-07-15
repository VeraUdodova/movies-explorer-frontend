export class BaseApi {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _statusCheck(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.json());
    }

    _add_token() {
        this._headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
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
        return this._save('/signin', 'POST', body)
    }

    signUp(body) {
        return this._save('/signup', 'POST', body)
    }

    userInfo(token) {
        return this._get('/users/me', token)
    }

    // getInitialCards() {
    //     return this._get('/cards');
    // }
    //
    // getUserInfo() {
    //     return this._get('/users/me')
    // }
    //
    // editUserInfo(body) {
    //     return this._save('/users/me', 'PATCH', body)
    // }
    //
    // addNewCard(body) {
    //     return this._save('/cards', 'POST', body)
    // }
    //
    // deleteCard(cardId) {
    //     return this._save(`/cards/${cardId}`, 'DELETE')
    // }
    //
    // addLike(cardId) {
    //     return this._save(`/cards/${cardId}/likes`, 'PUT')
    // }
    //
    // deleteLike(cardId) {
    //     return this._save(`/cards/${cardId}/likes`, 'DELETE')
    // }
    //
    // editAvatar(body) {
    //     return this._save('/users/me/avatar', 'PATCH', body)
    // }
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.filmopoisk.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'
    }
});
