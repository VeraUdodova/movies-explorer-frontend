import {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import {FILMS_NOT_FOUND, MORE} from "../../utils/texts";

function MoviesCardList(props) {
    const [buttonVisible, setButtonVisible] = useState(false);

    const {
        setCurrentPage,
        currentPage,
        visibleMovies,
        savedMoviesIds,
        savedMoviesFlag,
        onMovieLike,
        maxPage,
        setReloadMovies,
        moviesLoaded
    } = props;

    const nextPage = function () {
        setCurrentPage(currentPage + 1)
        setReloadMovies(true)
    }

    useEffect(() => {
        setButtonVisible(!savedMoviesFlag && currentPage < maxPage)
    }, [currentPage, maxPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [])

    return (
        <section className="movies">
            {
                visibleMovies.length === 0 && moviesLoaded === true ?
                    <div className="movies__zero">
                        {FILMS_NOT_FOUND}
                    </div>
                    :
                    <>
                        {visibleMovies.map(movie => (
                            <MoviesCard
                                key={movie.id || movie._id}
                                movie={movie}
                                savedMoviesIds={savedMoviesIds}
                                savedMoviesFlag={savedMoviesFlag}
                                onMovieLike={onMovieLike}
                            />))}
                        {
                            buttonVisible ?
                                <button className="movies__more" onClick={nextPage}>{MORE}</button>
                                :
                                <></>
                        }
                    </>
            }
        </section>
    )
}

export default MoviesCardList;
