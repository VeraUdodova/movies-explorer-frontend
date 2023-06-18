import {Link, useLocation} from "react-router-dom";
import "./Footer.css";

function Footer() {
    const { pathname } = useLocation();

    if (['/signin', '/signup'].includes(pathname)) {
        return <></>;
    }

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
                    <Link
                        to="https://practicum.yandex.ru"
                        target="_blank"
                        className="footer__link"
                    >
                        Яндекс.Практикум
                    </Link>
                    <Link
                        to="https://github.com/"
                        target="_blank"
                        className="footer__link"
                    >
                        Github
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;