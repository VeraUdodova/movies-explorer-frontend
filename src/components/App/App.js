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

    const cardCountPerPage = 7;  // количество карточек на "страницу"
    const cardCountPerPageMobile = 5;  // количество карточек на "страницу" в мобильной версии

    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [currentUser, setCurrentUser] = useState({})
    const [movies, setMovies] = useState([]);
    const [searchFormSearchString, setSearchFormSearchString] = useState("");
    const [searchFormFilter, setSearchFormFilter] = useState(false);
    const [movieCountPerPage, setMovieCountPerPage] = useState(cardCountPerPage)


    // function changeMovie(changedMovie) {
    //     setMovies(movies.map(movie => movie._id === changedMovie._id ? changedMovie : movie))
    // }

    const onMovieLike = function (movie) {
        const isLiked = movie.likes.some(ownerId => ownerId === currentUser._id)

        if (isLiked) {
            movie.likes = movie.likes.filter(ownerId => ownerId !== currentUser._id);
            // changeMovie(movie)
        } else {
            movie.likes = [currentUser._id];
            // changeMovie(movie)
        }
    }

    // const onMovieDelete = function (movie) {
    //     setMovies(movies.filter(m => m._id !== movie._id))
    // }

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

    function searchMovie(film_name, short_movie) {
        setIsPreloaderVisible(true)
        moviesApi.getMovies().then(function (data) {
            setIsPreloaderVisible(false)
            setMovies(data)
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
                                onMovieLike={onMovieLike}
                                searchMovie={searchMovie}
                                setErrorMessage={setErrorMessage}
                                setIsErrorOpen={setIsErrorOpen}
                                searchFormSearchString={searchFormSearchString}
                                setSearchFormSearchString={setSearchFormSearchString}
                                searchFormFilter={searchFormFilter}
                                setSearchFormFilter={setSearchFormFilter}
                                movieCountPerPage={movieCountPerPage}
                            />
                        }/>
                        <Route path="/saved-movies" element={<SavedMovies/>}/>
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
