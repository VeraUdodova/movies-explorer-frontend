import {useContext} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import "./MoviesCardList.css";

function MoviesCardList(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <section className="movies">
            {
                props.movies ?
                    props.movies.map(movie => !props.savedMovies || (props.savedMovies && movie.ownerId === currentUser._id) ? (
                        <MoviesCard
                            key={movie._id}
                            movie={movie}
                            ownerId={currentUser.ownerId}
                            savedMovies={props.savedMovies}
                            onMovieLike={props.onMovieLike}
                            onMovieDelete={props.onMovieDelete}
                        />
                    ) : "")
                    :
                    <div className="movies__zero">
                        Фильмы отсутствуют
                    </div>
            }
            <button className="movies__more">Еще</button>
        </section>
    )
}

export default MoviesCardList;
