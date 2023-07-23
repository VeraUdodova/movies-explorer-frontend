import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
    return (
        <>
            <SearchForm
                loadMovies={props.loadMovies}
                searchFormSearchString={props.searchFormSearchString}
                setSearchFormSearchString={props.setSearchFormSearchString}
                searchFormFilter={props.searchFormFilter}
                setSearchFormFilter={props.setSearchFormFilter}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                setReloadMovies={props.setReloadMovies}
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
            />
        </>
    )
}

export default Movies;