import React, {useCallback} from "react";

//хук управления формой и валидации формы
export function useFormWithValidation() {
    const [formValues, setFormValues] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const isValidEmail = (email) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    }

    const handleChange = (event) => {
        const target = event.target;
        const {name, value, type, checked} = target;
        let validationMessage = target.validationMessage;

        if (type === "email" && validationMessage === "") {
            validationMessage = !isValidEmail(value) ? "Адрес электронной почты некорректен" : "";
        }

        setFormValues({...formValues, [name]: type === "checkbox" ? checked : value});
        setFormErrors({...formErrors, [name]: validationMessage});
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

    return {handleChange, formValues, formErrors, isValid, resetForm};
}