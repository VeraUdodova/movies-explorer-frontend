import {useState, useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Message from "../Message/Message";
import Profile from "../Profile/Profile"
import Register from "../Register/Register";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {catchError} from "../../utils/utils";
import {mainApi} from "../../utils/MainApi";
import {moviesApi} from "../../utils/MoviesApi";
import "./App.css";
import NotFound from "../NotFound/NotFound";
import {
    CARD_COUNT_PER_PAGE,
    CARD_COUNT_PER_PAGE_MOBILE,
    MOBILE_WIDTH,
    MOVIE_SITE,
    RESIZE_TIMEOUT, SHORT_MOVIE_DURATION, STORAGE_NAME_FILMS, STORAGE_NAME_TOKEN
} from "../../utils/constants"
import {API_ERROR, SOMETHING_WRONG, VALIDATION_ERROR} from "../../utils/texts";

function App() {
    const navigate = useNavigate();

    const [isTokenLoaded, setIsTokenLoaded] = useState(null);

    // окно
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    // текст сообщения
    const [textMessage, setTextMessage] = useState("");
    // успешное сообщение
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);
    // прелоадер
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    // пользователь или гость
    const [loggedIn, setLoggedIn] = useState(false);
    // текущий пользователь
    const [currentUser, setCurrentUser] = useState({})
    // фильмы (поиск)
    const [moviesLoaded, setMoviesLoaded] = useState(false);
    // строка поиска для поиска
    const [searchQuery, setSearchQuery] = useState("");
    // фильтр Короткометражки для поиска
    const [searchFilter, setSearchFilter] = useState(false);
    // количество фильмов на страницу
    const [movieCountPerPage, setMovieCountPerPage] = useState(CARD_COUNT_PER_PAGE)
    // текущая страница фильмов
    const [currentPage, setCurrentPage] = useState(1);
    // максимальная страница фильмов
    const [maxPage, setMaxPage] = useState(1);
    // идентификаторы сохраненных фильмов
    const [savedMoviesIds, setSavedMoviesIds] = useState([]);
    const [savedMoviesIdsRelation, setSavedMoviesIdsRelation] = useState({});
    const [reloadMovies, setReloadMovies] = useState(false);
    const [visibleMovies, setVisibleMovies] = useState([]);
    const [visibleSavedMovies, setVisibleSavedMovies] = useState([]);

    const getSavedMovies = () => {
        if (!loggedIn) {
            return
        }

        mainApi.getSavedMovies().then(data => {
            if (data.length > 0) {
                let movies = {}
                for (const key in data) {
                    movies[data[key].movieId] = data[key]._id
                }

                setSavedMoviesIdsRelation(movies)
                setSavedMoviesIds(data.length > 0 ? data.map(item => item.movieId) : [])
            } else {
                setSavedMoviesIds([])
                setSavedMoviesIdsRelation([])
            }
        }).catch(err => {
            handleApiError()
            catchError(err)
        })
    }

    const onMovieLike = (movie) => {
        const isLiked = savedMoviesIds.includes(movie.id)

        if (!isLiked) {
            const image = `${MOVIE_SITE}${movie.image.url}`
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
                setSavedMoviesIds([...savedMoviesIds, obj.movieId])
            }).catch((err) => {
                handleApiError()
                catchError(err)
            })
        } else {
            const movieId = savedMoviesIdsRelation[movie.id]

            if (movieId === undefined) {
                handleApiError()
                return
            }

            mainApi.deleteMovie(movieId).then(obj => {
                setSavedMoviesIds(savedMoviesIds.filter(item => item !== movie.id))
            }).catch((err) => {
                handleApiError()
                catchError(err)
            })
        }
    }

    const closeMessage = () => {
        setIsMessageOpen(false);
    }

    const makeErrorMessage = (data) => {
        let message;

        if (data.message === "Validation failed") {
            message = `${VALIDATION_ERROR}: ${data.validation.body.keys}`;
        } else {
            message = data.message
        }

        return message
    }

    const handleTokenCheck = (redirectToMain = false) => {
        const token = localStorage.getItem(STORAGE_NAME_TOKEN)

        if (token) {
            mainApi.userInfo(token).then((user) => {
                if (user._id) {
                    setLoggedIn(true)
                    setCurrentUser(user)
                    setIsTokenLoaded(true);
                    getSavedMovies()

                    if (redirectToMain) {
                        navigate("/", {replace: true})
                    }
                } else {
                    setIsTokenLoaded(false);
                    handleLogOut()
                }
            }).catch((err) => {
                setCurrentUser({});
                handleLogOut()
                catchError(err)
            })
        } else {
            setIsTokenLoaded(false);
        }
    }

    const handleLoginSuccess = (data) => {
        const {token} = data;

        localStorage.setItem(STORAGE_NAME_TOKEN, token)
        setLoggedIn(true)
        setCurrentUser(data)
        navigate("/movies", {replace: true})

        handleTokenCheck(false)
    }

    const handleLogOut = () => {
        localStorage.removeItem(STORAGE_NAME_TOKEN)
        localStorage.removeItem(STORAGE_NAME_FILMS)
        setLoggedIn(false)
        setCurrentUser({})
        navigate("/", {replace: true})
    }

    const handleRegistrationFailed = (data) => {
        setIsMessageSuccess(false)
        setTextMessage(makeErrorMessage(data))
        setIsMessageOpen(true)
    }

    const handleRegistrationSuccess = ({email, password}) => {
        onLogin({email, password})
    }

    const onRegister = ({name, email, password}) => {
        mainApi.signUp({name, email, password}).then((data) => {
            data._id ?
                handleRegistrationSuccess({email, password}) :
                handleRegistrationFailed({"message": SOMETHING_WRONG})
        }).catch((err) => {
            catchError(err).then(data => handleRegistrationFailed(data))
        })
    }

    const handleLoginFailed = (data) => {
        setIsMessageSuccess(false)
        setTextMessage(makeErrorMessage(data));
        setIsMessageOpen(true);
    }

    const onLogin = ({email, password}) => {
        mainApi.signIn({email, password}).then((data) => {
            data.token ?
                handleLoginSuccess(data) :
                handleLoginFailed({"message": SOMETHING_WRONG})
        }).catch((err) => {
            catchError(err).then(data => handleLoginFailed(data))
        })
    }

    const onProfileSave = ({name, email}) => {
        mainApi.saveUserInfo({name, email}).then((data) => {
            setCurrentUser(data)

            setIsMessageSuccess(true)
            setTextMessage("Профиль сохранен")
            setIsMessageOpen(true)

        }).catch((err) => {
            catchError(err).then(data => handleLoginFailed(data))
        })
    }

    const handleApiError = () => {
        setIsMessageSuccess(false);
        setTextMessage(API_ERROR);
        setIsMessageOpen(true);
    }

    const onLogout = () => {
        handleLogOut();
    }

    const loadMoviesFromStorage = () => {
        const moviesJson = localStorage.getItem(STORAGE_NAME_FILMS)

        if (moviesJson === null) {
            return {
                movies: [],
                searchFilmName: "",
                searchShortMovie: false
            }
        }

        return JSON.parse(moviesJson)
    }

    const saveMoviesToStorage = (movies, searchFilmName, searchShortMovie) => {
        localStorage.setItem(
            STORAGE_NAME_FILMS,
            JSON.stringify({
                movies: movies || [],
                searchFilmName: searchFilmName || "",
                searchShortMovie: searchShortMovie || false
            }))
        getSavedMovies()
    }

    const loadMovies = () => {
        const {movies} = loadMoviesFromStorage()

        if (movies.length > 0) {
            setMoviesLoaded(true)
            setReloadMovies(false)

            return
        }

        setIsPreloaderVisible(true)

        moviesApi.getMovies().then((data) => {
            setIsPreloaderVisible(false)
            saveMoviesToStorage(data, searchQuery, searchFilter)
            setMoviesLoaded(true)
            setReloadMovies(false)
        }).catch((err) => {
            setIsPreloaderVisible(false)
            catchError(err)
            handleApiError()
        })
    }

    useEffect(() => {
        if (moviesLoaded === false) {
            return
        }

        const {movies} = loadMoviesFromStorage();

        setVisibleSavedMovies(movies.filter(item => savedMoviesIds.includes(item.id)))

    }, [moviesLoaded, savedMoviesIds])

    useEffect(() => {
        handleTokenCheck(false)

        setMovieCountPerPage(
            window.innerWidth <= MOBILE_WIDTH ?
                CARD_COUNT_PER_PAGE_MOBILE :
                CARD_COUNT_PER_PAGE
        )

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setReloadMovies(true)
    }, [searchFilter, currentPage, maxPage, movieCountPerPage])

    useEffect(() => {
        if (moviesLoaded !== true && reloadMovies === true) {
            loadMovies()
            return
        }

        if (!reloadMovies) {
            return;
        }

        const {movies} = loadMoviesFromStorage()

        if (movies.length === 0) {
            return
        }

        let preVisibleMovies = [];

        if (searchQuery) {
            preVisibleMovies = movies.filter(
                movie => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (searchFilter === true) {
            preVisibleMovies = preVisibleMovies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION)
        }

        saveMoviesToStorage(movies, searchQuery, searchFilter === true)

        const visibleMovies = preVisibleMovies.length > 0 ? preVisibleMovies.slice(0, movieCountPerPage * currentPage) : []
        setMaxPage(Math.ceil(preVisibleMovies.length / movieCountPerPage));
        setVisibleMovies(visibleMovies);

        setReloadMovies(false)
    }, [reloadMovies])

    useEffect(() => {
        function updateSize() {
            setTimeout(() => {
                setMovieCountPerPage(
                    window.innerWidth <= MOBILE_WIDTH ?
                        CARD_COUNT_PER_PAGE_MOBILE :
                        CARD_COUNT_PER_PAGE
                )
            }, RESIZE_TIMEOUT)
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    });

    if (isTokenLoaded === null) {
        return (<Preloader/>)
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <Header loggedIn={loggedIn}/>
                <main>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/movies" element={
                            <ProtectedRoute
                                element={Movies}
                                loggedIn={loggedIn}

                                savedMoviesFlag={false}
                                visibleMovies={visibleMovies}
                                savedMoviesIds={savedMoviesIds}
                                currentPage={currentPage}
                                maxPage={maxPage}
                                searchQuery={searchQuery}

                                onMovieLike={onMovieLike}
                                loadMoviesFromStorage={loadMoviesFromStorage}
                                reloadMovies={reloadMovies}

                                setSearchQuery={setSearchQuery}
                                setSearchFilter={setSearchFilter}
                                setCurrentPage={setCurrentPage}
                                setReloadMovies={setReloadMovies}
                                setTextMessage={setTextMessage}
                                setIsMessageSuccess={setIsMessageSuccess}
                                setIsMessageOpen={setIsMessageOpen}
                            />
                        }/>
                        <Route path="/saved-movies" element={
                            <ProtectedRoute
                                element={Movies}
                                loggedIn={loggedIn}

                                savedMoviesFlag={true}
                                visibleMovies={visibleSavedMovies}
                                savedMoviesIds={savedMoviesIds}
                                currentPage={currentPage}
                                maxPage={maxPage}
                                searchQuery=""

                                onMovieLike={onMovieLike}
                                loadMoviesFromStorage={loadMoviesFromStorage}
                                reloadMovies={reloadMovies}

                                setSearchQuery={setSearchQuery}
                                setSearchFilter={setSearchFilter}
                                setCurrentPage={setCurrentPage}
                                setReloadMovies={setReloadMovies}
                                setTextMessage={setTextMessage}
                                setIsMessageSuccess={setIsMessageSuccess}
                                setIsMessageOpen={setIsMessageOpen}

                            />
                        }/>
                        <Route path="/profile" element={
                            <ProtectedRoute
                                element={Profile}
                                loggedIn={loggedIn}
                                onLogout={onLogout}
                                onProfileSave={onProfileSave}
                            />
                        }/>
                        <Route path="/signin" element={
                            <Login
                                onLogin={onLogin}
                            />
                        }/>
                        <Route path="/signup" element={
                            <Register
                                onRegister={onRegister}
                            />
                        }/>
                        <Route path="*" element={
                            <NotFound/>
                        }/>
                    </Routes>
                </main>
                {isPreloaderVisible ? <Preloader/> : ""}
                <Footer loggedIn={loggedIn}/>
                <Message
                    isOpen={isMessageOpen}
                    onClose={closeMessage}
                    message={textMessage}
                    isMessageSuccess={isMessageSuccess}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
