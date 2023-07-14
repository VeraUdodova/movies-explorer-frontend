import "./AboutProject.css";

const AboutProject = (props) => {
    return (
        <section className="aboutproject" id={props.anchor}>
            <h2 className="aboutproject__title">О проекте</h2>

            <div className="aboutproject__stages">
                <div className="aboutproject__stage">
                    <h3 className="aboutproject__stage__title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="aboutproject__stage__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.
                    </p>
                </div>
                <div className="aboutproject__stage">
                    <h3 className="aboutproject__stage__title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="aboutproject__stage__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>

            <div className="aboutproject__progressbar">
                <div className="aboutproject__progressbar__item aboutproject__progressbar__item-backend">
                    <p className="aboutproject__progressbar__title aboutproject__progressbar__title-backend">
                        1 неделя
                    </p>
                    <p className="aboutproject__progressbar__text">
                        Back-end
                    </p>
                </div>
                <div className="aboutproject__progressbar__item aboutproject__progressbar__item-frontend">
                    <p className="aboutproject__progressbar__title aboutproject__progressbar__title-frontend">
                        4 недели
                    </p>
                    <p className="aboutproject__progressbar__text">
                        Front-end
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;
