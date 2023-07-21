import {useEffect} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import {useFormWithValidation} from "../FormValidator/FormValidator";
import "./SearchForm.css";

function SearchForm(props) {
    const {handleChange, formValues, formErrors, isValid, resetForm} = useFormWithValidation();

    useEffect(() => {
        resetForm()
        // eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const values = Object.assign({
            film_name: props.searchFormSearchString,
            short_movie: props.searchFormFilter
        }, {}, formValues
        )

        props.setSearchFormSearchString(values.film_name)
        props.setSearchFormFilter(values.short_movie)

        props.searchMovie()
        props.setCurrentPage(1)
    }

    return (
        <form className="searchform" onSubmit={handleSubmit}>
            <div className="searchform__block">
                <div className="searchform__icon"></div>
                <input
                    className={`searchform__input ${formErrors.name ? "searchform__input-error" : ""}`}
                    placeholder="Фильм"
                    name="film_name"
                    value={formValues.film_name || props.searchFormSearchString}
                    autoComplete="off"
                    defaultValue={props.searchFormSearchString}
                    required={true}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="searchform__button"
                    disabled={!isValid}
                >
                </button>
            </div>
            <div className="searchform__block searchform__block-filter">
                <span className="searchform__line"></span>
                <FilterCheckbox title="Короткометражки" handleChange={handleChange}/>
            </div>
        </form>
    )
}

export default SearchForm;
