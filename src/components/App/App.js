import {useState, useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Error from "../Error/Error";
import Profile from "../Profile/Profile"
import Register from "../Register/Register";
import Preloader from "../Preloader/Preloader";
import SavedMovies from "../SavedMovies/SavedMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {catchError} from "../../utils/utils";
import {mainApi} from "../../utils/MainApi";
import {moviesApi} from "../../utils/MoviesApi";
import "./App.css";

function App() {
    const navigate = useNavigate();

    // количество карточек на "страницу"
    const cardCountPerPage = 7;
    // количество карточек на "страницу" в мобильной версии
    const cardCountPerPageMobile = 5;

    // окно с ошибкой
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    // прелоадер
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    // текст ошибки
    const [errorMessage, setErrorMessage] = useState("");
    // пользователь или гость
    const [loggedIn, setLoggedIn] = useState(false);
    // электронная почта пользователя
    const [email, setEmail] = useState("");
    // имя пользователя
    const [name, setName] = useState("");
    // текущий пользователь
    const [currentUser, setCurrentUser] = useState({})
    // фильмы (поиск)
    const [movies, setMovies] = useState([]);
    // сохраненные фильмы (лайк)
    const [savedMovies, setSavedMovies] = useState([]);
    // строка поиска
    const [searchFormSearchString, setSearchFormSearchString] = useState("");
    // фильтр Короткометражки
    const [searchFormFilter, setSearchFormFilter] = useState(false);
    // количество фильмов на страницу
    const [movieCountPerPage, setMovieCountPerPage] = useState(cardCountPerPage)
    // текущая страница фильмов
    const [currentPage, setCurrentPage] = useState(1);
    // текущая страница сохраненных фильмов
    const [currentPageSaved, setCurrentPageSaved] = useState(1);
    // идентификаторы сохраненных фильмов
    const [savedMoviesIds, setSavedMoviesIds] = useState([]);

    const getSaveMoviesIds = function (data) {
        setSavedMoviesIds(data.length > 0 ? data.map(item => item.id) : [])
    }

    const getSavedMovies = function () {
        mainApi.getSavedMovies().then(data => {
            if (data) {
                data = data.map(item => {
                    item.id = item.movieId
                    return item
                })
            }
            setSavedMovies(data)
            getSaveMoviesIds(data)

            if (movies && data) {
                const _data = movies.map(movie => {
                    const item1 = data.filter(item0 => item0.id === movie.id)
                    movie._id = item1 && item1.length > 0 ? item1[0]._id : undefined
                    return movie
                })

                setMovies(_data)
            }

        }).catch(err => {
            handleApiError()
            catchError(err)
        })
    }

    const onMovieLike = function (movie) {
        const isLiked = savedMoviesIds.includes(movie.id)

        if (!isLiked) {
            const image = `https://api.nomoreparties.co${movie.image.url}`
            const body = {
                country: movie.country,
                description: movie.description,
                duration: movie.duration,
                director: movie.director,
                movieId: movie.id,
                image: image,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                year: movie.year,
                trailerLink: movie.trailerLink,
                thumbnail: image
            }

            mainApi.saveMovie(body).then(obj => {
                getSavedMovies()
            }).catch((err) => {
                handleApiError()
                catchError(err)
            })
        } else {
            if (movie._id === undefined) {
                handleApiError()
            } else {
                mainApi.deleteMovie(movie._id).then(obj => {
                    getSavedMovies()
                }).catch((err) => {
                    handleApiError()
                    catchError(err)
                })
            }
        }
    }

    function closeError() {
        setIsErrorOpen(false);
    }

    function makeErrorMessage(data) {
        let message;

        if (data.message === "Validation failed") {
            message = `Ошибка валидации: ${data.validation.body.keys}`;
        } else {
            message = data.message
        }

        return message
    }

    const handleTokenCheck = () => {
        const token = localStorage.getItem("token")

        if (token) {
            mainApi.userInfo(token).then((user) => {
                if (user._id) {
                    setEmail(user.email)
                    setCurrentUser(user)
                    setLoggedIn(true)

                    getSavedMovies()

                    navigate("/", {replace: true})
                } else {
                    handleLogOut()
                }
            }).catch((err) => {
                setCurrentUser({});
                handleLogOut()
                catchError(err)
            })
        }
    }

    const handleLoginSuccess = (data) => {
        const {token, name, email} = data;

        localStorage.setItem("token", token)
        setLoggedIn(true)
        setCurrentUser(data)
        setEmail(email)
        setName(name)
        navigate("/movies", {replace: true})

        handleTokenCheck()
    }

    function handleLogOut() {
        localStorage.removeItem("token")
        setLoggedIn(false)
        setEmail("")
        setName("")
        setCurrentUser({})
        navigate("/", {replace: true})
    }

    function handleRegistrationFailed(data) {
        setErrorMessage(makeErrorMessage(data))
        setIsErrorOpen(true)
    }

    function handleRegistrationSuccess(email, password) {
        onLogin(email, password)
    }

    const onRegister = (name, email, password) => {
        mainApi.signUp({name: name, email: email, password: password}).then((data) => {
            data._id ?
                handleRegistrationSuccess(email, password) :
                handleRegistrationFailed({"message": "Что-то пошло не так"})
        }).catch((err) => {
            catchError(err).then(data => handleRegistrationFailed(data))
        })
    }

    function handleLoginFailed(data) {
        setErrorMessage(makeErrorMessage(data));
        setIsErrorOpen(true);
    }

    const onLogin = (email, password) => {
        mainApi.signIn({email: email, password: password}).then((data) => {
            data.token ?
                handleLoginSuccess(data) :
                handleLoginFailed({"message": "Что-то пошло не так"})
        }).catch((err) => {
            catchError(err).then(data => handleLoginFailed(data))
        })
    }

    const handleApiError = () => {
        setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер " +
            "недоступен. Подождите немного и попробуйте ещё раз"
        );
        setIsErrorOpen(true);
    }

    const onLogout = () => {
        handleLogOut();
    }

    useEffect(() => {
        handleTokenCheck();
    }, [])  // eslint-disable-next-line

    function searchMovie() {
        setIsPreloaderVisible(true)

        moviesApi.getMovies().then((data) =>{
            setIsPreloaderVisible(false)
            setMovies(data)
            getSavedMovies()
        }).catch((err) => {
            setIsPreloaderVisible(false)
            catchError(err)
            handleApiError()
        })
    }

    useEffect(() => {
        function updateSize() {
            setTimeout(() => {
                setMovieCountPerPage(window.innerWidth <= 600 ? cardCountPerPageMobile : cardCountPerPage)
            }, 5000)
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    });

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <Header loggedIn={loggedIn}/>
                <main>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/movies" element={
                            <Movies
                                movies={movies}
                                savedMovies={savedMovies}
                                savedMoviesIds={savedMoviesIds}
                                onMovieLike={onMovieLike}
                                searchMovie={searchMovie}
                                setErrorMessage={setErrorMessage}
                                setIsErrorOpen={setIsErrorOpen}
                                searchFormSearchString={searchFormSearchString}
                                setSearchFormSearchString={setSearchFormSearchString}
                                searchFormFilter={searchFormFilter}
                                setSearchFormFilter={setSearchFormFilter}
                                movieCountPerPage={movieCountPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        }/>
                        <Route path="/saved-movies" element={
                            <SavedMovies
                                movies={movies}
                                savedMovies={savedMovies}
                                savedMoviesIds={savedMoviesIds}
                                onMovieLike={onMovieLike}
                                searchMovie={searchMovie}
                                setErrorMessage={setErrorMessage}
                                setIsErrorOpen={setIsErrorOpen}
                                searchFormSearchString={searchFormSearchString}
                                setSearchFormSearchString={setSearchFormSearchString}
                                searchFormFilter={searchFormFilter}
                                setSearchFormFilter={setSearchFormFilter}
                                movieCountPerPage={movieCountPerPage}
                                currentPage={currentPageSaved}
                                setCurrentPage={setCurrentPageSaved}
                            />
                        }/>
                        <Route path="/profile" element={
                            <Profile
                                onLogout={onLogout}
                                email={email}
                                setEmail={setEmail}
                                name={name}
                                setName={setName}
                            />
                        }/>
                        <Route path="/signin" element={<Login onLogin={onLogin}/>}/>
                        <Route path="/signup" element={<Register onRegister={onRegister}/>}/>
                    </Routes>
                </main>
                {isPreloaderVisible ? <Preloader/> : ""}
                <Footer loggedIn={loggedIn}/>
                <Error
                    isOpen={isErrorOpen}
                    onClose={closeError}
                    message={errorMessage}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
