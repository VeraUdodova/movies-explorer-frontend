import "./FilterCheckbox.css"

function FilterCheckbox(props) {
    return (
        <div className="filtercheckbox">
            <input
                type="checkbox"
                name="short_movie"
                className="filtercheckbox__checkbox"
                onChange={props.handleChange}
            />
            <p className="filtercheckbox__title">{props.title}</p>
        </div>
    );
}

export default FilterCheckbox;
