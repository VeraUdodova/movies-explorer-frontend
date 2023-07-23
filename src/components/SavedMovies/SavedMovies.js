import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
    return (
        <>
            <SearchForm
                searchMovie={props.searchMovie}
                setSearchFormSearchString={props.setSearchFormSearchString}
                setSearchFormFilter={props.setSearchFormFilter}
                setCurrentPage={props.setCurrentPage}
                setSearchSubmit={props.setSearchSubmit}
            />
            <MoviesCardList
                savedMoviesIds={props.savedMoviesIds}
                savedMoviesFlag={props.savedMoviesFlag}
                savedMovies={props.savedMovies}
                movies={props.movies}
                onMovieLike={props.onMovieLike}
                searchParams={props.searchParams}
                searchFormSearchString={props.searchFormSearchString}
                searchFormFilter={props.searchFormFilter}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                movieCountPerPage={props.movieCountPerPage}
                setSearchSubmit={props.setSearchSubmit}
            />
        </>
    )
}

export default SavedMovies;