const Techs = () => {
    return (
        <section className="techs">
            <h2 className="techs__title">О проекте</h2>

            <div className="techs__container">
                <p className="techs__maintitle">7 технологий</p>
                <p className="techs__subtitle">
                    На курсе веб-разработки мы освоили технологии, которые применили<br/>
                    в дипломном проекте.
                </p>

                <div className="techs__technologies">
                    <p className="techs__technology">HTML</p>
                    <p className="techs__technology">CSS</p>
                    <p className="techs__technology">JS</p>
                    <p className="techs__technology">React</p>
                    <p className="techs__technology">Git</p>
                    <p className="techs__technology">Express.js</p>
                    <p className="techs__technology">mongoDB</p>
                </div>
            </div>
        </section>
    )
}

export default Techs;
