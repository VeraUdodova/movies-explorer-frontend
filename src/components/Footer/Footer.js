import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__slogan">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__info">
                <p className="footer__copyright">
                    &copy; 2023
                </p>
                <div className="footer__links">
                    <Link to="https://practicum.yandex.ru" className="footer__link">Яндекс.Практикум</Link>
                    <Link to="https://github.com/" className="footer__link">Github</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;