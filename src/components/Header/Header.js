import {Link} from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            {props.loggedIn ?
                <>
                    <div className="header__menu">
                        <button onClick="" className="header__button">Фильмы</button>
                        <button onClick="" className="header__button">Сохранённые фильмы</button>
                    </div>
                    <button onClick="" className="header__account">Аккаунт</button>
                </>
             :
             <div className="header__account__menu">
                 {/*<Routes>*/}
                 {/*    <Route path="/signin" element={<Link to="/signup" className="header__link">Регистрация</Link>} />*/}
                 {/*    <Route path="/signup" element={<Link to="/signin" className="header__link header__link-login">Войти</Link>} />*/}
                     <Link to="/signup" className="header__link">Регистрация</Link>
                     <Link to="/signin" className="header__link header__link-login">Войти</Link>
                 {/*</Routes>*/}
             </div>
            }
        </header>
    )
}

export default Header;