import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

const Main = () => {
    const [anchor_project, anchor_techs, anchor_me] = [
        "about-project", "techs", "about-me"
    ];

    return (
        <>
            <Promo
                anchor_project={anchor_project}
                anchor_techs={anchor_techs}
                anchor_me={anchor_me}
            />
            <AboutProject anchor={anchor_project}/>
            <Techs anchor={anchor_techs}/>
            <AboutMe anchor={anchor_me}/>
            <Portfolio/>
        </>
    )
}

export default Main;
