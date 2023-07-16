import {useContext, useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import "./MoviesCardList.css";

function MoviesCardList(props) {
    const currentUser = useContext(CurrentUserContext)

    const [buttonVisible, setButtonVisible] = useState(false);


    const nextPage = function() {
        props.setCurrentPage(props.currentPage + 1)
    }

    const movies = props.movies.filter(
        movie => movie.nameRU.toLowerCase().includes(props.searchFormSearchString.toLowerCase())
    )
    const moviesSliced = movies.slice(0, props.movieCountPerPage * props.currentPage)

    useEffect(() => {
        setButtonVisible(movies.length > props.currentPage * props.movieCountPerPage)
    }, [props.currentPage, movies.length, props.movieCountPerPage])

    return (
        <section className="movies">
            {
                moviesSliced.length > 0 ?
                    <>
                        {moviesSliced.map(movie => (
                        <MoviesCard
                            key={movie.id}
                            movie={movie}
                            ownerId={currentUser._id}
                            // savedMovies={props.savedMovies}
                            onMovieLike={props.onMovieLike}
                            // onMovieDelete={props.onMovieDelete}
                        />))}
                        {
                            buttonVisible ?
                                <button className="movies__more" onClick={nextPage}>Еще</button>
                                :
                                <></>
                        }
                    </>
                    :
                    <div className="movies__zero">
                        Фильмы отсутствуют
                    </div>
            }
        </section>
    )
}

export default MoviesCardList;
