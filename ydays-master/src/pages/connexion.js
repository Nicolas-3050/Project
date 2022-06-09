import '../css/connexion.css';
import '../css/general.css';
import logo from '../assets/logo_ynovcampus/logo_ynov_campus.svg';
import signature from '../assets/apprendre-a-reussir-damion.png';

const ConnexionArea = () => {
    return (
        <div className="shadow connexionArea">
            <div className="logo-div">
                <img src={logo} alt="Logo Ynov Campus"/>
                <img src={signature} alt="signature"/>
            </div>
            <form className="formConnexion" action="">
                <div className="textArea">
                    <input id="email" type="text" placeholder="Adresse mail"/>
                    <input id="password" type="password" placeholder="Mot de passe"/>
                </div>

                <div className="btnArea">
                    <div><button className="button-connexion">CONNEXION</button></div>
                    <div><p>ou</p></div>
                    <div><button className="button-connexion">CREER TON COMPTE</button></div>


                </div>
            </form>
        </div>
    )
}

export function Connexion () {
    return (
        <div>
            <ConnexionArea />
            <div className="frise">
            </div>
        </div>
    )
}