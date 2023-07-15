import {useState} from 'react';
import {Link} from "react-router-dom";
import "./Register.css";

const Register = ({onRegister}) => {
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValue.name && formValue.email && formValue.password) {
            onRegister(formValue.name, formValue.email, formValue.password)
        }
    }

    return (
        <div className="register">
            <div className="register__top">
                <div className="register__logo"></div>
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
                        className="register__form-input"
                        value={formValue.name}
                        onChange={handleChange}
                        required
                    />

                    <label className="register__form-label">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="register__form-input"
                        value={formValue.email}
                        onChange={handleChange}
                        required
                    />

                    <label className="register__form-label">Пароль</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="register__form-input"
                        required
                        value={formValue.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="register__button-container">
                    <button type="submit" className="register__button">Зарегистрироваться</button>

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