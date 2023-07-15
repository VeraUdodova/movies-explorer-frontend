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
import SavedMovies from "../SavedMovies/SavedMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import "./App.css";
import {movies as static_movies, user as currentUser} from "../../utils/data";
import {catchError} from "../../utils/utils";
import {mainApi} from "../../utils/MainApi";

function App() {
    const [movies, setMovies] = useState([]);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [currentUser, setCurrentUser] = useState({})

    const navigate = useNavigate();

    function changeMovie(changedMovie) {
        setMovies(movies.map(movie => movie._id === changedMovie._id ? changedMovie : movie))
    }

    const onMovieLike = function (movie) {
        const isLiked = movie.likes.some(ownerId => ownerId === currentUser._id)

        if (isLiked) {
            movie.likes = movie.likes.filter(ownerId => ownerId !== currentUser._id);
            changeMovie(movie)
        } else {
            movie.likes = [currentUser._id];
            changeMovie(movie)
        }

    }

    const onMovieDelete = function (movie) {
        setMovies(movies.filter(m => m._id !== movie._id))
    }

    useEffect(() => {
        setMovies(static_movies);
    }, [])

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
    }

    function handleLogOut() {
        localStorage.removeItem("token")
        setLoggedIn(false)
        setEmail("")
        setName("")
        navigate("/signin", {replace: true})
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
            data.name ?
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

    useEffect(() => {
        handleTokenCheck();
    }, [])

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
                            />
                        }/>
                        <Route path="/saved-movies" element={
                            <SavedMovies
                                movies={movies}
                                onMovieDelete={onMovieDelete}
                            />
                        }/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/signin" element={<Login onLogin={onLogin}/>}/>
                        <Route path="/signup" element={<Register onRegister={onRegister}/>}/>
                    </Routes>
                </main>
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
