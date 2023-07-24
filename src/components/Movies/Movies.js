import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
    return (
        <div key={props.savedMoviesFlag}>
            <SearchForm
                savedMoviesFlag={props.savedMoviesFlag}
                searchFormSearchString={props.searchFormSearchString}
                setSearchFormSearchString={props.setSearchFormSearchString}
                searchFormFilter={props.searchFormFilter}
                setSearchFormFilter={props.setSearchFormFilter}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                setReloadMovies={props.setReloadMovies}
                loadMoviesFromStorage={props.loadMoviesFromStorage}
                setTextMessage={props.setTextMessage}
                setIsMessageSuccess={props.setIsMessageSuccess}
                setIsMessageOpen={props.setIsMessageOpen}
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
                searchFormSearchString={props.searchFormSearchString}
                reloadMovies={props.reloadMovies}
            />
        </div>
    )
}

export default Movies;