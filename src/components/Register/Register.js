import {Link} from 'react-router-dom';

const Register = () => {
    return (
        <div className="register auth">
            <div className="register__top auth__top">
                <div className="register__logo auth__logo"></div>
                <p className="register__welcome auth__welcome">
                    Добро пожаловать!
                </p>
            </div>

            <form className="register__form auth__form">
                <div className="register__form__container auth__form__container">
                    <label className="register__form-label auth__form-label">Имя</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="register__form-input auth__form-input"
                    />

                    <label className="register__form-label auth__form-label">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="register__form-input auth__form-input"
                    />

                    <label className="register__form-label auth__form-label">Пароль</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="register__form-input auth__form-input"
                    />
                </div>

                <div className="register__button-container auth__button-container">
                    <button type="submit" className="register__button auth__button">Зарегистрироваться</button>

                    <div className="register__signin auth__signin">
                        Уже зарегистрированы?
                        <Link to="/signin" className="register__auth-link auth__auth-link">Войти</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;