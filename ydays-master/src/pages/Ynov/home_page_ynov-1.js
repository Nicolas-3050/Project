import {Component} from 'react';
import {Menu_Ynov} from '../../component/menu'
import {Footer} from '../../component/footer'
import {useState} from "react";
import {Popup} from "../../component/popup_candidature";
import '../../css/home_page_ynov-1.css';
import '../../css/general.css'
import message from '../../assets/message.png';
import discuss from '../../assets/discuss.png';
import {Candidature_detail} from "./candidature_pop-up_2";


function Card(props) {

    const [openModal, setOpenModal] = useState(false);

    const changeModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <div className="card-candidate shadow">
            <div className="fullspace" onClick={changeModal}>
                <div className="left-part">
                    <img src={props.pdp} alt="profil"/>
                </div>
                <div className="right-part">
                    <div>
                        <h1>{props.lastName + " " + props.firstName}</h1>
                    </div>
                    <div className="logo">
                        <div>
                            <a href="#">
                                <img src={message} alt="messages"/>
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <img src={discuss} alt="discussion"/>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            { openModal && <Popup contain={<Candidature_detail pictureLink="https://thispersondoesnotexist.com/image" surname="Nom" firstname="Prénom" age="Âge" situation="SITUATION PROFFESSIONNELLE" competence="COMPÉTENCES" description="DESCRIPTION DU POSTE" motivation="MOTIVATION DÉTAILLÉE" />} closeModal={changeModal} />}
        </div>

    )
}

export class HomePageYnov_1 extends Component {
    render() {
        return (
            <div>
                <Menu_Ynov />
                <div className="contain">
                    <Card pdp="https://thispersondoesnotexist.com/image" firstName="Prénom" lastName="Nom"/>
                    <Card pdp="https://thispersondoesnotexist.com/image" firstName="Prénom" lastName="Nom"/>
                    <Card pdp="https://thispersondoesnotexist.com/image" firstName="Prénom" lastName="Nom"/>
                    <Card pdp="https://thispersondoesnotexist.com/image" firstName="Prénom" lastName="Nom"/>
                    <Card pdp="https://thispersondoesnotexist.com/image" firstName="Prénom" lastName="Nom"/>
                </div>

                <div className="frise">
                </div>
                <Footer />
            </div>
        )
    }
}