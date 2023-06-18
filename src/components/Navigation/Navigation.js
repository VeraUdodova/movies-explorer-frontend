import {Link} from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
    return (
        <>
            {props.loggedIn ?
                <div className="navigation">
                    <div className="navigation__menu">
                        <Link to="/movies" className="navigation__link">Фильмы</Link>
                        <Link to="/saved-movies" className="navigation__link">Сохранённые фильмы</Link>
                    </div>
                    <button className="navigation__account">Аккаунт</button>
                </div>
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
