import { useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import "./MoviesCard.css";

function MoviesCard(props) {
    const currentUser = useContext(CurrentUserContext);
    const {movie, savedMovies} = props;

    const onMovieLike = function () {
        props.onMovieLike(movie);
    }

    const onMovieDelete = function () {
        props.onMovieDelete(movie);
    }

    return (
        <div className="moviecard">
            <div className="moviecard__info">
                <p className="moviecard__name">{movie.nameRU}</p>
                <p className="moviecard__duration">{movie.duration}</p>
                {savedMovies ?
                    <button
                        onClick={onMovieDelete}
                        className={`moviecard__icon ${movie.ownerId === currentUser._id ? "moviecard__icon-delete" : ""}`}
                    ></button>
                    :
                    <button
                        onClick={onMovieLike}
                        className={`moviecard__icon ${movie.likes.includes(currentUser._id) ? "moviecard__icon-like" : "moviecard__icon-dislike"}`}
                    ></button>
                }
            </div>
            <img className="moviecard__thumbnail" src={movie.thumbnail} alt={movie.nameRU}/>
        </div>
    )
}

export default MoviesCard;
