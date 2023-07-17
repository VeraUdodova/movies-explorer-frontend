import "./MoviesCard.css";

function MoviesCard(props) {
    const {movie, savedMoviesIds} = props;

    const minutes = movie.duration % 60
    const hours = Math.floor(movie.duration / 60)
    const duration = ((hours > 0 ? `${hours}ч ` : "") + (minutes > 0 ? `${minutes}м` : "")).trim()

    const onMovieLike = function () {
        props.onMovieLike(movie);
    }

    const openTrailer = function () {
        window.open(movie.trailerLink, '_blank')
    }

    return (
        <div className="moviecard">
            <div className="moviecard__container" onClick={openTrailer}>
                <div className="moviecard__info">
                    <div className="moviecard__textinfo">
                        <p className="moviecard__name">{movie.nameRU}</p>
                        <p className="moviecard__duration">{duration}</p>
                    </div>
                </div>
                <img className="moviecard__thumbnail" src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.nameRU}/>
            </div>
            <button
                onClick={onMovieLike}
                className={
                `moviecard__icon 
                ${
                    savedMoviesIds.includes(movie.id) ? 
                        (
                            props.savedMoviesFlag ? 
                                " moviecard__icon-delete" : 
                                " moviecard__icon-like"
                        ) : 
                        " moviecard__icon-dislike"
                }`
            }
            ></button>
        </div>
    )
}

export default MoviesCard;
