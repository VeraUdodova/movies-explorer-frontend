import { useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import "./Profile.css";
import {Link} from "react-router-dom";

function Profile() {
    const currentUser = useContext(CurrentUserContext);

    return (
        <section className="profile">
            <h1 className="profile__title">
                Привет, {currentUser.name}!
            </h1>
            <div className="profile__item">
                <p className="profile__label">Имя</p>
                <p className="profile__value">{currentUser.name}</p>
            </div>
            <div className="profile__line"></div>
            <div className="profile__item profile__item-last">
                <p className="profile__label">E-mail</p>
                <p className="profile__value">{currentUser.email}</p>
            </div>
            <Link className="profile__link" to="/profile">Редактировать</Link>
            <Link className="profile__link profile__link-logout" to="/signout">Вытий из аккаунта</Link>
        </section>
    )
}

export default Profile;
