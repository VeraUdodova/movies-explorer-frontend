import {Link} from "react-router-dom";
import "./Portfolio.css";

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <div className="portfolio__items">
                <Link
                    to="https://github.com/VeraUdodova/how-to-learn"
                    target="_blank"
                    className="portfolio__items__item"
                >
                    Статичный сайт
                </Link>
                <Link
                    to="https://veraudodova.github.io/3rd-project-russian-travel/"
                    target="_blank"
                    className="portfolio__items__item"
                >
                    Адаптивный сайт
                </Link>
                <Link
                    to="https://vera-frontend.nomoredomains.rocks/"
                    target="_blank"
                    className="portfolio__items__item aboutme__portfolio__items__item-last"
                >
                    Одностраничное приложение
                </Link>
            </div>
        </section>
    )
}

export default Portfolio;
