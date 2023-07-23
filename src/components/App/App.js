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
    // сохраненные фильмы (лайк)
    const [savedMovies, setSavedMovies] = useState([]);
    // строка поиска
    const [searchFormSearchString, setSearchFormSearchString] = useState("");
    // фильтр Короткометражки
    const [searchFormFilter, setSearchFormFilter] = useState(false);
    // количество фильмов на страницу
    const [movieCountPerPage, setMovieCountPerPage] = useState(CARD_COUNT_PER_PAGE)
    // текущая страница фильмов
    const [currentPage, setCurrentPage] = useState(1);
    // максимальная страница фильмов
    const [maxPage, setMaxPage] = useState(1);
    // текущая страница сохраненных фильмов
    const [currentPageSaved, setCurrentPageSaved] = useState(1);
    // идентификаторы сохраненных фильмов
    const [savedMoviesIds, setSavedMoviesIds] = useState([]);
    const [reloadMovies, setReloadMovies] = useState(false);
    const [visibleMovies, setVisibleMovies] = useState([]);

    // const getSaveMoviesIds = function (data) {
    //     setSavedMoviesIds(data.length > 0 ? data.map(item => item.id) : [])
    // }
    //
    // const getSavedMovies = function () {
    //     mainApi.getSavedMovies().then(data => {
    //         if (data) {
    //             data = data.map(item => {
    //                 item.id = item.movieId
    //                 return item
    //             })
    //         }
    //         setSavedMovies(data)
    //         getSaveMoviesIds(data)
    //
    //         if (movies && data) {
    //             const _data = movies.map(movie => {
    //                 const item1 = data.filter(item0 => item0.id === movie.id)
    //                 movie._id = item1 && item1.length > 0 ? item1[0]._id : undefined
    //                 return movie
    //             })
    //
    //             setMovies(_data)
    //         }
    //
    //     }).catch(err => {
    //         handleApiError()
    //         catchError(err)
    //     })
    // }

    const onMovieLike = function (movie) {
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
                // getSavedMovies()
            }).catch((err) => {
                handleApiError()
                catchError(err)
            })
        } else {
            if (movie._id === undefined) {
                handleApiError()
            } else {
                mainApi.deleteMovie(movie._id).then(obj => {
                    // getSavedMovies()
                }).catch((err) => {
                    handleApiError()
                    catchError(err)
                })
            }
        }
    }

    function closeMessage() {
        setIsMessageOpen(false);
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

    const handleTokenCheck = (redirectToMain = false) => {
        const token = localStorage.getItem(STORAGE_NAME_TOKEN)

        if (token) {
            mainApi.userInfo(token).then((user) => {
                if (user._id) {
                    setLoggedIn(true)
                    setCurrentUser(user)
                    setIsTokenLoaded(true);

                    // getSavedMovies()

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

    function handleLogOut() {
        localStorage.removeItem(STORAGE_NAME_TOKEN)
        localStorage.removeItem(STORAGE_NAME_FILMS)
        setLoggedIn(false)
        setCurrentUser({})
        navigate("/", {replace: true})
    }

    function handleRegistrationFailed(data) {
        setIsMessageSuccess(false)
        setTextMessage(makeErrorMessage(data))
        setIsMessageOpen(true)
    }

    function handleRegistrationSuccess({email, password}) {
        onLogin({email, password})
    }

    const onRegister = ({name, email, password}) => {
        mainApi.signUp({name, email, password}).then((data) => {
            data._id ?
                handleRegistrationSuccess({email, password}) :
                handleRegistrationFailed({"message": "Что-то пошло не так"})
        }).catch((err) => {
            catchError(err).then(data => handleRegistrationFailed(data))
        })
    }

    function handleLoginFailed(data) {
        setIsMessageSuccess(false)
        setTextMessage(makeErrorMessage(data));
        setIsMessageOpen(true);
    }

    const onLogin = ({email, password}) => {
        mainApi.signIn({email, password}).then((data) => {
            data.token ?
                handleLoginSuccess(data) :
                handleLoginFailed({"message": "Что-то пошло не так"})
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
        setTextMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер " +
            "недоступен. Подождите немного и попробуйте ещё раз"
        );
        setIsMessageOpen(true);
    }

    const onLogout = () => {
        handleLogOut();
    }

    useEffect(() => {
        handleTokenCheck(false)
        // eslint-disable-next-line
    }, [])

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
    }

    function loadMovies() {
        const {movies} = loadMoviesFromStorage()

        if (movies.length > 0) {
            setMoviesLoaded(true)
            setReloadMovies(false)

            return
        }

        setIsPreloaderVisible(true)

        moviesApi.getMovies().then((data) => {
            setIsPreloaderVisible(false)
            saveMoviesToStorage(data, searchFormSearchString, searchFormFilter)
            // setMovies(data)
            setMoviesLoaded(true)
            setReloadMovies(false)

        }).catch((err) => {
            setIsPreloaderVisible(false)
            catchError(err)
            handleApiError()
        })
    }

    useEffect(() => {
        setReloadMovies(true)
    }, [searchFormFilter])

    useEffect(() => {
        setReloadMovies(true)
    }, [currentPage])

    useEffect(() => {
        setReloadMovies(true)
    }, [maxPage])

    useEffect(() => {
        setReloadMovies(true)
    }, [moviesLoaded])

    useEffect(() => {
        if (moviesLoaded !== true) {
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

        if (searchFormSearchString) {
            preVisibleMovies = movies.filter(
                movie => movie.nameRU.toLowerCase().includes(searchFormSearchString.toLowerCase())
            );
        }

        if (searchFormFilter === true) {
            preVisibleMovies = preVisibleMovies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION)
        }

        saveMoviesToStorage(movies, searchFormSearchString, searchFormFilter === true)

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
                                onMovieLike={onMovieLike}
                                loadMovies={loadMovies}
                                setCurrentPage={setCurrentPage}
                                setReloadMovies={setReloadMovies}
                                loadMoviesFromStorage={loadMoviesFromStorage}

                                searchFormSearchString={searchFormSearchString}
                                setSearchFormSearchString={setSearchFormSearchString}
                                searchFormFilter={searchFormFilter}
                                setSearchFormFilter={setSearchFormFilter}

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
                                visibleMovies={visibleMovies}
                                savedMoviesIds={savedMoviesIds}
                                currentPage={currentPage}
                                maxPage={maxPage}
                                onMovieLike={onMovieLike}
                                loadMovies={loadMovies}
                                setCurrentPage={setCurrentPage}
                                setReloadMovies={setReloadMovies}
                                loadMoviesFromStorage={loadMoviesFromStorage}

                                searchFormSearchString={searchFormSearchString}
                                setSearchFormSearchString={setSearchFormSearchString}
                                searchFormFilter={searchFormFilter}
                                setSearchFormFilter={setSearchFormFilter}

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
