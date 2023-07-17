import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
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
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
            />
            <MoviesCardList
                savedMoviesIds={props.savedMoviesIds}
                savedMoviesFlag={false}
                savedMovies={props.savedMovies}
                movies={props.movies}
                onMovieLike={props.onMovieLike}
                searchParams={props.searchParams}
                searchFormSearchString={props.searchFormSearchString}
                searchFormFilter={props.searchFormFilter}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                movieCountPerPage={props.movieCountPerPage}
            />
        </>
    )
}

export default Movies;