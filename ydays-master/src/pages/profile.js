import '../css/profile.css';
import logo from '../assets/logo_ynovcampus/logo_ynov_campus.svg'

const ProfileArea = (props) => {
    return (
        <div className="shadow ProfileArea">
            <div className="logo">
                <img src={logo} alt="Logo Ynov Campus"/>
            </div>
            <form className="formProfile" action="">
                <div className="textArea-profile">
                   <div className="top-profile">
                       <div className="pic"><img src={props.pdp} alt="profile"/></div>
                       <div className="name">
                           <input id="firstname" type="text" placeholder="Prénom"/>
                           <input id="name" type="text" placeholder="Nom"/>
                       </div>
                   </div>
                    <input id="email" type="text" placeholder="Adresse mail"/>
                    <div className="mdp">
                        <input id="password" type="password" placeholder="Mot de passe"/>
                        <input id="confirmation_password" type="password" placeholder="confirmation"/>
                    </div>
                </div>

                <div className="btnProfileArea">
                    <div><button className="buttonProfile">CONNEXION</button></div>
                </div>
            </form>
        </div>
    )
}

export function Profile () {
    return (
        <div>
            <ProfileArea pdp="" />
            <div className="frise">
            </div>
        </div>
    )
}