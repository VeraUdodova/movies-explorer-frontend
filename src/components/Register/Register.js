import {Link} from 'react-router-dom';

const Register = () => {
    return (
        <div className="register">
            <div className="register__top">
                <div className="register__logo"></div>
                <p className="register__welcome">
                    Добро пожаловать!
                </p>
            </div>

            <form className="register__form">
                <div className="register__form__container">
                    <label className="register__form-label">Имя</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="register__form-input"
                    />

                    <label className="register__form-label">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="register__form-input"
                    />

                    <label className="register__form-label">Пароль</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="register__form-input"
                    />
                </div>

                <div className="register__button-container">
                    <button type="submit" className="register__button">Зарегистрироваться</button>

                    <div className="register__signin">
                        Уже зарегистрированы?
                        <Link to="/signin" className="register__login-link">Войти</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;