import {useState} from "react"
import "./FilterCheckbox.css"

function FilterCheckbox(props) {
    const [checked, setChecked] = useState(false);

    const handleChangeCheckbox = () => {
        setChecked(!checked)
    }

    return (
        <div className="filtercheckbox">
            <input
                type="checkbox"
                name="short_movies"
                className="filtercheckbox__checkbox"
                defaultChecked={checked}
                onClick={handleChangeCheckbox}
            />
            <p className="filtercheckbox__title">{props.title}</p>
        </div>
    );
}

export default FilterCheckbox;
