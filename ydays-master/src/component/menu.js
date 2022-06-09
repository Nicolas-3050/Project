import {useEffect, useState} from 'react';
import '../css/menu.css';
import menuLogo from '../assets/menu.png';
import logo from '../assets/logo_ynovcampus/logo_ynov_campus.svg'
import close from '../assets/close.png'
import {Popup} from "./popup_candidature";
import {PosterOffreArea} from "../pages/Ynov/poster_offre";


export function Menu_Ynov(props) {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [openModal, setOpenModal] = useState(false);

    const changeModal = () => {
        setOpenModal(!openModal);
    }

    const toggleNavSmallScreen = () => {
        setToggleMenu(!toggleMenu);
    }

    useEffect(() => {

        const changeWidth = () => {
            setWidth(window.innerWidth);

            if (window.innerWidth > 1130) {
                setToggleMenu(false)
            }
        }

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])

    return (
        <nav>
            {!toggleMenu &&
            <button className="open-nav-btn" onClick={toggleNavSmallScreen} >
                <img src={menuLogo} alt="burger menu"/>
            </button>}
            {toggleMenu && <ul>
                <div>
                    <button className="close-nav-btn" onClick={toggleNavSmallScreen}>
                        <img src={close} alt="close menu"/>
                    </button>

                    <img className="logoInMenu" src={logo} alt="logo campus"/>
                </div>

                <li><a href="" >HOME PAGE</a></li>
                <li><a href="" >CANDIDATURES ENREGISTRÉES</a></li>
                <li onClick={changeModal}>POSTER UNE OFFRE</li>
                <li><a href="" >TCHATER</a></li>
            </ul>}

            {width > 1130 && toggleMenu === false &&
            <ul>
                <li><a href="" >HOME PAGE</a></li>
                <li><a href="" >CANDIDATURES ENREGISTRÉES</a></li>
                <li onClick={changeModal}>POSTER UNE OFFRE</li>
                <li><a href="" >TCHATER</a></li>
            </ul>}

            <div className="div-logo">
                <div>
                    <img className="logo" src={logo} alt="LOGO"/>
                </div>
                {/*<h2>{window.innerWidth < 1135 ? this.props.active : "" }</h2>*/}
            </div>
            {openModal && <Popup contain={<PosterOffreArea />} closeModal={changeModal}/>}
        </nav>
    )
}