import "./FilterCheckbox.css"
import {useEffect, useState} from "react";

function FilterCheckbox(props) {
    const {handleChange, title, name, setSearchFilter} = props;

    const [value, setValue] = useState(false)

    const handleChangeCheckbox = (e) => {
        setValue(e.target.checked)
        handleChange(e)
    }

    useEffect(() => {
        setValue(setSearchFilter === true)
    }, [])

    return (
        <div className="filtercheckbox">
            <input
                type="checkbox"
                id={name}
                name={name}
                className="filtercheckbox__checkbox"
                onChange={handleChangeCheckbox}
                checked={value}
            />
            <p className="filtercheckbox__title">{title}</p>
        </div>
    );
}

export default FilterCheckbox;
