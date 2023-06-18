import "./MoviesCard.css";

function MoviesCard(props) {
    const {movie} = props;
    return (
        <div className="moviecard">
            <div className="moviecard__info">
                <p className="moviecard__name">{movie.nameRU}</p>
                <p className="moviecard__duration">{movie.duration}</p>
                <div className={`moviecard__like ${movie.like ? "moviecard__like-liked": ""}`}></div>
            </div>
            <img className="moviecard__thumbnail" src={movie.thumbnail} alt={movie.nameRU}/>
        </div>
    )
}

export default MoviesCard;
