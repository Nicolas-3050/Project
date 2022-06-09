import {Component, useState} from 'react';
import '../../css/home_page-ynov.css';
import {Popup} from "../../component/popup_candidature";
import {Candidature_detail} from "./candidature_pop-up_2";
import {Menu_Ynov} from "../../component/menu";
import {Footer} from "../../component/footer"


// TODO
function Card(props) {

    const [openModal, setOpenModal] = useState(false);

    const changeModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <div>
                <div className="card-home shadow" onClick={changeModal}>
                <div className="top-card">
                    <div><img className="profil-pic" src={props.pictureLink} alt="pdp"/></div>
                    <div>
                        <h3 className="name">{props.name}</h3>
                    </div>
                </div>
                <div className="border">

                </div>
                <div className="body-card">
                    <div><p>{props.situation}</p></div><br/>
                    <div><p>{props.motivation}</p></div><br/>
                    <div><p>{props.description}</p></div><br/>
                </div>
            </div>
            { openModal && <Popup contain={<Candidature_detail pictureLink="https://thispersondoesnotexist.com/image" surname="Nom" firstname="Prénom" age="Âge" situation="SITUATION PROFFESSIONNELLE" competence="COMPÉTENCES" description="DESCRIPTION DU POSTE" motivation="MOTIVATION DÉTAILLÉE" />} closeModal={changeModal} />}

        </div>

    )
}


export class HomePageYnov extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Menu_Ynov />
                <div className="frise">

                </div>
                <div className="body-home">
                    <Card pictureLink="https://thispersondoesnotexist.com/image" name="Nom Prénom" situation="test" motivation="motivation" description="description" />
                    <Card pictureLink="https://thispersondoesnotexist.com/image" name="Nom Prénom" situation="test" motivation="motivation" description="description" />
                    <Card pictureLink="https://thispersondoesnotexist.com/image" name="Nom Prénom" situation="test" motivation="motivation" description="description" />
                    <Card pictureLink="https://thispersondoesnotexist.com/image" name="Nom Prénom" situation="test" motivation="motivation" description="description" />
                </div>
                <Footer />
            </div>

        )
    }
}