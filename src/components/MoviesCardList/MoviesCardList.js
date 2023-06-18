import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
    return (
        <section className="movies">
            {props.movies.map((movie, i) => (
                <MoviesCard key={i} movie={movie}/>
            ))}
        </section>
    )
}

export default MoviesCardList;
