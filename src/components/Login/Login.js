import {useState} from 'react';
import {Link} from "react-router-dom";
import "./Login.css";

const Login = ({onLogin}) => {
    const [formValue, setFormValue] = useState({
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
        if (formValue.email && formValue.password){
            onLogin(formValue.email, formValue.password)
        }
    }

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
                        className="login__form-input"
                        value={formValue.email}
                        onChange={handleChange}
                    />
                    
                    <label className="login__form-label">Пароль</label>
                    <input
                        required
                        id="password"
                        name="password"
                        type="password"
                        className="login__form-input"
                        value={formValue.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="login__button-container">
                    <button type="submit" className="login__button">Войти</button>

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
