import {useLocation, Link} from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
    const {pathname} = useLocation();

    const openBurgerMenu = function () {
        props.openBurgerMenu()
    }
    const closeBurgerMenu = function () {
        props.closeBurgerMenu()
    }

    return (
        <>
            {props.loggedIn ?
                <>
                    {props.isBurgerMenuOpen ? <div className="navigation__fade"></div> : <></>}
                    <div className={`navigation ${props.isBurgerMenuOpen ? "navigation__burger" : ""}`}>
                        {props.isBurgerMenuOpen ? <button onClick={closeBurgerMenu} className="navigation__close"></button> : <></>}
                        <div className="navigation__menu">
                            <Link
                                to="/"
                                onClick={closeBurgerMenu}
                                className={`navigation__link navigation__link-burger ${pathname === "/" ? "navigation__link-selected" : ""}`}>
                                Главная
                            </Link>
                            <Link
                                to="/movies"
                                onClick={closeBurgerMenu}
                                className={`navigation__link ${pathname === "/movies" ? "navigation__link-selected" : ""}`}>
                                Фильмы
                            </Link>
                            <Link
                                to="/saved-movies"
                                onClick={closeBurgerMenu}
                                className={`navigation__link ${pathname === "/saved-movies" ? "navigation__link-selected" : ""}`}>
                                Сохранённые фильмы
                            </Link>
                        </div>
                        <Link
                            to="/profile"
                            onClick={closeBurgerMenu}
                            className="navigation__account">
                            Аккаунт
                        </Link>
                    </div>
                    <button
                        onClick={openBurgerMenu}
                        className="navigation navigation__button-burger"></button>
                </>
                :
                <div className="navigation__account__menu">
                    <Link to="/signup" className="navigation__link">Регистрация</Link>
                    <Link to="/signin" className="navigation__link navigation__link-login">Войти</Link>
                </div>
            }
        </>
    )
}

export default Navigation;
