import {Link} from "react-router-dom";

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <div className="portfolio__items">
                <Link to="https://github.com/VeraUdodova/how-to-learn" className="portfolio__items__item">
                    Статичный сайт
                </Link>
                <Link to="https://veraudodova.github.io/3rd-project-russian-travel/" className="portfolio__items__item">
                    Адаптивный сайт
                </Link>
                <Link to="https://vera-frontend.nomoredomains.rocks/" className="portfolio__items__item aboutme__portfolio__items__item-last">
                    Одностраничное приложение
                </Link>
            </div>
        </section>
    )
}

export default Portfolio;
