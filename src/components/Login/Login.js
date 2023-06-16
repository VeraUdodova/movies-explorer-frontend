import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className="login auth">
            <div className="login__top auth__top">
                <div className="login__logo auth__logo"></div>
                <p className="login__welcome auth__welcome">
                    Рады видеть!
                </p>
            </div>
            
            <form className="login__form auth__form">
                <div className="login__form__container auth__form__container">
                    <label className="login__form-label auth__form-label">E-mail</label>
                    <input
                        required id="email"
                        name="email"
                        type="email"
                        className="login__form-input auth__form-input"
                    />
                    
                    <label className="login__form-label auth__form-label">Пароль</label>
                    <input
                        required id="password"
                        name="password"
                        type="password"
                        className="login__form-input auth__form-input"
                    />
                </div>

                <div className="login__button-container auth__button-container">
                    <button type="submit" className="login__button auth__button">Войти</button>

                    <div className="login__signin auth__signin">
                        Еще не зарегистрированы?
                        <Link to="/signup" className="login__auth-link auth__auth-link">Регистрация</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
