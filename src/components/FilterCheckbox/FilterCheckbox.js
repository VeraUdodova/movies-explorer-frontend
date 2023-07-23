import "./FilterCheckbox.css"

function FilterCheckbox(props) {
    const {handleChange, title, searchFormFilter} = props;

    return (
        <div className="filtercheckbox">
            <input
                type="checkbox"
                name="short_movie"
                className="filtercheckbox__checkbox"
                onChange={handleChange}
                checked={searchFormFilter}
            />
            <p className="filtercheckbox__title">{title}</p>
        </div>
    );
}

export default FilterCheckbox;
