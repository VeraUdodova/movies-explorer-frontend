import {useCallback, useState} from "react";

export function useFormWithValidation() {
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const {name, type, checked} = target;
        let {value} = target;

        if (type === "email") {
            let validationMessage = ""
            if (value === "") {
                validationMessage = "Заполните это поле"
            } else {
                validationMessage =
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ?
                        "" :
                        "Адрес электронной почты некорректен"

            }

            event.target.setCustomValidity(validationMessage)
        } else if (type === "checkbox") {
            value = checked
        }

        setFormValues({...formValues, [name]: value});
        setFormErrors({...formErrors, [name]: event.target.validationMessage});
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setFormValues(newValues);
            setFormErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setFormValues, setFormErrors, setIsValid]
    );

    return {handleChange, formValues, formErrors, isValid, resetForm, setFormValues};
}