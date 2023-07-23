import {useEffect} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import {useFormWithValidation} from "../FormValidator/FormValidator";
import "./SearchForm.css";

function SearchForm(props) {
    const {handleChange, formValues, formErrors, setFormValues} = useFormWithValidation();
    const {
        setCurrentPage,
        setSearchFormSearchString,
        setSearchFormFilter,
        setReloadMovies,
        loadMoviesFromStorage,
        searchFormFilter
    } = props;

    useEffect(() => {
        const {searchFilmName, searchShortMovie} = loadMoviesFromStorage()

        setFormValues({
            film_name: searchFilmName,
            short_movie: searchShortMovie === true
        })
        setSearchFormFilter(searchShortMovie === true)
        // eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setReloadMovies(true)
        setCurrentPage(1)
    }

    const handleChangeFilter = (e) => {
        handleChange(e)
        setSearchFormFilter(formValues.short_movie === true)
    }

    useEffect(() => {
        setSearchFormSearchString(formValues.film_name)
    }, [formValues.film_name, props])

    useEffect(() => {
        setSearchFormFilter(formValues.short_movie)
    }, [formValues.short_movie, props])

    return (
        <form className="searchform" onSubmit={handleSubmit}>
            <div className="searchform__block">
                <div className="searchform__icon"></div>
                <input
                    id="film_name"
                    name="film_name"
                    type="text"
                    className={`searchform__input ${formErrors.name ? "searchform__input-error" : ""}`}
                    value={formValues.film_name}
                    autoComplete="off"
                    onChange={handleChange}
                    placeholder="Фильм"
                />
                <button type="submit" className="searchform__button"></button>
            </div>
            <div className="searchform__block searchform__block-filter">
                <span className="searchform__line"></span>
                <FilterCheckbox
                    title="Короткометражки"
                    handleChange={handleChangeFilter}
                    searchFormFilter={searchFormFilter}/>
            </div>
        </form>
    )
}

export default SearchForm;
