import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SearchForm() {
    return (
        <form className="searchform" method="post">
            <div className="searchform__block">
                <div className="searchform__icon"></div>
                <input className="searchform__input" required placeholder="Фильм"/>
                <button type="submit" className="searchform__button"></button>
            </div>
            <div className="searchform__block searchform__block-filter">
                <span className="searchform__line"></span>
                <FilterCheckbox
                    title="Короткометражки"
                />
            </div>
        </form>
    )
}

export default SearchForm;
