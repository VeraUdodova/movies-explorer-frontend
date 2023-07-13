import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies(props) {
    return (
        <>
            <SearchForm/>
            {/*<MoviesCardList*/}
            {/*    movies={props.movies}*/}
            {/*    savedMovies={false}*/}
            {/*    onMovieLike={props.onMovieLike}*/}
            {/*/>*/}
        </>
    )
}

export default Movies;