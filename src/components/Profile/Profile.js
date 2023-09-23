import {useEffect, useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import "./Profile.css";
import {useFormWithValidation} from "../FormValidator/FormValidator";

function Profile({onLogout, onProfileSave}) {
    const currentUser = useContext(CurrentUserContext);

    const {handleChange, formValues, formErrors, isValid, resetForm} = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();

        onProfileSave(Object.assign(currentUser, {}, formValues))
    }

    useEffect(() => {
        resetForm()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="profile">
            <div className="profile__top">
                <p className="profile__welcome">
                    Привет, {currentUser.name}!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="profile__form">
                <div className="profile__form__container">
                    <label className="profile__form-label">Имя</label>
                    <input
                        required
                        id="name"
                        name="name"
                        type="name"
                        className={`login__form-input ${formErrors.name ? "profile__form-input-error" : ""}`}
                        value={formValues.name}
                        defaultValue={currentUser.name}
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <div className="profile__form__errors">{formErrors.name}</div>

                    <label className="profile__form-label">E-mail</label>
                    <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        className={`login__form-input ${formErrors.email ? "profile__form-input-error" : ""}`}
                        value={formValues.email}
                        defaultValue={currentUser.email}
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <div className="profile__form__errors">{formErrors.email}</div>
                </div>

                <div className="profile__button-container">
                    <button
                        type="submit"
                        className="profile__button"
                        disabled={
                        !isValid || (
                            (
                                formValues.name === undefined || currentUser.name === formValues.name
                            ) && (
                                formValues.email === undefined || currentUser.email === formValues.email
                                )
                            )}
                    >Редактировать</button>

                    <div className="profile__signin">
                        <button className="profile__button-logout" onClick={onLogout}>Выйти из аккаунта</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile;
