import {Component, useState} from 'react';
import '../../css/home_page_intervenant.css';
import {Menu_Intervenant} from '../../component/menu_intervenant'
import {Footer} from '../../component/footer'
import {Popup} from "../../component/popup_candidature";
import {Detail_offre} from "./detail_offre";

function Card(props) {

    const [openModal, setOpenModal] = useState(false);

    const changeModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <div>
            <div className="card-candidature shadow">
                <div className="top-body-card-candidate">
                    <div className="CandidatureHeaderCard"><p className="jobtitle">{props.name}</p></div>
                    <div className="jobDetails">
                        <div><p className="JobType">{props.type}</p></div>
                        <div><p className="JobType">{props.duration}</p></div>
                        <div><p className="JobType">{props.description}</p></div>
                    </div>
                </div>
                <div className="btnArea">
                    <button className="button-offre" onClick={changeModal}>DETAILS</button>
                </div>
            </div>
            {openModal && <Popup contain={<Detail_offre OfferName="NOM DE L'OFFRE" type="TYPE DE CONTRAT" duration="DURÉE DU CONTRAT" description="DESCRIPTION DU POSTE" information="AUTRES INFORMATIONS" button="CANDIDATER"/>} closeModal={changeModal} />}
        </div>

    )
}


export class HomePageIntervenant extends Component {
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