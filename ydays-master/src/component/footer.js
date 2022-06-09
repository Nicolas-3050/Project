import '../css/footer.css';
import logo from '../assets/logo_ynovcampus/logo_ynov_campus.svg';
import signature from '../assets/apprendre-a-reussir-damion.png';


export function Footer() {
    return (
        <div className="footer">
            <div><img src={logo} alt="logo"/></div>
            <div><img src={signature} alt="signature"/></div>
        </div>
    )
}