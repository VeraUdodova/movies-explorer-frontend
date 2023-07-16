import { useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import "./MoviesCard.css";

function MoviesCard(props) {
    const currentUser = useContext(CurrentUserContext);
    const {movie, savedMovies} = props;

    const minutes = movie.duration % 60
    const hours = Math.floor(movie.duration / 60)
    const duration = ((hours > 0 ? `${hours}ч ` : "") + (minutes > 0 ? `${minutes}м` : "")).trim()

    // const onMovieLike = function () {
    //     props.onMovieLike(movie);
    // }
    //
    // const onMovieDelete = function () {
    //     props.onMovieDelete(movie);
    // }

    return (
        <div className="moviecard">
            <div className="moviecard__info">
                <div className="moviecard__textinfo">
                    <p className="moviecard__name">{movie.nameRU}</p>
                    <p className="moviecard__duration">{duration}</p>
                </div>
                {/*{savedMovies ?*/}
                {/*    <button*/}
                {/*        onClick={onMovieDelete}*/}
                {/*        className={`moviecard__icon ${movie.ownerId === currentUser._id ? "moviecard__icon-delete" : ""}`}*/}
                {/*    ></button>*/}
                {/*    :*/}
                {/*    <button*/}
                {/*        onClick={onMovieLike}*/}
                {/*        className={`moviecard__icon ${movie.likes.includes(currentUser._id) ? "moviecard__icon-like" : "moviecard__icon-dislike"}`}*/}
                {/*    ></button>*/}
                {/*}*/}
            </div>
            <img className="moviecard__thumbnail" src={`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`} alt={movie.nameRU}/>
        </div>
    )
}

export default MoviesCard;
