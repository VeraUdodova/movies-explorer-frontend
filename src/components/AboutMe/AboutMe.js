import {Link} from 'react-router-dom';
import "./AboutMe.css";

const AboutMe = (props) => {
    return (
        <section className="aboutme" id={props.anchor}>
            <h2 className="aboutme__title">Студент</h2>

            <div className="aboutme__container">
                <div className="aboutme__info">
                    <div className="aboutme__text">
                        <p className="aboutme__name">Вера</p>
                        <p className="aboutme__position">Фронтенд-разработчик, 35 лет</p>
                        <p className="aboutme__bio">
                            Родилась и живу в Москве. Закончила факультет национальной экономики в ГУУ. Замужем. Люблю
                            путешествовать, гулять по городу ранним утром, пока все спят и наслаждаться его красотой без
                            суеты. Недавно компания, в которой я работаю решила свернуть свой бизнес в России и я
                            решила, что вот он тот самый "пинок" в направлении новой профессии! У цифровой профессии
                            есть одно преимущество, которое нельзя переоценить - возможность работать удаленно откуда
                            угодно, а значит будет и возможность совмещать работу и путешествия 😊
                        </p>
                    </div>
                    <Link to="https://github.com/veraudodova" className="aboutme__github">Github</Link>
                </div>
                <div className="aboutme__photo"></div>
            </div>
        </section>
    )
}

export default AboutMe;
