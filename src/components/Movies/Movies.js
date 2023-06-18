import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
    const movies = [
        {
            nameRU: "33 слова о дизайне",
            duration: "1ч 42м",
            like: true,
            thumbnail: "./film1.png"
        },
        {
            nameRU: "Киноальманах «100 лет дизайна»",
            duration: "1ч 25м",
            like: true,
            thumbnail: "./film2.png"
        },
        {
            nameRU: "В погоне за Бенкси",
            duration: "2ч 1м",
            like: false,
            thumbnail: "./film3.png"
        },
        {
            nameRU: "Бег это свобода",
            duration: "1ч 52м",
            like: false,
            thumbnail: "./film4.png"
        }
    ]

    return (
        <>
            <SearchForm/>
            <MoviesCardList movies={movies}/>
        </>
    )
}

export default Movies;