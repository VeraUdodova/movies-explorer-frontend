import {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
    const [buttonVisible, setButtonVisible] = useState(false);

    const nextPage = function() {
        props.setCurrentPage(props.currentPage + 1)
    }

    let movies = []

    if (!props.savedMoviesFlag) {
        movies = props.movies.filter(
            movie => movie.nameRU.toLowerCase().includes(props.searchFormSearchString.toLowerCase())
        )
    } else {
        movies = props.savedMovies
    }
    const moviesSliced = movies.length > 0 ? movies.slice(0, props.movieCountPerPage * props.currentPage) : []

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
                            key={movie.id || movie._id}
                            movie={movie}
                            savedMoviesIds={props.savedMoviesIds}
                            savedMoviesFlag={props.savedMoviesFlag}
                            onMovieLike={props.onMovieLike}
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
