import {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

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
        setReloadMovies
    } = props;

    const nextPage = function () {
        setCurrentPage(currentPage + 1)
        setReloadMovies(true)
    }

    useEffect(() => {
        setButtonVisible(currentPage < maxPage)
    }, [currentPage, maxPage])

    return (
        <section className="movies">
            {
                visibleMovies.length === 0 ?
                    <div className="movies__zero">
                        Фильмы отсутствуют
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
                                <button className="movies__more" onClick={nextPage}>Еще</button>
                                :
                                <></>
                        }
                    </>
            }
        </section>
    )
}

export default MoviesCardList;
