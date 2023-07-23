import {useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Register.css";
import {useFormWithValidation} from "../FormValidator/FormValidator"

const Register = ({onRegister}) => {
    const {handleChange, formValues, formErrors, isValid, resetForm} = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formValues)
    }

    useEffect(() => {
        resetForm()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="register">
            <div className="register__top">
                <Link to="/" className="register__logo"></Link>
                <p className="register__welcome">
                    Добро пожаловать!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="register__form">
                <div className="register__form__container">
                    <label className="register__form-label">Имя</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`register__form-input ${formErrors.name ? "register__form-input-error" : ""}`}
                        value={formValues.name || ""}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                    <div className="register__form__errors">{formErrors.name}</div>

                    <label className="register__form-label">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`register__form-input ${formErrors.email ? "register__form-input-error" : ""}`}
                        value={formValues.email || ""}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                    <div className="register__form__errors">{formErrors.email}</div>

                    <label className="register__form-label">Пароль</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={`register__form-input ${formErrors.password ? "register__form-input-error" : ""}`}
                        value={formValues.password || ""}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                    <div className="register__form__errors">{formErrors.password}</div>
                </div>

                <div className="register__button-container">
                    <button
                        type="submit"
                        className="register__button"
                        disabled={!isValid}
                    >Зарегистрироваться</button>

                    <div className="register__signin">
                        Уже зарегистрированы?
                        <Link to="/signin" className="register__auth-link">Войти</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;