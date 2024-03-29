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
        if (!savedMoviesFlag) {
            setCurrentPage(currentPage + 1)
        }
        setReloadMovies(true)
    }

    useEffect(() => {
        if (!savedMoviesFlag) {
            setButtonVisible(!savedMoviesFlag && currentPage < maxPage)
        }
    }, [currentPage, maxPage])

    useEffect(() => {
        if (!savedMoviesFlag) {
            setCurrentPage(1)
        } else {
            setReloadMovies(true)
        }
    }, [])

    useEffect(() => {
        if (reloadMovies === false) {
            setNotFoundText(searchQuery === "" ? "" : FILMS_NOT_FOUND)
        }
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
                                key={movie.id}
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
