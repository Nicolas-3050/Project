import {Component,useState} from 'react';
import {Footer} from "../../component/footer";
import {Menu_Intervenant} from '../../component/menu_intervenant';
import '../../css/general.css';
import '../../css/mes_candidature.css';
import {Popup} from "../../component/popup_candidature";
import {MesCandidature_detail} from "./mes_candidature_pop-up"

function Card(props) {

    const [openModal, setOpenModal] = useState(false);

    const changeModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <div>
            <div className="card-candidature shadow">
                <div className="body-card-candidate">
                        <div><p className="name">{props.name}</p></div>
                        <div><p className="name">{props.type}</p></div>
                        <div><p className="name">{props.duration}</p></div>
                        <div><p className="name">{props.description}</p></div>

                </div>
                <div className="btnArea">
                    <button className="button" onClick={changeModal}>DETAILS</button>
                </div>
            </div>
            {openModal && <Popup contain={<MesCandidature_detail pictureLink="https://thispersondoesnotexist.com/image" surname="Nom" firstname="Prénom" age="Âge" offer_name=" " description="DESCRIPTION DU POSTE" situation="SITUATION PROFFESSIONNELLE" motivation="MOTIVATION DÉTAILLÉE" competence="COMPÉTENCES" button="ENREGISTRER"/>} closeModal={changeModal} />}
        </div>

    )
}


export class MesCandidature extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Menu_Intervenant />

                <div className="frise">

                </div>
                <div className="body-candidatures">
                    <Card  name="NOM DE L'OFFRE" type="TYPE DE CONTRAT" description="DESCRIPTION DU POSTE" duration="DURÉE DU CONTRAT" btn="DETAILS"/>
                    <Card  name="NOM DU POSTE" type="TYPE DE CONTRAT" description="DESCRIPTION DU POSTE" duration="DURÉE DU CONTRAT" btn="DETAILS"/>
                    <Card  name="NOM DU POSTE" type="TYPE DE CONTRAT" description="DESCRIPTION DU POSTE" duration="DURÉE DU CONTRAT" btn="DETAILS"/>
                    <Card  name="NOM DU POSTE" type="TYPE DE CONTRAT" description="DESCRIPTION DU POSTE" duration="DURÉE DU CONTRAT" btn="DETAILS"/>
                    <Card  name="NOM DU POSTE" type="TYPE DE CONTRAT" description="DESCRIPTION DU POSTE" duration="DURÉE DU CONTRAT" btn="DETAILS"/>
                </div>

                <Footer />
            </div>

                  
        )
    }
}