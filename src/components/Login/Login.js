import {useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Login.css";
import {useFormWithValidation} from "../FormValidator/FormValidator";

const Login = ({onLogin}) => {
    const {handleChange, formValues, formErrors, isValid, resetForm} = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formValues)
    }

    useEffect(() => {
        resetForm()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="login">
            <div className="login__top">
                <div className="login__logo"></div>
                <p className="login__welcome">
                    Рады видеть!
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="login__form">
                <div className="login__form__container">
                    <label className="login__form-label">E-mail</label>
                    <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        className={`login__form-input ${formErrors.email ? "login__form-input-error" : ""}`}
                        value={formValues.email || ""}
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <div className="login__form__errors">{formErrors.email}</div>
                    
                    <label className="login__form-label">Пароль</label>
                    <input
                        required
                        id="password"
                        name="password"
                        type="password"
                        className={`login__form-input ${formErrors.password ? "login__form-input-error" : ""}`}
                        value={formValues.password || ""}
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <div className="login__form__errors">{formErrors.password}</div>
                </div>

                <div className="login__button-container">
                    <button
                        type="submit"
                        className="login__button"
                        disabled={!isValid}
                    >Войти</button>

                    <div className="login__signin">
                        Еще не зарегистрированы?
                        <Link to="/signup" className="login__auth-link">Регистрация</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
