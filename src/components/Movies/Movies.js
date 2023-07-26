import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
    return (
        <div key={`movies-div-${props.savedMoviesFlag}`}>
            <SearchForm
                key={`movies-search-form-${props.savedMoviesFlag}`}
                savedMoviesFlag={props.savedMoviesFlag}
                setSearchQuery={props.setSearchQuery}
                setSearchFilter={props.setSearchFilter}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                setReloadMovies={props.setReloadMovies}
                loadMoviesFromStorage={props.loadMoviesFromStorage}
                setTextMessage={props.setTextMessage}
                setIsMessageSuccess={props.setIsMessageSuccess}
                setIsMessageOpen={props.setIsMessageOpen}
            />
            <MoviesCardList
                key={`movies-card-list-${props.savedMoviesFlag}`}
                savedMoviesIds={props.savedMoviesIds}
                savedMoviesFlag={props.savedMoviesFlag}
                visibleMovies={props.visibleMovies}
                onMovieLike={props.onMovieLike}
                currentPage={props.currentPage}
                maxPage={props.maxPage}
                setCurrentPage={props.setCurrentPage}
                setReloadMovies={props.setReloadMovies}
                loadMoviesFromStorage={props.loadMoviesFromStorage}
                searchQuery={props.searchQuery}
                reloadMovies={props.reloadMovies}
            />
        </div>
    )
}

export default Movies;