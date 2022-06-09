import {useEffect, useState} from 'react';
import '../css/page_accueil.css';
import '../css/general.css';
import logo from '../assets/logo_ynovcampus/logo_ynov_campus.svg';
import signature from '../assets/apprendre-a-reussir-damion.png';


export function Accueil() {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {

        const changeWidth = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])

    return (
        <div>
            <div className="frise">

            </div>
            <div className="center-div shadow">
                <div className="accueil-logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="center-accueil">

                    <div>
                        <h3>
                            Vous voulez être intervenant
                        </h3>
                        <button className="connexion-btn">
                            CONNEXION
                        </button>
                    </div>

                    <div className="center-line">

                    </div>

                    <div>
                        <h3>
                            Vous êtes membre <br/> de l'équipe Ynov Toulouse
                        </h3>
                        <button className="connexion-btn">
                            CONNEXION
                        </button>
                    </div>

                </div>

                <div className="accueil-signature">
                    {window.innerWidth < 730 && <img className="bottom-logo" src={logo} alt="logo"/>}
                    <img src={signature} alt="signature"/>
                </div>
            </div>
        </div>
    )
}