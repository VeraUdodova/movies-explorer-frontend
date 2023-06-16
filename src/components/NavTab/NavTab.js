import { HashLink as Link } from 'react-router-hash-link';

const NavTab = () => {
    return (
        <div className="navtab">
            <Link className="navtab__link" to="#about-project">О проекте</Link>
            <Link className="navtab__link" to="#techs">Технологии</Link>
            <Link className="navtab__link" to="#about-me">Студент</Link>
        </div>
    )
}

export default NavTab;
