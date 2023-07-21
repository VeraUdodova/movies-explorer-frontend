import React, {useCallback} from "react";

//хук управления формой и валидации формы
export function useFormWithValidation() {
    const [formValues, setFormValues] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const {name, value, type, checked} = target;

        setFormValues({...formValues, [name]: type === "checkbox" ? checked : value});
        setFormErrors({...formErrors, [name]: target.validationMessage});
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