import NavTab from "../NavTab/NavTab";

const Promo = (props) => {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента<br/>факультета Веб-разработки.</h1>
            </div>
            <NavTab
                anchor_project={props.anchor_project}
                anchor_techs={props.anchor_techs}
                anchor_me={props.anchor_me}
            />
        </section>
    )
}

export default Promo;
