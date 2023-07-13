import {Link} from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <section className="notfound">
            <div className="notfound__container">
                <h1 className="notfound__title">404</h1>
                <p className="notfound__text">Страница не найдена</p>
            </div>
            <Link to="" className="notfound__link">Назад</Link>
        </section>
    )
}

export default NotFound;
