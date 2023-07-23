import {useEffect, useState} from "react";
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
        searchFormFilter,
        savedMoviesFlag
    } = props;

    const [value, setValue] = useState("")

    useEffect(() => {
        if (!savedMoviesFlag) {
            const {searchFilmName, searchShortMovie} = loadMoviesFromStorage()

            setFormValues({
                film_name: searchFilmName,
                short_movie: searchShortMovie === true
            })
            setSearchFormFilter(searchShortMovie === true)
            setValue(searchFilmName)
        } else {
            setFormValues({
                film_name: "",
                short_movie: false
            })
            setValue("")
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!savedMoviesFlag) {
            setReloadMovies(true)
            setCurrentPage(1)
        }
    }
    const handleChangeInput = (e) => {
        setValue(e.target.value)
        setFormValues({...formValues, film_name: value})

        handleChange(e)
    }

    const handleChangeFilter = (e) => {
        handleChange(e)
        if (!savedMoviesFlag) {
            setSearchFormFilter(formValues.short_movie === true)
        }
    }

    useEffect(() => {
        if (!savedMoviesFlag) {
            setSearchFormSearchString(formValues.film_name)
        }
    }, [formValues.film_name, props])

    useEffect(() => {
        if (!savedMoviesFlag) {
            setSearchFormFilter(formValues.short_movie)
        }
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
                    value={value}
                    autoComplete="off"
                    onChange={handleChangeInput}
                    placeholder="Фильм"
                />
                <button type="submit" className="searchform__button"></button>
            </div>
            <div className="searchform__block searchform__block-filter">
                <span className="searchform__line"></span>
                <FilterCheckbox
                    title="Короткометражки"
                    handleChange={handleChangeFilter}
                    name="short_movie"
                    searchFormFilter={searchFormFilter}/>
            </div>
        </form>
    )
}

export default SearchForm;
