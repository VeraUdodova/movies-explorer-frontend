import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <div className="login__top">
                <div className="login__logo"></div>
                <p className="login__welcome">
                    Рады видеть!
                </p>
            </div>
            
            <form className="login__form">
                <div className="login__form__container">
                    <label className="login__form-label">E-mail</label>
                    <input
                        required id="email"
                        name="email"
                        type="email"
                        className="login__form-input"
                    />
                    
                    <label className="login__form-label">Пароль</label>
                    <input
                        required id="password"
                        name="password"
                        type="password"
                        className="login__form-input"
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
