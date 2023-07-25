import {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import {FILMS_NOT_FOUND, MORE} from "../../utils/texts";

function MoviesCardList(props) {
    const [buttonVisible, setButtonVisible] = useState(false);
    const [notFoundText, setNotFoundText] = useState("");

    const {
        setCurrentPage,
        currentPage,
        visibleMovies,
        savedMoviesIds,
        savedMoviesFlag,
        onMovieLike,
        maxPage,
        setReloadMovies,
        searchQuery,
        reloadMovies
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

    useEffect(() => {
        setNotFoundText(searchQuery === "" ? "" : FILMS_NOT_FOUND)
    }, [reloadMovies])

    return (
        <section className="movies">
            {
                visibleMovies.length === 0 ?
                    <div className="movies__zero">{notFoundText}</div>
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
