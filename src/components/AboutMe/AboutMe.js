import {Link} from 'react-router-dom';

const AboutMe = (props) => {
    return (
        <section className="aboutme" id={props.anchor}>
            <h2 className="aboutme__title">Студент</h2>

            <div className="aboutme__container">
                <div className="aboutme__info">
                    <div className="aboutme__text">
                        <p className="aboutme__name">Вера</p>
                        <p className="aboutme__position">Фронтенд-разработчик, 18 лет</p>
                        <p className="aboutme__bio">

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
