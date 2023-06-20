import NavTab from "../NavTab/NavTab";
import "./Promo.css";

const Promo = (props) => {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента<br/>факультета Веб-разработки.</h1>
                <NavTab
                    anchor_project={props.anchor_project}
                    anchor_techs={props.anchor_techs}
                    anchor_me={props.anchor_me}
                />
            </div>
        </section>
    )
}

export default Promo;
