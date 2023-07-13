import {useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile"
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import "./App.css";
import {movies as static_movies, user as currentUser} from "../../utils/data";

function App() {
    const [movies, setMovies] = useState([])

    const loggedIn = true;

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


    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <Header loggedIn={loggedIn}/>
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
                    <Route path="/signin" element={<Login/>}/>
                    <Route path="/signup" element={<Register/>}/>
                </Routes>
                <Footer loggedIn={loggedIn}/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
