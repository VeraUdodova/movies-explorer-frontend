import {useEffect, useState} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import {useFormWithValidation} from "../FormValidator/FormValidator";
import "./SearchForm.css";

function SearchForm(props) {
    const {handleChange, formValues, formErrors, setFormValues} = useFormWithValidation();
    const {
        setCurrentPage,
        setSearchQuery,
        setSearchFilter,
        setReloadMovies,
        loadMoviesFromStorage,
        savedMoviesFlag,
        setTextMessage,
        setIsMessageSuccess,
        setIsMessageOpen,
        searchFilter
    } = props;

    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!savedMoviesFlag && value.trim() === "") {
            setTextMessage("Нужно ввести ключевое слово")
            setIsMessageSuccess(false)
            setIsMessageOpen(true)
            return
        }

        setReloadMovies(true)

        if (!savedMoviesFlag) {
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
        setSearchFilter(formValues.short_movie === true)
    }

    useEffect(() => {
        if (!savedMoviesFlag) {
            const {searchFilmName, searchShortMovie} = loadMoviesFromStorage()

            setFormValues({
                film_name: searchFilmName,
                short_movie: searchShortMovie === true
            })
            setSearchFilter(searchShortMovie === true)
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

    useEffect(() => {
        setSearchQuery(formValues.film_name)
        // eslint-disable-next-line
    }, [formValues.film_name, props])

    useEffect(() => {
        setSearchFilter(formValues.short_movie)
        // eslint-disable-next-line
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
                    searchFilter={searchFilter}/>
            </div>
        </form>
    )
}

export default SearchForm;
