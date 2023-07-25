import {useNavigate} from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className="notfound">
            <div className="notfound__container">
                <h1 className="notfound__title">404</h1>
                <p className="notfound__text">Страница не найдена</p>
            </div>
            <button onClick={() => navigate(-1)} className="notfound__link">Назад</button>
        </section>
    )
}

export default NotFound;
