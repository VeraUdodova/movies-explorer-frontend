import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies(props) {
    return (
        <>
            <SearchForm/>
            <MoviesCardList
                movies={props.movies}
                savedMovies={true}
                onMovieDelete={props.onMovieDelete}
            />
        </>
    )
}

export default SavedMovies;
