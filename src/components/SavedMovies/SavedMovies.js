import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
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
                savedMoviesFlag={true}
                savedMovies={props.savedMovies}
                movies={props.movies}
                onMovieLike={props.onMovieLike}
                searchParams={props.searchParams}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                movieCountPerPage={props.movieCountPerPage}
            />
        </>
    )
}

export default SavedMovies;