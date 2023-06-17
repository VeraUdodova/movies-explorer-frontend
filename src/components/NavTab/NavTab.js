import { HashLink as Link } from 'react-router-hash-link';

const NavTab = (props) => {
    return (
        <div className="navtab">
            <Link className="navtab__link" to={`#${props.anchor_project}`}>О проекте</Link>
            <Link className="navtab__link" to={`#${props.anchor_techs}`}>Технологии</Link>
            <Link className="navtab__link" to={`#${props.anchor_me}`}>Студент</Link>
        </div>
    )
}

export default NavTab;
