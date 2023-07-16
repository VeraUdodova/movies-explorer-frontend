import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {useState} from "react";

function Movies(props) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <SearchForm
                searchMovie={props.searchMovie}
                setErrorMessage={props.setErrorMessage}
                setIsErrorOpen={props.setIsErrorOpen}
                searchFormSearchString={props.searchFormSearchString}
                setSearchFormSearchString={props.setSearchFormSearchString}
                searchFormFilter={props.searchFormFilter}
                setSearchFormFilter={props.setSearchFormFilter}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <MoviesCardList
                savedMovies={false}
                movies={props.movies}
                onMovieLike={props.onMovieLike}
                searchParams={props.searchParams}
                searchFormSearchString={props.searchFormSearchString}
                searchFormFilter={props.searchFormFilter}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                movieCountPerPage={props.movieCountPerPage}
            />
        </>
    )
}

export default Movies;