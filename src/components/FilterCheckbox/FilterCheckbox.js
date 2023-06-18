import "./FilterCheckbox.css";

function FilterCheckbox(props) {
    return (
        <div className="filtercheckbox">
            <input type="checkbox" name="short_movies" className="filtercheckbox__checkbox"/>
            <p className="filtercheckbox__title">{props.title}</p>
        </div>
    );
}

export default FilterCheckbox;
