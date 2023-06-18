import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SearchForm() {
    return (
        <form className="searchform" method="post">
            <div className="searchform__icon"></div>
            <input className="searchform__input" placeholder="Фильм" />
            <button type="submit" className="searchform__button"></button>
            <span className="searchform__line"></span>
            <FilterCheckbox
                title="Короткометражки"
            />
        </form>
    )
}

export default SearchForm;
