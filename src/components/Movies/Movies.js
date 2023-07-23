import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
    return (
        <div key={props.savedMoviesFlag}>
            <SearchForm
                loadMovies={props.loadMovies}
                savedMoviesFlag={props.savedMoviesFlag}
                searchFormSearchString={props.searchFormSearchString}
                setSearchFormSearchString={props.setSearchFormSearchString}
                searchFormFilter={props.searchFormFilter}
                setSearchFormFilter={props.setSearchFormFilter}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                setReloadMovies={props.setReloadMovies}
                loadMoviesFromStorage={props.loadMoviesFromStorage}
            />
            <MoviesCardList
                savedMoviesIds={props.savedMoviesIds}
                savedMoviesFlag={props.savedMoviesFlag}
                visibleMovies={props.visibleMovies}
                onMovieLike={props.onMovieLike}
                currentPage={props.currentPage}
                maxPage={props.maxPage}
                setCurrentPage={props.setCurrentPage}
                setReloadMovies={props.setReloadMovies}
                loadMoviesFromStorage={props.loadMoviesFromStorage}
            />
        </div>
    )
}

export default Movies;