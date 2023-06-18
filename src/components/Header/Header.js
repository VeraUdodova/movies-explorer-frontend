import {useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header(props) {
    const { pathname } = useLocation();

    if (['/signin', '/signup'].includes(pathname)) {
        return <></>;
    }

    return (
        <header className="header">
            <div className="header__logo"></div>
            <Navigation loggedIn={props.loggedIn}/>
        </header>
    )
}

export default Header;