import {useState} from "react";
import {useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header(props) {
    const { pathname } = useLocation();
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState([])

    if (['/signin', '/signup'].includes(pathname)) {
        return <></>;
    }

    const closeBurgerMenu = function() {
        setBurgerMenuOpen(false)
    }

    const openBurgerMenu = function() {
        setBurgerMenuOpen(true)
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo"></div>
                <Navigation
                    loggedIn={props.loggedIn}
                    isBurgerMenuOpen={isBurgerMenuOpen}
                    closeBurgerMenu={closeBurgerMenu}
                    openBurgerMenu={openBurgerMenu}
                />
            </div>
        </header>
    )
}

export default Header;