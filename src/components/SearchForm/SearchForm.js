import {useState} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import "./SearchForm.css";

function SearchForm(props) {
    const [formValue, setFormValue] = useState({
        film_name: '',
        short_movie: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValue.film_name) {
            console.log(formValue.short_movie)

            props.setSearchFormSearchString(formValue.film_name)
            props.setSearchFormFilter(formValue.short_movie)
            props.searchMovie(formValue.film_name, formValue.short_movie)
            props.setCurrentPage(1)
        } else {
            props.setIsMessageSuccess(false)
            props.setErrorMessage("Нужно ввести ключевое слово")
            props.setIsErrorOpen(true)
        }
    }

    return (
        <form className="searchform" onSubmit={handleSubmit}>
            <div className="searchform__block">
                <div className="searchform__icon"></div>
                <input
                    className="searchform__input"
                    placeholder="Фильм"
                    name="film_name"
                    value={formValue.film_name}
                    onChange={handleChange}
                />
                <button type="submit" className="searchform__button">
                </button>
            </div>
            <div className="searchform__block searchform__block-filter">
                <span className="searchform__line"></span>
                <FilterCheckbox title="Короткометражки" onChange={handleChange}/>
            </div>
        </form>
    )
}

export default SearchForm;
